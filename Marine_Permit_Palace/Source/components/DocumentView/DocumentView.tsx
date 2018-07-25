import * as React from 'react'
import PDF from 'react-pdf-js'

const s = require('./styling/style.sass')

import SignatureForm from './UserInputComponents/SignatureForm/SignatureForm'
import CheckboxInput from './UserInputComponents/CheckboxInput/CheckboxInput'
import TextInput from './UserInputComponents/TextInput/TextInput'

import {documentResponse, saveResultInterface, documentDimensions, document_meta_field} from '../../AppValidation'
import {getDocumentPromise, getSaveFilePromise} from '../../services/services'

interface Props {
    document_id: string,
    view: 'PendingDocuments' | 'DocumentPreview',
    previewOnClickHandler?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    document_meta?: Array<document_meta_field> 
}

export default class DocumentView extends React.Component<Props, any> {

    constructor(props) {
        super(props)
        this.state ={
            documentObject: undefined,
            submitted_file_id: '',
            noDocument: false
        }
    }

    checkForDocument = (): boolean => {
        if(this.props.document_id === '') {
            this.setState({
                noDocument: true
            })
            return false
        } else {
            this.setState({
                noDocument: false
            })
            return true
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

    cleanUpFieldName = (name: string): string => {
        while(name.indexOf('_') > -1) {
            name = name.replace('_', ' ')
        }
        return name
    }

    populatePage = async () =>  {

        if(!this.checkForDocument()) {
            return
        }
      
        let documentPromise = getDocumentPromise(this.props.document_id)
        this.setState({
            documentPromise: await documentPromise
        })

        let response = await documentPromise
        let documentObject: documentResponse = await response.promise as documentResponse

        this.setState({
            documentObject: documentObject,
            document_id: this.props.document_id
        }, () => {
            this.saveFile()
        })

    }

    documentFields = () => {

        let documentObject = this.state.documentObject
        if(!!!this.state.documentObject) {
            return
        }
        if(!!this.props.document_meta && !!documentObject) {
            documentObject.document_meta = this.props.document_meta
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
                    document_meta_field.value = false
                }

                let newForm = <CheckboxInput key={form} id={form} width={dimensions.width} height={dimensions.height} top={dimensions.top} left={dimensions.left} checked={document_meta_field.value} onChange={(e) => {this.handleFormEdit(e, form)}} view={this.props.view} previewOnClickHandler={this.props.previewOnClickHandler} />

                documentFields.push(newForm)
            }
            else if(document_meta_field.field_type === 'Text') {
                let newForm = 
                    <div key={form} className='form-wrapper'>
                        <TextInput key={form} id={form} position={'absolute'} border={'none'} width={dimensions.width} height={dimensions.height} top={dimensions.top} left={dimensions.left} value={document_meta_field.value} onChange={(e) => {this.handleFormEdit(e, form)}} view={this.props.view} previewOnClickHandler={this.props.previewOnClickHandler} />
                    </div>

                documentFields.push(newForm)
            }
            else if(document_meta_field.field_type === 'Signature') {
                let newForm = <SignatureForm key={form} id={form} width={dimensions.width} height={dimensions.height} top={dimensions.top} left={dimensions.left} view={this.props.view} previewOnClickHandler={this.props.previewOnClickHandler} assigned_to={document_meta_field.assigned_to}/>

                documentFields.push(newForm)
            }

        }

        return documentFields

    }

    async handleFormEdit(e, id) {

        let documentObject = Object.assign({}, this.state.documentObject)
        let document_meta_field = documentObject.document_meta[id]

        if(e.target.className === 'CheckboxInput'){
            document_meta_field.value = !document_meta_field.value
        } else {
            document_meta_field.value = e.target.value
        }


        this.setState({
            documentObject: documentObject
        }, () => {
            this.saveFile()
        })
    }

    saveFile = async () => {
        
        let saveFile = {
            document_meta: this.state.documentObject.document_meta,
            name: (this.state.name !== '' ? this.state.name : 'New Document'),
            document_id: this.state.document_id,
            submitted_file_id: this.state.submitted_file_id
        }

        let saveFilePromise = getSaveFilePromise(saveFile)
        this.setState({
            saveFilePromise: await saveFilePromise
        })

        let response = await saveFilePromise
        let saveResult: saveResultInterface = await response.promise

        if(!this.state.submitted_file_id || this.state.submitted_file_id === null) {
            this.setState({
                submitted_file_id: saveResult.reason
            })
        }

    }

    componentDidMount() {
        if(!!!this.props.document_meta) {
            getDocumentPromise(this.props.document_id)
            this.populatePage()
        } else {
            this.setState({
                document_meta: this.props.document_meta
            }, () => {
                this.populatePage()
            })
        }
    }

    componentWillUnmount() { 
        if(!!this.state.documentPromise) {
            this.state.documentPromise.cancel()
        }
        if(!!this.state.saveFilePromise) {
            this.state.saveFilePromise.cancel()
        }
    }

    render() {
        let document_id = '../../dist/documents/NAVMC10694.pdf'
        let noDocumentWarning = <div></div>

        if(this.state.noDocument) {
            noDocumentWarning = (
                <div id='document-view-no-document-warning'>
                    There is no document selected
                </div>
            )
        }

        return(
            <div className='DocumentView'>
                {noDocumentWarning}
                <PDF className='pdf-image' file={document_id} >
                </PDF>
                <div id='document-form-div'>
                    {this.documentFields()}
                </div>
            </div>
        )
    }

}