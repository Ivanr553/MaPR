import * as React from 'react'

import './styling/DocumentViewStyle.sass'

import SignatureForm from './UserInputComponents/SignatureForm/SignatureForm'
import CheckboxInput from './UserInputComponents/CheckboxInput/CheckboxInput'
import TextInput from './UserInputComponents/TextInput/TextInput'

import {documentResponse, saveResultInterface, documentDimensions, document_meta_field, document} from '../../AppValidation'
import {getDocumentPromise, getTemplateDocumentPromise, getSaveFilePromise} from '../../services/services'
import ToolBar from './ToolBar/ToolBar';
import DocumentPage from './DocumentPage/DocumentPage';

interface Props {
    document_id: string,
    document_name?: string,
    view: 'PendingDocuments' | 'DocumentPreview',
    previewOnClickHandler?: (e: React.ChangeEvent<HTMLInputElement>) => void,
    document_meta?: Array<document_meta_field>,
    signature_base64?: string,
    dod_id?: number,
    handleDocumentListPress?: () => void,
    getPendingDocuments?: () => void
}

export default class DocumentView extends React.Component<Props, any> {

    constructor(props) {
        super(props)
        this.state ={
            submitted_file_id: '',
            noDocument: false,
            savingIconSource: '/images/clock.png',
            savingIconId: '',
            loading: (
                <div className='loading-image'>Loading...</div>
            ),
            savingBar: ''
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

    // WHEN EDITING THE DIFFERENT FIELDS THERE MUST BE A WAY TO LINK THE FIELDS BACK TO THE CORRECT DOCUMENT OBJECT!

    generatePages = () => {

        let pages = []
        let documentObjectArray = [this.state.documentObject]

        documentObjectArray.forEach((documentObject, index) => {

            let newPage = <DocumentPage documentObject={documentObject} pdfSource={'/dist/documents/NAVMC10694.pdf'} page={index+1} handleFormEdit={this.handleFormEdit} view={this.props.view} signature_base64={this.props.signature_base64} autoSave={this.autoSave} signHandler={this.signHandler} />

            pages.push(newPage)

        })

        return pages

    }

    getDocumentObject = async () =>  {

        if(!this.checkForDocument()) {
            return
        }

        let request
        if(this.props.view === 'PendingDocuments') {
            request = getDocumentPromise(this.props.document_id)
        }
        if(this.props.view === 'DocumentPreview') {
            request = getTemplateDocumentPromise(this.props.document_id)
        }

        let documentPromise = await request
        this.setState({
            documentPromise: await documentPromise
        })
        let documentObject: documentResponse 
        try {
            let response = await documentPromise.promise 
            documentObject = await response.json() as documentResponse
            if(documentObject.status_code === 401) {
                documentObject = null
                alert('User does not have permission to view')
            }
        } catch(e) {
            throw new Error(e)
        }


        this.setState({
            documentObject: documentObject,
            document_id: this.props.document_id
        })

    }

    createDocumentFields = (documentObject) => {

        if(!!!this.state.documentObject) {
            return
        }
        documentObject = Object.assign({}, this.state.documentObject)
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

                let newForm = <CheckboxInput is_disabled={document_meta_field.is_disabled} key={form} id={form} width={dimensions.width} height={dimensions.height} top={dimensions.top} left={dimensions.left} checked={document_meta_field.value} onChange={(e) => {this.handleFormEdit(e, form)}} view={this.props.view} previewOnClickHandler={this.props.previewOnClickHandler} />

                documentFields.push(newForm)
            }
            else if(document_meta_field.field_type === 'Text') {
                let newForm = 
                    <div key={form} className='form-wrapper'>
                        <TextInput is_disabled={document_meta_field.is_disabled} key={form} id={form} position={'absolute'} border={'none'} width={dimensions.width} height={dimensions.height} top={dimensions.top} left={dimensions.left} value={document_meta_field.value} onChange={(e) => {this.handleFormEdit(e, form)}} view={this.props.view} previewOnClickHandler={this.props.previewOnClickHandler} />
                    </div>

                documentFields.push(newForm)
            }
            else if(document_meta_field.field_type === 'Signature') {
                let newForm = <SignatureForm is_disabled={document_meta_field.is_disabled} key={form} id={form} width={dimensions.width} height={dimensions.height} top={dimensions.top} left={dimensions.left} view={this.props.view} previewOnClickHandler={this.props.previewOnClickHandler} assigned_to={document_meta_field.assigned_to} signature_base64={document_meta_field.value} signHandler={this.signHandler}/>

                documentFields.push(newForm)
            }

        }

        return documentFields

    }

    handleFormEdit = async (e, id) => {

        let documentObject = Object.assign({}, this.state.documentObject)
        let document_meta_field: document_meta_field = documentObject.document_meta[id]

        if(e.target.className === 'CheckboxInput'){
            document_meta_field.value = document_meta_field.value === 'Off' ? 'On' : 'Off' 
        } else {
            document_meta_field.value = e.target.value
        }

        this.setState({
            documentObject: documentObject
        }, () => {
            this.autoSave()
        })
    }

    signHandler = (e) => {

        let target = e.target
        while(!!!target.id) {
            target = target.parentNode
        }
        let id = target.id

        let documentObject = this.state.documentObject
        let document_meta_field = documentObject.document_meta[id]

        document_meta_field.value = this.props.signature_base64

        this.setState({
            documentObject: documentObject
        }, () => {
            this.autoSave()
        })

    }

