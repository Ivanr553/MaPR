import * as React from 'react'
import * as $ from 'jquery'
import PDF from 'react-pdf-js'

const s = require('./styling/style.sass')

import DocumentList from '../DocumentList/DocumentList'
import DocumentView from '../DocumentView/DocumentView'

export default class CreateDocument extends React.Component<any, any> {

    constructor(props) {
        super(props)
        this.state = {
            documentResults: this.props.documentResults,
            currentView: '',
            documentList: [],
            document_id: ''
        }

        // this.handleDocumentLinkPress = this.handleDocumentLinkPress.bind(this)
        this.handleSelectDocumentView = this.handleSelectDocumentView.bind(this)
        this.handleCreateDocumentView = this.handleCreateDocumentView.bind(this)
    }

    //Views
    handleSelectDocumentView() {
        let currentView = (
            <div>
                <div className='documents-header'>Select Document</div>
                <div className='document-list-container'>
                    {this.state.documentList}
                    <button className='create-document-button' onClick={this.handleCreateDocumentView} id='create-document-next-button'>Next</button>
                </div>
            </div>
        )
        this.setState({
            currentView: currentView
        })
    }

    handleCreateDocumentView() {
        let currentView = (
            <div>
                <div className='documents-header'>Create Document</div>
                <div className='document-list-container'>
                    <div>Selected Document: {this.state.document_id}</div>
                    <div>Send to:</div>
                    <div>Allow viewing priviledge:</div>
                    <button className='create-document-button' id='create-document-back-button' onClick={this.handleSelectDocumentView}>Back</button>
                    <button className='create-document-button' id='create-document-next-button'>Next</button>
                </div>
            </div>
        )
        this.setState({
            currentView: currentView
        })
    }

    // async handleDocumentLinkPress(e) {

    //     let target = e.target

    //     while (!target.classList.contains('viewable-document')) {
    //         target = target.parentNode
    //     }

    //     let document_id = target.id

    //     let setFile = await this.setState({
    //         document_id: document_id
    //     })

    //     this.setState({
    //         currentView: <DocumentView file={this.state.document_id} />
    //     })

    //     let getCurrentView = await this.props.getCurrentView(this.state.currentView)
    // }

    //Creates list in state of objects to be rendered
    renderDocuments() {

        let documents = this.props.documentResults
        let documentList = []

        for(let i = 0; i < documents.length; i++) {

            let file = '/dist/documents/' + documents[i].file

            let newDocument = 
                <div className='viewable-document' key={i} id={documents[i].file} onClick={(e) => {this.selectDocument(e)}}> 
                    <div className='pdf-preview-container'>
                        <PDF className='pdf-preview' file={file}/>
                        <div className='pdf-preview-shader'></div>
                    </div>
                    <div className='viewable-document-title'>
                        {documents[i].title}
                    </div>
                    {/* <div className='viewable-document-action-title'>
                        Action Required:
                        <div className='viewable-document-action'>
                            {documents[i].action_required}
                        </div>
                        </div>
                        <div className='viewable-document-status-title'>
                        Status: 
                        <div className='viewable-document-status'>
                            {documents[i].status}
                        </div>
                        </div> */}
                </div>

            documentList.push(newDocument)
            }

        this.setState({
            documentList: documentList
        }, () => {
            this.handleSelectDocumentView()
        })

    }

    selectDocument(e) {
        let target = e.target

        while (!target.classList.contains('viewable-document')) {
            target = target.parentNode
        }
        let parent = target.parentNode

        for(let i = 0; i < parent.children.length; i++) {
            if(parent.children[i].className === 'viewable-document') {
                parent.children[i].children[0].children[1].style.opacity = 0
            }
        }

        target.children[0].children[1].style.opacity = 0.5

        this.setState({
            document_id: target.id
        })

    }

    componentWillMount() {
        this.renderDocuments()
    }

    render() {

        return(
            <div id='NewDocument'>
                {/* <div id='notice' className='documents-header'>** Work In Progress **</div> */}
                {this.state.currentView}
            </div>
        )

    }


}