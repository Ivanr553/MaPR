import * as React from 'react'

import './styling/DocumentViewStyle.sass'

import SignatureForm from './UserInputComponents/SignatureForm/SignatureForm'
import CheckboxInput from './UserInputComponents/CheckboxInput/CheckboxInput'
import TextInput from './UserInputComponents/TextInput/TextInput'

import {documentResponse, documentPage, saveResultInterface, documentDimensions, document_meta_field, document} from '../../AppValidation'
import {getDocumentPromise, getTemplateDocumentPromise, getSaveFilePromise} from '../../services/services'
import ToolBar from './ToolBar/ToolBar';
import DocumentPage from './DocumentPage/DocumentPage';
import NotificationCard from '../NotificationCard/NotificationCard';

interface Props {
    document_id: string,
    document_name?: string,
    view: 'PendingDocuments' | 'DocumentPreview',
    previewOnClickHandler?: (e, page: number, field_name: string) => void,
    pages?: Array<documentPage>,
    signature_base64?: string,
    dod_id?: number,
    handleDocumentListPress?: () => void,
    getPendingDocuments?: () => void
}

export default class DocumentView extends React.Component<Props, any> {

    constructor(props) {
        super(props)
        this.state ={
            documentObject: {} as documentResponse,
            submitted_file_id: '',
            noDocument: false,
            savingIconSource: '/images/clock.png',
            savingIconId: '',
            loading: (
                <div className='loading-image'>Loading...</div>
            ),
            savingBar: '',
            notificationCard: '',
            notificationCardMessage: ''
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

    getDocumentSize = (documentObject: documentPage, fieldLeft: number, fieldTop: number, fieldHeight: number, fieldWidth: number): documentDimensions => {

        let pdfWidth = documentObject.page.right
        let pdfHeight = documentObject.page.height
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
        let documentObjectArray = this.state.documentObject

        if(!!!documentObjectArray.pages) {
            return
        }

        documentObjectArray.pages.forEach((documentPage, index) => {

            let newPage = <DocumentPage key={index} documentPage={documentPage} pdfSource={'/dist/documents/NAVMC10694.pdf'} page={index} handleFormEdit={this.handleFormEdit} view={this.props.view} signature_base64={this.props.signature_base64} autoSave={this.autoSave} signHandler={this.signHandler} previewOnClickHandler={this.props.previewOnClickHandler}/>

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

            if(documentObject.status_code > 200) {
                throw documentObject.reason
            } else {
                this.setState({
                    documentObject: documentObject,
                    document_id: this.props.document_id
                })
            }

        } catch(message) {
            this.handleNotification(message)
        }

    }

    handleFormEdit = async (e, page, id) => {

        let documentObject: documentResponse = Object.assign({}, this.state.documentObject)
        let document_meta_field: document_meta_field = documentObject.pages[page].document_meta[id]

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

    signHandler = (e, page) => {

        let target = e.target
        while(!!!target.id) {
            target = target.parentNode
        }
        let id = target.id

        let documentObject = this.state.documentObject
        let document_meta_field = documentObject.pages[page].document_meta[id]

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
            this.saveFile(false)
        }, 2000)

        this.setState({
            saveFileTimeout: saveFileTimeout
        })

    }

    saveFile = async (is_completed: boolean) => {
        
        let payload_document_meta = []
        let documentObject = Object.assign({}, this.state.documentObject)
        documentObject.pages.forEach(document_meta => {
            payload_document_meta.push(Object.assign({}, document_meta))
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

        try {
            let response = await newFilePromise.promise
            let saveResult: saveResultInterface = await response.json()
    
            if(saveResult.status_code > 200) {
                throw saveResult.reason
            } else {
                this.handleNotification('Save Successful')
                return saveResult
            }
        } catch(message) {
            return this.handleNotification(message)
        }

    }

    quickSave = async (is_completed: boolean) => {

        let payload_documentObject: Array<any> = []
        this.state.documentObject.pages.forEach(document_meta => {
            payload_documentObject.push(Object.assign({}, document_meta))
        })
        payload_documentObject = payload_documentObject.map(document_meta_field => {
            if(!!document_meta_field.field_position) {
                delete document_meta_field.field_position
            }
            return document_meta_field
        })

        let newFile = {
            document_meta: payload_documentObject,
            name: this.props.document_name,
            submitted_file_id: this.props.document_id,
            is_completed: is_completed
        }

        let request = getSaveFilePromise(newFile)
        let newFilePromise = await request

        try {
            let response = await newFilePromise.promise
            let saveResult: saveResultInterface = await response.json()
    
            if(saveResult.status_code > 200) {
                throw saveResult.reason
            } else {
                this.handleNotification('Save Successful')
                if(is_completed) {
                    this.props.getPendingDocuments()
                    this.props.handleDocumentListPress()
                }
                return saveResult
            }
        } catch(message) {
            return this.handleNotification(message)
        }

    }


    //Form Validation
    validateCanSubmit = () => {
        
        // if(!!!this.state.documentObject) {
        //     return
        // }

        // let document_meta: Array<document_meta_field> = this.state.documentObject.document_meta

        // let resultArray: Array<boolean> = document_meta.map((document_meta_field: document_meta_field) => {

        //     if(document_meta_field.field_type === 'Signature') {
        //         if(!!!document_meta_field.value) {
        //             return false
        //         }
        //     }

        //     return true

        // })

        // if(resultArray.indexOf(false) >= 0) {
        //     return false
        // }

        return true

    }

    handleNotification(message: string) {

        if(this.state.notificationCard !== '') {

            this.setState({
                notificationCard: <NotificationCard key={Math.random()} message={this.state.notificationCardMessage} exit={true} clearNotification={this.clearNotification}/>
            }, () => {

                setTimeout(() => {
                    this.setState({
                        notificationCard: <NotificationCard key={Math.random()} message={message} exit={false} clearNotification={this.clearNotification}/>,
                        notificationCardMessage: message
                    })
                },
                500)

            })
        }

        else {
            this.setState({
                notificationCard: <NotificationCard key={Math.random()} message={message} exit={false} clearNotification={this.clearNotification}/>,
                notificationCardMessage: message
            })
        }

    }

    clearNotification = () => {
        this.setState({
            notificationCard: ''
        })
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
        if(!!!this.props.pages && this.props.view === 'PendingDocuments') {
            getDocumentPromise(this.props.document_id)
            await this.getDocumentObject()
            this.setState({
                loading: ''
            })
            // this.handleNotification('Hello')
        } else {
            this.setState({
                pages: this.props.pages
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
                {this.state.notificationCard}
                {this.state.loading}
                {this.state.savingBar}
                {this.generatePages()}
                {toolbar}
            </div>
        )
    }

}