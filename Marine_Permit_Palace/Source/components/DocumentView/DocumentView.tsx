import * as React from 'react'
import PDF from 'react-pdf-js'
import * as $ from 'jquery'
import { setTimeout } from 'timers';


const s = require('./styling/style.sass')

export default class DocumentView extends React.Component<any, any> {

    constructor(props) {
        super(props)
        this.state ={
            numPages: 1,
            pageNumber: 1,
            document: [],
            url: '',
            documentObject: {},
            documentName: 'document'
        }

    }

    async getDocument() {

        try {

            let documentList = await $.get('/DocumentSave/GetAllDocuments')

            let pdfID = documentList[0].idDocument

            let pdfURL = `/DocumentSave/GetNewAutoPopulatedFile?document_id=${pdfID}`

            this.setState({
                url: pdfURL
            })

        } catch(err) {
            console.log('Error:', err)
        }
    }

    async populatePage() {

        let documentList = await $.get('/DocumentSave/GetAllDocuments')

        let document_id = documentList[0].idDocument

        let pdf = await $.get(`/DocumentSave/GetNewAutoPopulatedFile?document_id=${document_id}`)
        
        let documentObject = await $.get(`/DocumentSave/GetDocumentMeta?document_id=${document_id}`)
        console.log(documentObject)

        let documentFields = []

        //Document Variables
        //Width: 0.9*85vw
        //Height: auto

        let pdfWidth = documentObject.document_size.right
        let pdfHeight = documentObject.document_size.height
        let pdfRatio = pdfHeight/pdfWidth
        let webWidth = 0.9*85 //in vw
        let webHeigth = webWidth * pdfRatio // in vw

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

                let newForm = 
                    <div key={form} className='form-wrapper' style={{ position: 'absolute', left: `${left}vw`, top: `${top}vw`, width: `${width}vw`, height: `${height}vw`}}>
                        <input id={form} className='document-checkbox' style={{}} type="checkbox" onChange={(e) => {this.handleFormEdit(e, form)}}/>
                    </div>

                documentFields.push(newForm)
            }
            else if(currentForm.field_type === 'Text') {
                let newForm = 
                    <div key={form} className='form-wrapper'>
                        <input id={form} style={{ position: 'absolute', left: `${left}vw`, top: `${top}vw`, width: `${width}vw`, height: `${height}vw`}} className='document-input' defaultValue={currentForm.value} type="text" onChange={(e) => {this.handleFormEdit(e, form)}}/>
                    </div>
                documentFields.push(newForm)
            }

            delete currentForm.field_position

        }

        this.setState({
            documentFields: documentFields,
            documentObject: documentObject,
            document_id: document_id
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
                document.getElementById('save-button').style.backgroundColor = 'green'
                setTimeout(() => {
                    document.getElementById('save-button').style.backgroundColor = 'lightblue'
                }, 1500)
            }

        } catch(e) {
            console.log('Error saving:', e)
            document.getElementById('save-button').style.backgroundColor = 'red'
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
        this.getDocument()
        this.populatePage()
    }

    render() {
        let file = '../../dist/documents/NAVMC10694.pdf'

        return(
            <div className='DocumentView'>
                <div id='save-button' onClick={() => {this.saveFile(this.state.submitted_file_id)}}>Save File</div>
                <PDF className='pdf-image' file={file} >
                </PDF>
                <div id='document-form-div'>
                    {this.state.documentFields}
                </div>
            </div>
        )
    }

}