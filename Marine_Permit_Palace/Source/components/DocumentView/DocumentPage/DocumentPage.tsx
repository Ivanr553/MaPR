import * as React from 'react';
import PDF from 'react-pdf-js'

import './DocumentPageStyle.sass'

import {document_meta_field, documentDimensions} from '../../../AppValidation'
import CheckboxInput from '../UserInputComponents/CheckboxInput/CheckboxInput';
import TextInput from '../UserInputComponents/TextInput/TextInput';
import SignatureForm from '../UserInputComponents/SignatureForm/SignatureForm';

import {documentPage} from '../../../AppValidation'

interface Props {
    documentPage: documentPage,
    document_meta?: Array<document_meta_field>, 
    pdfSource: string,
    page: number,
    handleFormEdit: (e, page, form) => void,
    previewOnClickHandler?: (e, page: number, field_name: string) => void,
    view: any,
    signature_base64: string,
    autoSave: () => void,
    signHandler: (e, page) => void
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


    getDocumentSize = (documentPage: documentPage, fieldLeft: number, fieldTop: number, fieldHeight: number, fieldWidth: number): documentDimensions => {

        let pdfWidth = documentPage.page.right
        let pdfHeight = documentPage.page.height
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

    createDocumentFields = (documentPage: documentPage) => {

        if(!!!this.props.documentPage) {
            return
        }
        if(!!this.props.document_meta && !!documentPage) {
            documentPage.document_meta = this.props.document_meta
        }

        if(documentPage.document_meta.length === 0) {
            alert('No Document Meta')
            return
        }

        let documentFields = []

        for(let form in documentPage.document_meta) {
            
            let document_meta_field: document_meta_field = documentPage.document_meta[form]
            let dimensions =   
                this.getDocumentSize(
                    documentPage,
                    document_meta_field.field_position.position.left,
                    document_meta_field.field_position.position.top,
                    document_meta_field.field_position.position.height,
                    document_meta_field.field_position.position.width
                )

            if(document_meta_field.field_type === 'Checkbox') {

                if(document_meta_field.value === '') {
                    document_meta_field.value = 'Off'
                }

                let newForm = <CheckboxInput field_name={document_meta_field.field_name} page={this.props.page} is_disabled={document_meta_field.is_disabled} key={form} id={form} width={dimensions.width} height={dimensions.height} top={dimensions.top} left={dimensions.left} checked={document_meta_field.value} onChange={(e) => {this.props.handleFormEdit(e, (this.props.page - 1), form)}} view={this.props.view} previewOnClickHandler={this.props.previewOnClickHandler} />

                documentFields.push(newForm)
            }
            else if(document_meta_field.field_type === 'Text') {
                let newForm = 
                    <div key={form} className='form-wrapper'>
                        <TextInput field_name={document_meta_field.field_name} is_disabled={document_meta_field.is_disabled} key={form} id={form} position={'absolute'} border={'none'} width={dimensions.width} height={dimensions.height} top={dimensions.top} left={dimensions.left} value={document_meta_field.value} page={this.props.page} onChange={(e) => {this.props.handleFormEdit(e, (this.props.page - 1), form)}} view={this.props.view} previewOnClickHandler={this.props.previewOnClickHandler} />
                    </div>

                documentFields.push(newForm)
            }
            else if(document_meta_field.field_type === 'Signature') {
                let newForm = <SignatureForm field_name={document_meta_field.field_name} page={this.props.page} is_disabled={document_meta_field.is_disabled} key={form} id={form} width={dimensions.width} height={dimensions.height} top={dimensions.top} left={dimensions.left} view={this.props.view} previewOnClickHandler={this.props.previewOnClickHandler} assigned_to={document_meta_field.assigned_to} signature_base64={document_meta_field.value} signHandler={this.props.signHandler}/>

                documentFields.push(newForm)
            }

        }

        return documentFields

    }

    render() {
        return (
            <div className='DocumentPage' style={this.getStyle()}>
                <PDF className='pdf-image' file={this.props.pdfSource} page={(this.props.page+1)} />
                <div className='document-fields-container'>
                    {this.createDocumentFields(this.props.documentPage)}
                </div>
            </div>
        );
    }
}

export default DocumentPage;