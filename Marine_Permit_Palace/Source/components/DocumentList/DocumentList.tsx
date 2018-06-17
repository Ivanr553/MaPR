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
                <div key={i} className='viewable-document' id={documents[i].file} onClick={(e) => {this.props.viewDocument(e)}}>
                    <div className='viewable-document-field' id='first-field'>{(i+1) + '.'}</div>
                    <div className='viewable-document-field'>{documents[i].title}</div>
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
                <div className='documents-header'>Pending Documents</div>
                <div className='document-list-container'>
                    {/* <div id='document-search-bar-container'>
                        <input placeholder=' ** Not Implemented **' id='document-search-bar' type="text"/>
                        <button id='document-search-submit-button'>Search</button>
                    </div> */}
                    {this.state.documentList}
                </div>
            </div>
        )
    }

}