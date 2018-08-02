import * as React from 'react'

import './styling/style.sass'

import PendingDocuments from '../PendingDocumentsView/PendingDocumentsView'
import DocumentView from '../DocumentView/DocumentView'
import About from '../About/About'
import CreateDocument from '../CreateDocument/CreateDocument'
import UploadDocument from '../UploadDocument/UploadDocument'
import SignatureView from '../SignatureView/SignatureView'
import { getUser } from '../../services/services';
import SearchDocumentView from '../SearchDocumentView/SearchDocumentView';

export default class MetaBar extends React.Component<any, any> {

    constructor(props) {
        super(props)
        this.state = {
            currentView: '',
            documentResults: [],
            pendingDocuments: [],
            currentDocuments: [],
            createDocumentState: {
                document_id: '',
                document_meta: Array,
                documentName: '',
                userList: [],
                selectDocumentBoolean: true,
                documentPreviewBoolean: false,
                selectPermissionsBoolean: false
            }
        }
        
    }


    //========================== Sending/Retrieving Data ==========================

    getUser = async () => {
        let user = await getUser()
        let dod_id = parseInt(user.username)

        this.setState({
            dod_id: dod_id
        })
    }

    getDocuments = async () => {

        try {

            let request = await fetch('/DocumentSave/GetAllTemplateDocuments', {credentials: "same-origin"})
            let documentList = await request.json()

            this.setState({
                documentResults: documentList
            })

        } catch(e) {
            throw new Error(e)
        }

    }

    getPendingDocuments = async () => {

        let pendingDocuments =  await
            fetch('/DocumentSave/GetSavedDocuments', {credentials: 'same-origin'})
                .then(data => {
                    return data.json()
                        .then(data => {
                            let responseArray = data.my_documents
                            return responseArray.map(item => {
                                return {
                                    name: item.document_name,
                                    document_id: item.submitted_document_id,
                                    is_complete: item.is_complete
                                }
                            })
                        })
                })
        
        let pendingDocumentList = []
        let completedDocumentList = []
        pendingDocuments.forEach(document => {
            if(document.is_complete) {
                completedDocumentList.push(document)
            }
            if(!document.is_complete) {
                pendingDocumentList.push(document)
            }
        })

        this.setState({
            pendingDocumentList: pendingDocumentList,
            completedDocumentList: completedDocumentList
        }, () => {
            this.handleDocumentListPress()
        })

    }

    getSignature = async () => {

        let request = await fetch('/Account/GetSignature', {credentials: 'same-origin'})
        let response = await request.json()

        this.setState({
            signature_base64: response.signature_base64
        })

    }

    getCurrentView = (currentView: React.ComponentElement<HTMLElement, any>) => {
        this.setState({
            currentView: currentView
          }, () => {
            this.props.getCurrentView(this.state.currentView)
          })
    }

    getCreateDocumentState = (createDocumentState: object): void => {
        this.setState({
            createDocumentState: createDocumentState
        })
    }

    //==================== Handle Notifications ======================

    getNotifications = async () => {

        try{
            let request = await fetch('/Notification', {credentials: 'same-origin'})
            let response = await request.json()
            let notificationCount = response.notification_count

            this.setState({
                notificationCount: notificationCount
            })

        } catch(e) {
            throw new Error(e)
        }

    }

    renderNotification = () => {
        if(this.state.notificationCount >= 0) {
            return <img id='pending-document-notification' src="/images/notification-undefined.png" alt="" onClick={this.handleDocumentListPress}/>
        }  
    }



    //================== OnClick/Button Handlers =================

    handleDocumentLinkPress = async (e) => {

        let target = e.target

        while (!target.classList.contains('document-item')) {
            target = target.parentNode
        }

        let document_id = target.id
        let pendingDocuments = this.state.pendingDocuments
        let document_name = ''

        pendingDocuments.forEach(document => {
            if(document.document_id === document_id) {
                document_name = document.name
            }
        })

        this.setState({
            document_id: document_id
        }, () => {
            this.setState({
                currentView: <DocumentView getDocuments={this.getDocuments} handleDocumentListPress={this.handleDocumentListPress} dod_id={this.state.dod_id} signature_base64={this.state.signature_base64} document_name={document_name} document_id={this.state.document_id} view={'PendingDocuments'} />
            }, () => {
                this.props.getCurrentView(this.state.currentView)
            })
        })

    }

    handleMetabarSelectionStyling = (selectedMetabarView: string, selectedMetabarViewButton: string): void => {

        //Removing classes from buttons
        document.getElementById('search-document-metabar-button').classList.remove('metabar-link-selected')
        document.getElementById('document-list-metabar-button').classList.remove('metabar-link-selected')
        document.getElementById('create-document-metabar-button').classList.remove('metabar-link-selected')
        document.getElementById('upload-document-metabar-button').classList.remove('metabar-link-selected')
        document.getElementById('signature-page-metabar-button').classList.remove('metabar-link-selected')

        //Removing classes from triangles
        document.getElementById('search-document-metabar-triangle').classList.remove('metabar-triangle-selected')
        document.getElementById('document-list-metabar-triangle').classList.remove('metabar-triangle-selected')
        document.getElementById('create-document-metabar-triangle').classList.remove('metabar-triangle-selected')
        document.getElementById('upload-document-metabar-triangle').classList.remove('metabar-triangle-selected')
        document.getElementById('signature-page-metabar-triangle').classList.remove('metabar-triangle-selected')

        //Adding class to button and triangle
        document.getElementById(selectedMetabarView).classList.add('metabar-link-selected')
        document.getElementById(selectedMetabarViewButton).classList.add('metabar-triangle-selected')
        
    }


    //================================ View Functions ==================================

    handleNewDocumentPress = () => {
        this.setState({
            currentView: <CreateDocument getPendingDocuments={this.getPendingDocuments} createDocumentState={this.state.createDocumentState} getCreateDocumentState={this.getCreateDocumentState} getCurrentView={this.getCurrentView} documentResults={this.state.documentResults} viewDocument={this.handleDocumentLinkPress} />
        }, () => {
            this.props.getCurrentView(this.state.currentView)
            this.handleMetabarSelectionStyling('create-document-metabar-button', 'create-document-metabar-triangle')
        })
    }

    handleDocumentListPress = () => {
        this.setState({
            currentView: <PendingDocuments selectDocument={this.handleDocumentLinkPress} pendingDocumentList={this.state.pendingDocumentList} completedDocumentList={this.state.completedDocumentList} />
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

    handleSearchDocumentPress = () => {
        this.setState({
            currentView: <SearchDocumentView documents={this.state.pendingDocumentList} selectDocument={this.handleDocumentLinkPress} />
        }, () => {
            this.props.getCurrentView(this.state.currentView)
            this.handleMetabarSelectionStyling('search-document-metabar-button', 'search-document-metabar-triangle')
        })
    }


    //==================== React Lifecycle Methods ====================

    componentDidMount() {
        this.getDocuments()
        this.getPendingDocuments()
        this.getNotifications()
        this.getSignature()
        this.getUser()
    }

    componentDidCatch() {

    }

    render() {

        return(
            <div id='MetaBar'>
                <div id='logo-container'>
                    <img id='logo' src='/images/MAPR_logo_edit.png'/>
                </div>
                <abbr title='Search Document' className='metabar-button-abbr'>
                    <img id='search-document-metabar-button' className='metabar-link' src='/images/search-icon-1.png' onClick={this.handleSearchDocumentPress}/>
                    <div id='search-document-metabar-triangle' className='metabar-triangle'></div>
                </abbr>
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