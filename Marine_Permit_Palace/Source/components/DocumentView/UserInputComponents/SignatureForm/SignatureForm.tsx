import * as React from 'react'

import {user} from '../../../CreateDocument/CreateDocumentValidation'

import './styling/SignatureFormStyle.sass'

interface Props {
    id: string,
    width: number,
    height: number,
    left: number,
    top: number,
    view: 'PendingDocuments' | 'DocumentPreview',
    assigned_to?: user,
    previewOnClickHandler?: (e, page: number, field_name: string) => void,
    signature_base64?: HTMLImageElement,
    signHandler?: (e, page) => void,
    is_disabled: boolean,
    page: number,
    field_name: string
}

export default class SignatureForm extends React.Component<Props, any> {

    constructor(props) {
        super(props)
        this.state = {
            style: {},
            signatureContent: 'Click to Sign'
        }
    }

    getDocumentPreviewStyle = (): React.CSSProperties => {

        if(!!this.props.assigned_to) {

            let style: React.CSSProperties = {
                width: `${this.props.width}px`,
                height: `${this.props.height}px`,
                top: `${this.props.top}px`,
                left: `${this.props.left}px`,
                backgroundColor: 'rgb(189, 255, 181)'
            }
    
            return style
        }
        else {

            let style: React.CSSProperties = {
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
    getPendingDocumentsStyle = (): React.CSSProperties => {

        if(this.props.is_disabled) {

            let style: React.CSSProperties = {
                width: `${this.props.width}px`,
                height: `${this.props.height}px`,
                top: `${this.props.top}px`,
                left: `${this.props.left}px`,
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                cursor: 'default'
            }

            return style

        } else {

            if(this.props.signature_base64) {
                
                let style: React.CSSProperties = {
                    width: `${this.props.width}px`,
                    height: `${this.props.height}px`,
                    top: `${this.props.top}px`,
                    left: `${this.props.left}px`,
                    backgroundColor: 'rgba(43, 173, 255, 0.1)',
                    cursor: 'default'
                }
        
                return style
            }

            let style: React.CSSProperties = {
                width: `${this.props.width}px`,
                height: `${this.props.height}px`,
                top: `${this.props.top}px`,
                left: `${this.props.left}px`,
                backgroundColor: 'rgba(255, 242, 0, 0.1)'
            }
    
            return style

        }
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

            if(this.props.is_disabled) {
                <div id={this.props.id} className='SignatureForm' style={this.getDocumentPreviewStyle()}>
                    {this.documentPreviewContent()}
                </div> 
            }

            return (
                <div id={this.props.id} className='SignatureForm' style={this.getDocumentPreviewStyle()} onClick={(e) => {this.props.previewOnClickHandler(e, this.props.page, this.props.field_name)}}>
                    {this.documentPreviewContent()}
                </div> 
            )
        }
        if(this.props.view === 'PendingDocuments') {

            if(this.props.is_disabled) {
                return(
                    <div id={this.props.id} className='SignatureForm' style={this.getPendingDocumentsStyle()}>
                        {this.getSignatureContent()}
                    </div>
                )
            }

            return(
                <div id={this.props.id} className='SignatureForm' style={this.getPendingDocumentsStyle()} onClick={(e) => this.props.signHandler(e, this.props.page)}>
                    {this.getSignatureContent()}
                </div>
            )
        }


    }

}