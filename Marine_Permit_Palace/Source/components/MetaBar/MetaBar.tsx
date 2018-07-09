import * as React from 'react'
import { Link } from 'react-router-dom'
import * as $ from 'jquery'

const s = require('./styling/style.sass')

import DocumentList from '../DocumentList/DocumentList'
import DocumentView from '../DocumentView/DocumentView'
import About from '../About/About'
import CreateDocument from '../CreateDocument/CreateDocument'
import UploadDocument from '../UploadDocument/UploadDocument'
import SignatureView from '../SignatureView/SignatureView'

export default class MetaBar extends React.Component<any, any> {

    constructor(props) {
        super(props)
        this.state = {
            user: {},
            currentView: '',
            documentResults: [],
            currentDocuments: []
        }
        
    }


    //========================== Sending/Retrieving Data ==========================

    getCurrentUser = async () => {

        let user = await this.props.getCurrentUser()

        this.setState({
            user: user
        })

    }

    getDocuments = async () => {

        try {

            let documentList = await $.get('/DocumentSave/GetAllDocuments')

            this.setState({
                documentResults: documentList
            }, () => {
                this.populateDocumentLinks()
            })

        } catch(e) {
            Error(e)
        }

    }

    getCurrentView = (currentView: React.ComponentElement<HTMLElement, any>) => {
        this.setState({
            currentView: currentView
          }, () => {
            this.props.getCurrentView(this.state.currentView)
          })
    }

    //==================== Handle Notifications ======================

    getNotifications = async () => {

        try{
            let response = await $.get('/Notification')
            let notificationCount = response.notification_count
            this.setState({
                notificationCount: notificationCount
            })
        } catch(e) {
            Error(e)
        }

    }

    renderNotification = () => {
        if(this.state.notificationCount <= 0) {
            return <img id='pending-document-notification' src="/images/notification-undefined.png" alt=""/>
        }  
    }


    //================= Populating Content on Page ==================

    populateDocumentLinks = () => {

        let documents = this.state.documentResults.slice()
        let documentLinks = []

        for(let i = 0; i < documents.length; i++) {

            let documentLink = 
                <div className='document-link' id={documents[i].idDocument} key={i} data-params={{ id: documents[i].id, document: documents[i]}} onClick={(e) => {this.handleLinkPress(e)}}>
                    {documents[i].name}
                </div>

            documentLinks.push(documentLink)
        }

        this.setState({
            documentLinks: documentLinks
        }, () => {
            this.handleDocumentListPress()
        })

    }


    //================== OnClick/Button Handlers =================

    handleLinkPress = async (e) => {

        let document_id = e.target.id

        let setFile = await this.setState({
            document_id: document_id
        })

        let setCurrentView = await this.setState({
            currentView: <DocumentView document_id={this.state.document_id} />
        })

        let getCurrentView = await this.props.getCurrentView(this.state.currentView)
    }

    handleDocumentLinkPress = async (e) => {

        let target = e.target

        while (!target.classList.contains('viewable-document')) {
            target = target.parentNode
        }

        let document_id = target.id

        let setFile = await this.setState({
            document_id: document_id
        })


        let setCurrentView = await this.setState({
            currentView: <DocumentView document_id={this.state.document_id} />
        })

        let getCurrentView = await this.props.getCurrentView(this.state.currentView)
    }

    handleMetabarSelectionStyling = (selectedMetabarView: string, selectedMetabarViewButton: string): void => {

        //Removing classes from buttons
        document.getElementById('document-list-metabar-button').classList.remove('metabar-link-selected')
        document.getElementById('create-document-metabar-button').classList.remove('metabar-link-selected')
        document.getElementById('upload-document-metabar-button').classList.remove('metabar-link-selected')
        document.getElementById('signature-page-metabar-button').classList.remove('metabar-link-selected')

        //Removing classes from triangles
        document.getElementById('document-list-metabar-triangle').classList.remove('metabar-triangle-selected')
        document.getElementById('create-document-metabar-triangle').classList.remove('metabar-triangle-selected')
        document.getElementById('upload-document-metabar-triangle').classList.remove('metabar-triangle-selected')
        document.getElementById('signature-page-metabar-triangle').classList.remove('metabar-triangle-selected')

        //Adding class to button and triangle
        document.getElementById(selectedMetabarView).classList.add('metabar-link-selected')
        document.getElementById(selectedMetabarViewButton).classList.add('metabar-triangle-selected')
        
    }

    handleNewDocumentPress = () => {
        this.setState({
            currentView: <CreateDocument getCurrentView={this.getCurrentView} documentResults={this.state.documentResults} viewDocument={this.handleDocumentLinkPress} />
        }, () => {
            this.props.getCurrentView(this.state.currentView)
            this.handleMetabarSelectionStyling('create-document-metabar-button', 'create-document-metabar-triangle')
        })
    }

    handleDocumentListPress = () => {
        this.setState({
            currentView: <DocumentList documentResults={this.state.documentResults} viewDocument={this.handleDocumentLinkPress} />
        }, () => {
            this.props.getCurrentView(this.state.currentView)
            this.handleMetabarSelectionStyling('document-list-metabar-button', 'document-list-metabar-triangle')
        })
    }

    handleSignaturePress = () => {
        this.setState({
            currentView: <SignatureView />
        }, () => {
            this.props.getCurrentView(this.state.currentView)
            this.handleMetabarSelectionStyling('signature-page-metabar-button', 'signature-page-metabar-triangle')
        })
    }

    handleUploadDocumentPress = () => {

        this.setState({
            currentView: <UploadDocument />
        }, () => {
            this.props.getCurrentView(this.state.currentView)
            this.handleMetabarSelectionStyling('upload-document-metabar-button', 'upload-document-metabar-triangle')
        })

    }

    handleAboutPress = () => {
        this.setState({
            currentView: <About />
        }, () => {
            this.props.getCurrentView(this.state.currentView)
            
        })
    }


    //==================== React Lifecycle Methods ====================

    componentDidMount() {
        this.getDocuments()
        this.getCurrentUser()
        this.getNotifications()
    }

    componentDidCatch() {

    }

    render() {

        return(
            <div id='MetaBar'>
                <div id='logo-container'>
                    <img id='logo' src='/images/MAPR_logo_edit.png'/>
                </div>
                <div title='Pending Documents' className='metabar-button-abbr'>
                        {this.renderNotification()}
                        <img id='document-list-metabar-button' src='/images/doc_icon.png' onClick={this.handleDocumentListPress}/>
                    <div id='document-list-metabar-triangle' className='metabar-triangle'></div>
                </div>
                <abbr title='Create New Document' className='metabar-button-abbr'>
                    <img id='create-document-metabar-button' className='metabar-link' src='/images/new_document-white.png' onClick={this.handleNewDocumentPress}/>
                    <div id='create-document-metabar-triangle' className='metabar-triangle'></div>
                </abbr>
                <abbr title='Upload Document' className='metabar-button-abbr'>
                    <img id='upload-document-metabar-button' className='metabar-link' src='/images/upload-document.png' onClick={this.handleUploadDocumentPress}/>
                    <div id='upload-document-metabar-triangle' className='metabar-triangle'></div>
                </abbr>
                <abbr title='Signature Page' className='metabar-button-abbr'>
                    <img id='signature-page-metabar-button' className='metabar-link' src='/images/pencil.png' onClick={this.handleSignaturePress}/>
                    <div id='signature-page-metabar-triangle' className='metabar-triangle'></div>
                </abbr>
            </div>
        )
    }

}