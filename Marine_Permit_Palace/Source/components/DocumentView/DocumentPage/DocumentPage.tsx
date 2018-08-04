import * as React from 'react';
import PDF from 'react-pdf-js'

import './DocumentPageStyle.sass'

import {documentResponse, document_meta_field, documentDimensions} from '../../../AppValidation'
import CheckboxInput from '../UserInputComponents/CheckboxInput/CheckboxInput';
import TextInput from '../UserInputComponents/TextInput/TextInput';
import SignatureForm from '../UserInputComponents/SignatureForm/SignatureForm';

interface Props {
    documentObject: documentResponse,
    document_meta?: Array<document_meta_field>, 
    pdfSource: string,
    page: number,
    handleFormEdit: (e, form) => void,
    previewOnClickHandler?: () => void,
    view: any,
    signature_base64: string,
    autoSave: () => void,
    signHandler: (e) => void
}

class DocumentPage extends React.Component<Props, any> {

    getStyle = (): React.CSSProperties => {

        if(this.props.page > 1) {

            let style: React.CSSProperties = {
                marginTop: '20vh'
            }

            return style

        } else {
            
            return {}
        }

    }


    getDocumentSize = (documentObject: documentResponse, fieldLeft: number, fieldTop: number, fieldHeight: number, fieldWidth: number): documentDimensions => {

        let pdfWidth = documentObject.document_size.right
        let pdfHeight = documentObject.document_size.height
        let webWidth = 612 //in px
        let webHeight = 792 // in px

        let measurements = {
            pdfHeight: pdfHeight,
            pdfWidth: pdfWidth,
            webHeight: webHeight,
            webWidth: webWidth
        }

        let left = ((fieldLeft) * measurements.webWidth) / measurements.pdfWidth
        let top = ((measurements.pdfHeight - fieldTop) * measurements.webHeight) / measurements.pdfHeight
        let height = (fieldHeight * measurements.webHeight) / measurements.pdfHeight
        let width = (fieldWidth * measurements.webWidth) / measurements.pdfWidth

        return {
            left: left,
            top: top,
            height: height,
            width: width
        }
    }

    createDocumentFields = (documentObject) => {

        if(!!!this.props.documentObject) {
            return
        }
        documentObject = Object.assign({}, this.props.documentObject)
        if(!!this.props.document_meta && !!documentObject) {
            documentObject.document_meta = this.props.document_meta
        }

        if(documentObject.document_meta.length === 0) {
            alert('No Document Meta')
            return
        }

        let documentFields = []

        for(let form in documentObject.document_meta) {
            
            let document_meta_field: document_meta_field = documentObject.document_meta[form]
            let dimensions =   
                this.getDocumentSize(
                    documentObject,
                    document_meta_field.field_position.position.left,
                    document_meta_field.field_position.position.top,
                    document_meta_field.field_position.position.height,
                    document_meta_field.field_position.position.width
                )

            if(document_meta_field.field_type === 'Checkbox') {

                if(document_meta_field.value === '') {
                    document_meta_field.value = 'Off'
                }

                let newForm = <CheckboxInput is_disabled={document_meta_field.is_disabled} key={form} id={form} width={dimensions.width} height={dimensions.height} top={dimensions.top} left={dimensions.left} checked={document_meta_field.value} onChange={(e) => {this.props.handleFormEdit(e, form)}} view={this.props.view} previewOnClickHandler={this.props.previewOnClickHandler} />

                documentFields.push(newForm)
            }
            else if(document_meta_field.field_type === 'Text') {
                let newForm = 
                    <div key={form} className='form-wrapper'>
                        <TextInput is_disabled={document_meta_field.is_disabled} key={form} id={form} position={'absolute'} border={'none'} width={dimensions.width} height={dimensions.height} top={dimensions.top} left={dimensions.left} value={document_meta_field.value} onChange={(e) => {this.props.handleFormEdit(e, form)}} view={this.props.view} previewOnClickHandler={this.props.previewOnClickHandler} />
                    </div>

                documentFields.push(newForm)
            }
            else if(document_meta_field.field_type === 'Signature') {
                let newForm = <SignatureForm is_disabled={document_meta_field.is_disabled} key={form} id={form} width={dimensions.width} height={dimensions.height} top={dimensions.top} left={dimensions.left} view={this.props.view} previewOnClickHandler={this.props.previewOnClickHandler} assigned_to={document_meta_field.assigned_to} signature_base64={document_meta_field.value} signHandler={this.props.signHandler}/>

                documentFields.push(newForm)
            }

        }

        return documentFields

    }

    render() {
        return (
            <div className='DocumentPage' style={this.getStyle()}>
                <PDF className='pdf-image' file={this.props.pdfSource} page={this.props.page} />
                <div className='document-fields-container'>
                    {this.createDocumentFields(this.props.documentObject)}
                </div>
            </div>
        );
    }
}

export default DocumentPage;