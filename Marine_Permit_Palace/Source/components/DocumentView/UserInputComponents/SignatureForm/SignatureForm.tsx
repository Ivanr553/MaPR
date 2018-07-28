import * as React from 'react'

import {user} from '../../../CreateDocument/CreateDocumentValidation'

const s = require('./styling/style.sass')

interface Props {
    id: string,
    width: number,
    height: number,
    left: number,
    top: number,
    view: 'PendingDocuments' | 'DocumentPreview',
    assigned_to?: user,
    previewOnClickHandler?: any,
    signature_base64?: HTMLImageElement,
    signHandler?: (e) => void
}

export default class SignatureForm extends React.Component<Props, any> {

    constructor(props) {
        super(props)
        this.state = {
            style: {},
            signatureContent: 'Click to Sign'
        }
    }

    getDocumentPreviewStyle = () => {

        if(!!this.props.assigned_to) {

            let style = {
                width: `${this.props.width}px`,
                height: `${this.props.height}px`,
                top: `${this.props.top}px`,
                left: `${this.props.left}px`,
                backgroundColor: 'rgb(189, 255, 181)'
            }
    
            return style
        }
        else {

            let style = {
                width: `${this.props.width}px`,
                height: `${this.props.height}px`,
                top: `${this.props.top}px`,
                left: `${this.props.left}px`,
                backgroundColor: 'rgb(255, 180, 180)'
            }
    
            return style
        }

    }

    //Getting style from props
    getPendingDocumentsStyle = () => {

        let style = {
            width: `${this.props.width}px`,
            height: `${this.props.height}px`,
            top: `${this.props.top}px`,
            left: `${this.props.left}px`,
        }

        return style
    }


    //Takes signature png and embeds it into component
    getSignatureContent = () => {
        if(!!!this.props.signature_base64) {
            return <img src="" alt=""/>
        }

        return <img className='user-signature' src={`data:image/png;base64,${this.props.signature_base64}`} alt=""/>
       
    }

    documentPreviewContent = () => {

        return !!this.props.assigned_to ? `Assigned to: ${this.props.assigned_to.dod_id}` : `Click to Assign Signature`

    }

    render() {

        if(this.props.view === 'DocumentPreview') {

            return (
                <div id={this.props.id} className='SignatureForm' style={this.getDocumentPreviewStyle()} onClick={(e) => {this.props.previewOnClickHandler(e)}}>
                    {this.documentPreviewContent()}
                </div> 
            )
        }
        if(this.props.view === 'PendingDocuments') {


            return(
                <div id={this.props.id} className='SignatureForm' style={this.getPendingDocumentsStyle()} onClick={(e) => this.props.signHandler(e)}>
                    {this.getSignatureContent()}
                </div>
            )
        }


    }

}