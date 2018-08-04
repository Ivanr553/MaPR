import * as React from 'react'

import {document} from '../../AppValidation'

import DocumentResult from '../DocumentResult/DocumentResult'

import './styling/DocumentListStyle.sass'

interface Props {
    handleDocument: (document_id: string, document_name: string) => void
    documents: Array<any>,
    document_id?: string
}

export default class DocumentList extends React.Component<Props, any> {

    constructor(props) {
        super(props)
        this.state = {
            documentList: []
        }

    }

    //Creates list in state of objects to be rendered
    getDocumentList = (documents: Array<any>) => {

        documents = documents.map(document => {
            if(!!document.idDocument){
                let document_id = document.idDocument
                delete document.idDocument
                document.document_id = document_id
                return document
            } else {
                return document
            }
        })

        return (
            documents.map(
                (document) => {
                    return (
                    <DocumentResult key={Math.random()} document={document} handleDocument={this.props.handleDocument}/>
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