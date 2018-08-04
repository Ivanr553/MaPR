import * as React from 'react';

import './SelectDocumentStyle.sass'
import DocumentItem from '../../../DocumentList/DocumentItem/DocumentItem';
import { document } from '../../../../AppValidation';

interface Props {
    selectDocument: (e) => void,
    document_id: string,
    documents: Array<document>
}

class SelectDocumentList extends React.Component<Props, any> {

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
            documents.map((currentDocument, index) => {
                return (
                    <DocumentItem key={index} selectedDocument={this.props.document_id} document={currentDocument} selectDocument={this.props.selectDocument}/>
                )
            })
        )   
    }

    render() {
        return (
            <div className='document-list-container'>
                {this.getDocumentList(this.props.documents)}
            </div>
        )
    }
}

export default SelectDocumentList;