    autoSave = () => {

        if(!!this.state.saveFileTimeout) {
            clearTimeout(this.state.saveFileTimeout)
        }
        let saveFileTimeout = setTimeout(() => {
            this.startSave()
            this.saveFile(false)
        }, 2000)

        this.setState({
            saveFileTimeout: saveFileTimeout
        })

    }

    saveFile = async (is_completed: boolean) => {
        
        let payload_document_meta = []
        let documentObject = Object.assign({}, this.state.documentObject)
        documentObject.document_meta.forEach(document_meta_field => {
            payload_document_meta.push(Object.assign({}, document_meta_field))
        })
        payload_document_meta = payload_document_meta.map(document_meta_field => {
            if(!!document_meta_field.field_position) {
                delete document_meta_field.field_position
            }
            return document_meta_field
        })

        let newFile = {
            document_meta: payload_document_meta,
            name: this.props.document_name,
            submitted_file_id: this.props.document_id,
            is_completed: is_completed
        }

        let request = getSaveFilePromise(newFile)
        let newFilePromise = await request

        this.setState({
            newFilePromise: await newFilePromise
        })

        let response = await newFilePromise.promise
        let saveResult: saveResultInterface = await response.json()

        if(saveResult.status_code === 401) {
            alert(saveResult.reason)
            this.unsuccessfulSave()
            return
        } else {
            this.successfulSave()
        }

        return saveResult
    }

    quickSave = async (is_completed: boolean) => {

        let payload_document_meta = []
        this.state.documentObject.document_meta.forEach(document_meta_field => {
            payload_document_meta.push(Object.assign({}, document_meta_field))
        })
        payload_document_meta = payload_document_meta.map(document_meta_field => {
            if(!!document_meta_field.field_position) {
                delete document_meta_field.field_position
            }
            return document_meta_field
        })

        let newFile = {
            document_meta: payload_document_meta,
            name: this.props.document_name,
            submitted_file_id: this.props.document_id,
            is_completed: is_completed
        }

        let request = getSaveFilePromise(newFile)
        let newFilePromise = await request

        let response = await newFilePromise.promise
        let saveResult: saveResultInterface = await response.json()

        if(saveResult.status_code === 401) {
            alert(saveResult.reason)
            this.unsuccessfulSave()
            return
        } else {
            this.successfulSave()
        }
        

        if(is_completed) {
            this.props.getPendingDocuments()
            this.props.handleDocumentListPress()
        }

        return saveResult

    }


    //Form Validation
    validateCanSubmit = (): boolean => {
        
        if(!!!this.state.documentObject) {
            return
        }

        let document_meta: Array<document_meta_field> = this.state.documentObject.document_meta

        let resultArray: Array<boolean> = document_meta.map((document_meta_field: document_meta_field) => {

            if(document_meta_field.field_type === 'Signature') {
                if(!!!document_meta_field.value) {
                    return false
                }
            }

            return true

        })

        if(resultArray.indexOf(false) >= 0) {
            return false
        }

        return true

    }

    //Save functionality

    startSave = () => {

        let savingBar = (
            <div id='saving-bar'> Saving... </div>
        )

        this.setState({
            savingBar: savingBar
        })

    }

    successfulSave = () => {

        let savingBar = (
            <div id='saving-bar' className='saving-bar-success'> Save Successful </div>
        )

        this.setState({
            savingBar: savingBar
        })

        setTimeout(() => {
            this.setState({
                savingBar: ''
            })
        },
        3000)
    }

    unsuccessfulSave = () => {

        let savingBar = (
            <div id='saving-bar' className='saving-bar-failure'> Save Unsuccessful </div>
        )

        this.setState({
            savingBar: savingBar
        })

        setTimeout(() => {
            this.setState({
                savingBar: ''
            })
        },
        3000)
    }


    //Toolbar functionality

    handleApprove = () => {

       

    }

    handleSubmit = () => {

        if(!this.validateCanSubmit()) {
            return alert('Document is not complete')
        }

        if(this.validateCanSubmit()) {
            return this.quickSave(true)
        }

    }

    //React Lifecycle Methods
    async componentDidMount() {
        if(!!!this.props.document_meta && this.props.view === 'PendingDocuments') {
            getDocumentPromise(this.props.document_id)
            await this.getDocumentObject()
            this.setState({
                loading: ''
            })
        } else {
            this.setState({
                document_meta: this.props.document_meta
            }, () => {
                this.getDocumentObject()
            })
        }
    }

    componentWillUnmount() { 
        if(!!this.state.documentPromise) {
            this.state.documentPromise.cancel()
        }
        if(!!this.state.newFilePromise) {
            this.state.newFilePromise.cancel()
        }
        if(!!this.state.saveFileTimeout) {
            clearTimeout(this.state.saveFileTimeout)
            this.quickSave(false)
        }
    }

    render() {
        let toolbar = <div></div>

        if(this.props.view === 'PendingDocuments') {
            toolbar = <ToolBar handleApprove={this.handleApprove} handleSubmit={this.handleSubmit} canSubmit={this.validateCanSubmit()}/>
        }

        return(
            <div className='DocumentView'>
                {this.state.loading}
                {this.state.savingBar}
                {this.generatePages()}
                {toolbar}
            </div>
        )
    }

}