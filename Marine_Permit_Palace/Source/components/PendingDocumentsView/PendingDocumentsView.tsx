import * as React from 'react'

import DocumentList from '../DocumentList/DocumentList'
import {document} from '../../AppValidation'

import  './styling/style.sass'

interface Props {
    pendingDocumentList: Array<document>,
    completedDocumentList: Array<document>,
    handleDocument: (document_id: string, document_name: string) => void
}

export default class PendingDocumentsView extends React.Component<Props, any> {

    constructor(props) {
        super(props)
        this.state = {
            documentList: []
        }
    }

    render() {

        return(
            <div className='DocumentList'>
                <div className='documents-header'>Pending Documents</div>
                <DocumentList documents={this.props.pendingDocumentList} handleDocument={this.props.handleDocument} document_id={this.state.document_id} />
                <div className='documents-header'>Completed Documents</div>
                <DocumentList documents={this.props.completedDocumentList} handleDocument={this.props.handleDocument} document_id={this.state.document_id} />
            </div>
        )
    }

}