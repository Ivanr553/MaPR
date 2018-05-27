import * as React from 'react'
import PDF from 'react-pdf-js'
import * as $ from 'jquery'


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

        } catch (err) {
            console.log('Error:', err)
        }
    }

    async populatePage() {

        let documentList = await $.get('/DocumentSave/GetAllDocuments')

        let document_id = documentList[0].idDocument

        let pdf = await $.get(`/DocumentSave/GetNewAutoPopulatedFile?document_id=${document_id}`)
        
        let documentObject = await $.get(`/DocumentSave/GetDocumentMeta?document_id=${document_id}`)


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

            if(name.indexOf('check') === 0) {

                currentForm.value = false

                let newForm = 
                    <div className='form-wrapper' style={{ position: 'absolute', left: `${left}vw`, top: `${top}vw`, width: `${width}vw`, height: `${height}vw`}}>
                        <input id={form} className='document-checkbox' style={{}} type="checkbox" onChange={(e) => {this.handleFormEdit(e, form)}}/>
                    </div>

                documentFields.push(newForm)
            } else {
                let newForm = 
                    <div className='form-wrapper'>
                        <input id={form} style={{ position: 'absolute', left: `${left}vw`, top: `${top}vw`, width: `${width}vw`, height: `${height}vw`}} className='document-input' defaultValue={currentForm.value} type="text" onChange={(e) => {this.handleFormEdit(e, form)}}/>
                    </div>
                documentFields.push(newForm)
            }
        }

        this.setState({
            documentFields: documentFields,
            documentObject: documentObject,
            document_id: document_id
        }, () => {
            console.log(this.state.documentFields)
            console.log(this.state.documentObject)
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
        }, async function() {

            let saveFile = {
                document_meta: this.state.documentObject.document_meta,
                name: this.state.documentName,
                document_id: this.state.document_id
                // submitted_file_id: ''
            }

            console.log(saveFile)

            let saveResult = await $.ajax({
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                url: `/DocumentSave/SaveFile`,
                dataType: 'json',
                data: saveFile
            })

            console.log(saveResult)
        })
    }

    componentDidMount() {
        this.getDocument()
        this.populatePage()
    }

    render() {
        let file = '../../dist/documents/NAVMC10694.pdf'

        return(
            <div className='DocumentView'>
                {/* <embed width="100%" height="100%" data-name="plugin" id="plugin" src={file}/> */}
                <PDF className='pdf-image' file={file} >
                </PDF>
                <div id='document-form-div'>
                    {this.state.documentFields}
                </div>
            </div>
        )
    }

}