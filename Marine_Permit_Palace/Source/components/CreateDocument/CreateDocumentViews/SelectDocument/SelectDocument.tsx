import * as React from 'react';

import DocumentItem from '../../../DocumentList/DocumentItem/DocumentItem';
import DocumentList from '../../../DocumentList/DocumentList'

import {document} from '../../../../AppValidation'

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

        console.log(target.id)


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
                <div className='document-list-container'>
                    {this.getDocumentList(this.props.documents)}
                </div>
            </div>
        );
    }
}

export default SelectDocument;