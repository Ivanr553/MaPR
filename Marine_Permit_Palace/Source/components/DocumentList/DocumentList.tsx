import * as React from 'react'

import {document} from '../../AppValidation'

import DocumentItem from './DocumentItem/DocumentItem'

const s = require('./styling/style.sass')

interface Props {
    selectDocument: (e) => void,
    documents: Array<document>,
    document_id: string
}

export default class DocumentList extends React.Component<Props, any> {

    constructor(props) {
        super(props)
        this.state = {
            documentList: []
        }

    }

    //Creates list in state of objects to be rendered
    getDocumentList = (documents: Array<document>) => {

        return (
            documents.map(
                (document) => {
                    return (
                    <DocumentItem key={Math.random()} document={document} selectDocument={this.props.selectDocument} selectedDocument={this.props.document_id}/>
                )
            }
            )
        )
    }


    render() {
        return(
            <div className='document-list-container'>
                {this.getDocumentList(this.props.documents)}
            </div>
        )
    }

}