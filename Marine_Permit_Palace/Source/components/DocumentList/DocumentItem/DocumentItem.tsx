import * as React from 'react';

import {document} from '../../../AppValidation'
 
interface Props {
    document: document,
    selectDocument: (e) => void,
    selectedDocument: string
}

class DocumentItem extends React.Component<Props, any> {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    getStyle = () => {

        if(this.props.document.idDocument === this.props.selectedDocument) {

            return {
                border: 'solid 2px rgba(38, 107, 168, 0.7)'
            }
        }

        if(this.props.document.idDocument !== this.props.selectedDocument) {
            
            return {
                border: 'solid 2px rgba(0, 0, 0, 0)'
            }
        }

    }

    render() {
        return (
            <div className='document-item' style={this.getStyle()} id={this.props.document.idDocument} onClick={(e) => {this.props.selectDocument(e)}}>
                {/* <div className='document-item-field'>ID: {this.props.document.idDocument}</div> */}
                <div className='document-item-field'>{this.props.document.name}</div>
            </div>
        );
    }
}

export default DocumentItem;