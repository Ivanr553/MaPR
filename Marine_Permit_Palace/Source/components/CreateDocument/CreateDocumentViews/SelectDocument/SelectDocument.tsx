import * as React from 'react';

import DocumentItem from '../../../DocumentList/DocumentItem/DocumentItem';

import {document} from '../../../../AppValidation'
import SelectDocumentList from './SelectDocumentList';

interface Props {
    documents: Array<document>,
    getDocumentId(document_id: string): void,
    getSelectDocumentComplete(selectDocumentComplete: boolean): void,
    selectDocumentBoolean: boolean,
    document_id: string

}

class SelectDocument extends React.Component<Props, any> {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    handleShow = () => {
        if(!this.props.selectDocumentBoolean) {

            let style = {
                display: 'none'
            } 

            return style

        } else {
            
            let style = {
                display: 'block'
            } 

            return style
        
        }
    }

    selectDocument = (e) => {
        
        let target = e.target

        while (!target.classList.contains('document-item')) {
            target = target.parentNode
        }


        this.setState({
            document_id: target.id
        }, () => {
            this.giveDocumentId()
            this.giveSelectDocumentComplete()
        })
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
                    <DocumentItem key={Math.random()} selectedDocument={this.props.document_id} document={document} selectDocument={this.selectDocument}/>
                )
            }
            )
        )
    }

    //State Management
    giveDocumentId = () => {
        this.props.getDocumentId(this.state.document_id)
    }

    giveSelectDocumentComplete = () => {
        this.props.getSelectDocumentComplete(true)
    }


    //React Lifecycle
    componentDidMount() {

    }
 
    render() {
        return (
            <div id='SelectDocument' style={this.handleShow()}>
                <div className='documents-header'>Select Template Document</div>
                <SelectDocumentList selectDocument={this.selectDocument} document_id={this.props.document_id} documents={this.props.documents} />
            </div>
        );
    }
}

export default SelectDocument;