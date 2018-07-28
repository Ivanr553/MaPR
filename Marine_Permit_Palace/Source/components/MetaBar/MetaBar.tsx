import * as React from 'react'


const s = require('./styling/style.sass')

import PendingDocuments from '../PendingDocumentsView/PendingDocumentsView'
import DocumentView from '../DocumentView/DocumentView'
import About from '../About/About'
import CreateDocument from '../CreateDocument/CreateDocument'
import UploadDocument from '../UploadDocument/UploadDocument'
import SignatureView from '../SignatureView/SignatureView'

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
                                    idDocument: item.submitted_document_id
                                }
                            })
                        })
                })
        
    
        this.setState({
            pendingDocuments: pendingDocuments
        }, () => {
            this.handleDocumentListPress()
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
        if(this.state.notificationCount <= 0) {
            return <img id='pending-document-notification' src="/images/notification-undefined.png" alt="" onClick={this.handleDocumentListPress}/>
        }  
    }


    //================= Populating Content on Page ==================

    // populateDocumentLinks = () => {

    //     let documents = this.state.documentResults.slice()
    //     let documentLinks = []

    //     for(let i = 0; i < documents.length; i++) {

    //         let documentLink = 
    //             <div className='document-link' id={documents[i].idDocument} key={i} data-params={{ id: documents[i].id, document: documents[i]}} onClick={(e) => {this.handleLinkPress(e)}}>
    //                 {documents[i].name}
    //             </div>

    //         documentLinks.push(documentLink)
    //     }

    //     this.setState({
    //         documentLinks: documentLinks
    //     }, () => {
    //         this.handleDocumentListPress()
    //     })

    // }


    //================== OnClick/Button Handlers =================

    handleLinkPress = (e) => {

        let document_id = e.target.id

        this.setState({
            document_id: document_id
        })

        this.setState({
            currentView: <DocumentView document_id={this.state.document_id} view={'PendingDocuments'}/>
        })

        this.props.getCurrentView(this.state.currentView)
    }

    handleDocumentLinkPress = async (e) => {

        let target = e.target

        while (!target.classList.contains('document-item')) {
            target = target.parentNode
        }

        let document_id = target.id

        this.setState({
            document_id: document_id
        }, () => {
            this.setState({
                currentView: <DocumentView document_id={this.state.document_id} view={'PendingDocuments'} />
            }, () => {
                this.props.getCurrentView(this.state.currentView)
            })
        })

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
            currentView: <CreateDocument createDocumentState={this.state.createDocumentState} getCreateDocumentState={this.getCreateDocumentState} getCurrentView={this.getCurrentView} documentResults={this.state.documentResults} viewDocument={this.handleDocumentLinkPress} />
        }, () => {
            this.props.getCurrentView(this.state.currentView)
            this.handleMetabarSelectionStyling('create-document-metabar-button', 'create-document-metabar-triangle')
        })
    }

    handleDocumentListPress = () => {
        this.setState({
            currentView: <PendingDocuments selectDocument={this.handleDocumentLinkPress} pendingDocuments={this.state.pendingDocuments} />
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
        this.getPendingDocuments()
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