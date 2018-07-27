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
    signatureSource?: any
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
    sign = async () => {

        let request = await fetch('/Account/GetSignature', {credentials: 'same-origin'})
        let response = await request.json()
        let data = `data:image/png;base64,${response.signature_base64}`

        let signature = <img className='user-signature' src={data} alt=""/>

        this.setState({
            signatureContent: signature
        })
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
                <div className='SignatureForm' style={this.getPendingDocumentsStyle()} onClick={this.sign}>
                    {this.state.signatureContent}
                </div>
            )
        }


    }

}