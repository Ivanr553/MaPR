import * as React from 'react'
import PDF from 'react-pdf-js'
import * as $ from 'jquery'

const s = require('./styling/style.sass')

import SignatureForm from './UserInputComponents/SignatureForm/SignatureForm'
import CheckboxInput from './UserInputComponents/CheckboxInput/CheckboxInput'
import TextInput from './UserInputComponents/TextInput/TextInput'

interface Props {
    document_id: string,
    view: 'PendingDocuments' | 'DocumentPreview',
    previewOnClickHandler?: any
}

export default class DocumentView extends React.Component<Props, any> {

    constructor(props) {
        super(props)
        this.state ={
            numPages: 1,
            pageNumber: 1,
            document: [],
            url: '',
            documentObject: {},
            documentName: 'document',
            submitted_file_id: '',
            noDocument: false,
            mounted: null
        }
       
    }
    
    //Code excerpt to allow for promises to be cancelled
    makeCancelable = async (promise: Promise<any>) => {
        let hasCanceled_ = false;
      
        const wrappedPromise = new Promise((resolve, reject) => {
          promise.then((val) =>
            hasCanceled_ ? reject({isCanceled: true}) : resolve(val)
          );
          promise.catch((error) =>
            hasCanceled_ ? reject({isCanceled: true}) : reject(error)
          );
        });
      
        return {
          promise: wrappedPromise,
          cancel() {
            hasCanceled_ = true;
          },
        };
      };

    getDocument = async (document_id: string) => {

      
        let promise = $.get(`/DocumentSave/GetDocumentMeta?document_id=${this.props.document_id}`)
        
        let getDocumentResponse = await this.makeCancelable(promise)

        this.setState({
            getDocumentResponse: getDocumentResponse
        })

        return getDocumentResponse

    }

    saveFileResponse = async (saveFile) => {

        try {

            let saveResult = $.ajax({
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json; charset=UTF-8'
                },
                url: `/DocumentSave/SaveFile`,
                dataType: 'json',
                data: JSON.stringify(saveFile)
            })

            let saveFileResponse = await this.makeCancelable(saveResult)

            this.setState({
                saveFileResponse: saveFileResponse
            })

            return saveFileResponse

        } catch(e) {
            console.log('Error saving:', e)
        }
    }

    populatePage = async () =>  {

        if(this.props.document_id === '') {
            this.setState({
                noDocument: true
            })
            return
        } else {
            this.setState({
                noDocument: false
            })
        }
      
        let promise = await this.getDocument(this.props.document_id)

        interface documentObjectInterface {
            document_size,
            document_meta,
            result,
            status_code
        }
        let documentObject: documentObjectInterface = await promise.promise as documentObjectInterface

        let documentFields = []

        let pdfWidth = documentObject.document_size.right
        let pdfHeight = documentObject.document_size.height
        let pdfRatio = pdfHeight/pdfWidth
        let webWidth = 612 //in px
        let webHeigth = 792 // in px

        for(let form in documentObject.document_meta) {
            let currentForm = documentObject.document_meta[form]
            let name = currentForm.field_name
            while(name.indexOf('_') > -1) {
                name = name.replace('_', ' ')
            }

            let left = ((currentForm.field_position.position.left) * webWidth) / pdfWidth
            let top = ((pdfHeight - currentForm.field_position.position.top) * webHeigth) / pdfHeight
            let height = (currentForm.field_position.position.height * webHeigth) / pdfHeight
            let width = (currentForm.field_position.position.width * webWidth) / pdfWidth

            if(currentForm.field_type === 'Checkbox') {

                currentForm.value = false

                let newForm = <CheckboxInput key={form} id={form} width={width} height={height} top={top} left={left} checked={currentForm.value} onChange={(e) => {this.handleFormEdit(e, form)}} view={this.props.view} previewOnClickHandler={this.props.previewOnClickHandler} />

                documentFields.push(newForm)
            }
            else if(currentForm.field_type === 'Text') {
                let newForm = 
                    <div key={form} className='form-wrapper'>
                        <TextInput key={form} id={form} position={'absolute'} border={'none'} width={width} height={height} top={top} left={left} value={currentForm.value} onChange={(e) => {this.handleFormEdit(e, form)}} view={this.props.view} previewOnClickHandler={this.props.previewOnClickHandler} />
                    </div>

                documentFields.push(newForm)
            }
            else if(currentForm.field_type === 'Signature') {
                let newForm = <SignatureForm key={form} id={form} width={width} height={height} top={top} left={left} view={this.props.view} previewOnClickHandler={this.props.previewOnClickHandler}/>

                documentFields.push(newForm)
            }

            delete currentForm.field_position

        }

        this.setState({
            documentFields: documentFields,
            documentObject: documentObject,
            document_id: this.props.document_id
        }, () => {
            this.saveFile()
        })

    }

    async handleFormEdit(e, id) {

        let documentObject = Object.assign({}, this.state.documentObject)
        let currentForm = documentObject.document_meta[id]

        if(e.target.className === 'document-checkbox'){
            if(currentForm.value != true) {
                currentForm.value = true
            } else {
                currentForm.value = false
            }
        } else {
            currentForm.value = e.target.value
        }


        this.setState({
            documentObject: documentObject
        }, () => {
            this.saveFile()
        })
    }

    async saveFile() {
        
        let saveFile = {
            document_meta: this.state.documentObject.document_meta,
            name: this.state.documentName,
            document_id: this.state.document_id,
            submitted_file_id: this.state.submitted_file_id
        }

        let promise = await this.saveFileResponse(saveFile)

        interface saveResultInterface {
            reason: any
        }
        let saveResult: saveResultInterface = await promise.promise as saveResultInterface

        if(!this.state.submitted_file_id || this.state.submitted_file_id === null) {
            this.setState({
                submitted_file_id: saveResult.reason
            }, () => {
                console.log(this.state.submitted_file_id)
            })
        }

    }

    componentWillMount() {
        this.populatePage()
    }

    componentWillUnmount() { 
        if(this.state.getDocumentResponse) {
            this.state.getDocumentResponse.cancel()
        }
        if(this.state.saveFileResponse) {
            this.state.saveFileResponse.cancel()
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
                    {this.state.documentFields}
                </div>
            </div>
        )
    }

}