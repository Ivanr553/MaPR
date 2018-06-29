import * as React from 'react'
import { Link } from 'react-router-dom'
import * as $ from 'jquery'

const s = require('./styling/style.sass')

import DocumentList from '../DocumentList/DocumentList'
import DocumentView from '../DocumentView/DocumentView'
import Account from '../Account/Account'
import About from '../About/About'
import CreateDocument from '../CreateDocument/CreateDocument'
import UploadDocument from '../UploadDocument/UploadDocument'

export default class MetaBar extends React.Component<any, any> {

    constructor(props) {
        super(props)
        this.state = {
            user: {},
            currentView: '',
            documentResults: [],
            currentDocuments: []
        }
        
        this.getCurrentView = this.getCurrentView.bind(this)
        this.getCurrentUser = this.getCurrentUser.bind(this)
        this.handleDocumentListPress = this.handleDocumentListPress.bind(this)
        this.handleDocumentLinkPress = this.handleDocumentLinkPress.bind(this)
        this.handleSettingsPress = this.handleSettingsPress.bind(this)
        this.handleAboutPress = this.handleAboutPress.bind(this)
        this.getDocuments = this.getDocuments.bind(this)
        this.populateDocumentLinks = this.populateDocumentLinks.bind(this)
        this.handleNewDocumentPress = this.handleNewDocumentPress.bind(this)
        this.handleUploadDocumentPress = this.handleUploadDocumentPress.bind(this)
    }

    async getCurrentUser() {

        let user = await this.props.getCurrentUser()

        this.setState({
            user: user
        })

    }

    //Will get the documents from the back end, for now is just using a hardcoded object
    async getDocuments() {
        
        let result = {
            documents: [
            {
                id: '23456',
                title: 'NAVMC',
                created_by: 'Officer',
                action_required: 'Fill Out',
                status: 'pending',
                file: 'NAVMC10694.pdf'
            },
            {
                id: '23456',
                title: 'NAVMC',
                created_by: 'Officer',
                action_required: 'Fill Out',
                status: 'pending',
                file: 'NAVMC10694.pdf'
            },
            {
                id: '23456',
                title: 'NAVMC',
                created_by: 'Officer',
                action_required: 'Fill Out',
                status: 'pending',
                file: 'NAVMC10694.pdf'
            },
            {
                id: '23456',
                title: 'NAVMC',
                created_by: 'Officer',
                action_required: 'Fill Out',
                status: 'pending',
                file: 'NAVMC10694.pdf'
            }
            ]
        }

        try {

            let documentList = await $.get('/DocumentSave/GetAllDocuments')
            console.log(documentList)

            let pdfID = documentList[0].idDocument

            let returnPDF = await $.get(`/DocumentSave/GetNewAutoPopulatedFile?document_id=${pdfID}`)

        } catch(e) {
            console.log(e)
        }

        this.setState({
            documentResults: result.documents
        }, () => {
            this.populateDocumentLinks()
        })

    }

    populateDocumentLinks() {

        let documents = this.state.documentResults.slice()
        let documentLinks = []

        for(let i = 0; i < documents.length; i++) {

            let documentLink = 
                <div className='document-link' id={documents[i].file} key={i} data-params={{ id: documents[i].id, document: documents[i]}} onClick={(e) => {this.handleLinkPress(e)}}>
                    {documents[i].title}
                </div>

            documentLinks.push(documentLink)
        }

        this.setState({
            documentLinks: documentLinks
        }, () => {
            this.handleDocumentListPress()
        })

    }

    async handleLinkPress(e) {

        let file = e.target.id

        let setFile = await this.setState({
            file: file
        })

        let setCurrentView = await this.setState({
            currentView: <DocumentView file={this.state.file} />
        })

        let getCurrentView = await this.props.getCurrentView(this.state.currentView)
    }

    async handleDocumentLinkPress(e) {

        let target = e.target

        while (!target.classList.contains('viewable-document')) {
            target = target.parentNode
        }

        let file = target.id

        let setFile = await this.setState({
            file: file
        })


        let setCurrentView = await this.setState({
            currentView: <DocumentView file={this.state.file} />
        })

        let getCurrentView = await this.props.getCurrentView(this.state.currentView)
    }

    handleUploadDocumentPress() {

        this.setState({
            currentView: <UploadDocument />
        }, () => {
            this.props.getCurrentView(this.state.currentView)
        })

    }

    handleStudioPress() {
        window.open('/A/App/Studio', '_self')
    }

    getCurrentView(currentView) {
        this.setState({
            currentView: currentView
          }, () => {
            this.props.getCurrentView(this.state.currentView)
          })
    }

    handleNewDocumentPress() {
        this.setState({
            currentView: <CreateDocument getCurrentView={this.getCurrentView} documentResults={this.state.documentResults} viewDocument={this.handleDocumentLinkPress} />
        }, () => {
            this.props.getCurrentView(this.state.currentView)
        })
    }

    handleDocumentListPress() {
        this.setState({
            currentView: <DocumentList documentResults={this.state.documentResults} viewDocument={this.handleDocumentLinkPress} />
        }, () => {
            this.props.getCurrentView(this.state.currentView)
        })
    }

    handleSettingsPress() {
        this.setState({
            currentView: <Account getCurrentUser={this.props.getCurrentUser} />
        }, () => {
            this.props.getCurrentView(this.state.currentView)
        })
    }

    handleAboutPress() {
        this.setState({
            currentView: <About />
        }, () => {
            this.props.getCurrentView(this.state.currentView)
        })
    }

    componentDidMount() {
        this.getDocuments()
        this.getCurrentUser()
    }

    render() {

        let studio

        if(this.state.user.authorization > 1) {

            studio = <div className='metabar-link' onClick={this.handleStudioPress}>Studio (Unfinished)</div>

        }

        return(
            <div id='MetaBar'>
                <div id='logo-container'>
                    <img id='logo' src='/images/MAPR_logo_edit.png'/>
                </div>
                <abbr title='Pending Documents'><img className='metabar-link' src='/images/doc_icon.png' onClick={this.handleDocumentListPress}/></abbr>
                <abbr title='Create New Document'><img className='metabar-link' src='/images/new_document-white.png' onClick={this.handleNewDocumentPress}/></abbr>
                <abbr title='Upload Document'><img className='metabar-link' src='/images/upload-document.png' onClick={this.handleUploadDocumentPress}/></abbr>
                <abbr title='Account Page'><img className='metabar-link' src='/images/settings.png' onClick={this.handleSettingsPress}/></abbr>
            </div>
        )
    }

}