import * as React from 'react'

import DocumentList from '../DocumentList/DocumentList'
import {document} from '../../AppValidation'

const s = require('./styling/style.sass')

interface Props {
    documents: Array<document>,
    selectDocument: (e) => void
}

export default class PendingDocumentsView extends React.Component<Props, any> {

    constructor(props) {
        super(props)
        this.state = {
            documentList: []
        }
    }

    getDocuments = async () => {

        let request = await fetch('/DocumentSave/GetAllTemplateDocuments', {credentials: 'same-origin'})
        let response = await request.json()
        console.log(response)

    }

    componentDidMount() {
        this.getDocuments()
    }

    render() {
        return(
            <div className='DocumentList'>
                <div className='documents-header'>Pending Documents</div>
                <DocumentList documents={this.props.documents} selectDocument={this.props.selectDocument} document_id={this.state.document_id} />
            </div>
        )
    }

}