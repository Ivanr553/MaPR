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


        this.setState({
            document_id: target.id
        }, () => {
            this.giveDocumentId()
            this.giveSelectDocumentComplete()
        })
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
        this.handleShow()
    }
 
    render() {

        return (
            <div id='SelectDocument' style={this.handleShow()}>
                <div className='documents-header'>Select Template Document</div>
                <DocumentList documents={this.props.documents} selectDocument={this.selectDocument}document_id={this.props.document_id} />
            </div>
        );
    }
}

export default SelectDocument;