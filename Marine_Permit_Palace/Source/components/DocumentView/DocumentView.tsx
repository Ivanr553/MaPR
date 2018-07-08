import * as React from 'react'
import PDF from 'react-pdf-js'
import * as $ from 'jquery'
import { setTimeout } from 'timers';

const s = require('./styling/style.sass')

import SignatureForm from '../SignatureForm/SignatureForm'
import CheckboxInput from '../CheckboxInput/CheckboxInput'
import TextInput from '../TextInput/TextInput'

export default class DocumentView extends React.Component<any, any> {

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
            noDocument: false
        }

    }

    async populatePage() {

        console.log(this.props.document_id)

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
        
        let documentObject = await $.get(`/DocumentSave/GetDocumentMeta?document_id=${this.props.document_id}`)

        console.log(documentObject)

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

                let newForm = <CheckboxInput  key={form} width={width} height={height} top={top} left={left} checked={currentForm.value} onChange={(e) => {this.handleFormEdit(e, form)}} />

                documentFields.push(newForm)
            }
            else if(currentForm.field_type === 'Text') {
                let newForm = 
                    <div key={form} className='form-wrapper'>
                        <TextInput key={form} position={'absolute'} border={'none'} width={width} height={height} top={top} left={left} value={currentForm.value} onChange={(e) => {this.handleFormEdit(e, form)}} />
                    </div>

                documentFields.push(newForm)
            }
            else if(currentForm.field_type === 'Signature') {
                let newForm = <SignatureForm key={form} width={width} height={height} top={top} left={left} />

                documentFields.push(newForm)
            }

            delete currentForm.field_position

        }

        this.setState({
            documentFields: documentFields,
            documentObject: documentObject,
            document_id: this.props.document_id
        }, () => {
            this.saveFile(null)
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
            this.saveFile(this.state.submitted_file_id)
        })
    }

    async saveFile(submitted_file_id) {

        // document.getElementById('save-button').style.backgroundColor = 'lightblue'
        
        let saveFile = {
            document_meta: this.state.documentObject.document_meta,
            name: this.state.documentName,
            document_id: this.state.document_id,
            submitted_file_id: submitted_file_id
        }

        console.log(saveFile)

        let saveResult

        try {

            saveResult = await $.ajax({
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json; charset=UTF-8'
                },
                url: `/DocumentSave/SaveFile`,
                dataType: 'json',
                data: JSON.stringify(saveFile)
            })

            if(saveResult && saveResult.status_code < 201) {
                // document.getElementById('save-button').style.backgroundColor = 'rgb(131, 198, 125)'
            }

        } catch(e) {
            console.log('Error saving:', e)
            // document.getElementById('save-button').style.backgroundColor = 'rgb(198, 125, 125)'
        }

        if(!submitted_file_id || submitted_file_id === null) {
            this.setState({
                submitted_file_id: saveResult.reason
            }, () => {
                console.log(this.state.submitted_file_id)
            })
        }

    }

    componentDidMount() {
        this.populatePage()
    }

    render() {
        let document_id = '../../dist/documents/NAVMC10694.pdf'
        let noDocumentWarning

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