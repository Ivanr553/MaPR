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
            file: '',
            currentView: '',
            documentList: []
        }

        this.handleDocumentLinkPress = this.handleDocumentLinkPress.bind(this)
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

        this.setState({
            currentView: <DocumentView file={this.state.file} />
        })

        let getCurrentView = await this.props.getCurrentView(this.state.currentView)
    }

        //Creates list in state of objects to be rendered
        renderDocuments() {

            let documents = this.props.documentResults
            let documentList = []
    
            for(let i = 0; i < documents.length; i++) {
    
                let file = '/dist/documents/' + documents[i].file
    
                let newDocument = 
                    <div className='viewable-document' key={i} id={documents[i].file} onClick={(e) => {this.props.viewDocument(e)}}> 
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
            })
    
        }
    
        componentWillMount() {
            this.renderDocuments()
        }

    render() {

        return(
            <div id='NewDocument'>
                <div id='notice' className='documents-header'>** Not Implemented **</div>
                <div className='documents-header'>Create Document</div>
                <div className='document-list-container'>
                    {this.state.documentList}
                </div>
            </div>
        )

    }


}