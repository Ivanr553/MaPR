import * as React from 'react'
import { Link } from 'react-router-dom'
import PDF from 'react-pdf-js'

const s = require('./styling/style.sass')

export default class DocumentList extends React.Component<any, any> {

    constructor(props) {
        super(props)
        this.state = {
            documentList: []
        }
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
            <div className='DocumentList'>
                <div className='documents-header'>
                    Search
                </div>
                <div id='document-search-bar-container'>
                    <input id='document-search-bar' type="text"/>
                    <button id='document-search-submit-button'>Search</button>
                </div>
                <div className='documents-header'>Documents</div>
                {this.state.documentList}
            </div>
        )
    }

}