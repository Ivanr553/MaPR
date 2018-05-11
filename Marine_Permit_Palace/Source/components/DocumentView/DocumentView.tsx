import * as React from 'react'
import * as PDF from 'react-pdf-js'
import * as $ from 'jquery'
import * as pdfjs from 'pdfjs'


const s = require('./styling/style.sass')

export default class DocumentView extends React.Component<any, any> {

    constructor(props) {
        super(props)
        this.state ={
            numPages: 1,
            pageNumber: 1,
            document: [],
            url: ''
        }

        // this.onDocumentLoad = this.onDocumentLoad.bind(this)
    }

    async getDocument() {

        try {

            let documentList = await $.get('/DocumentSave/GetAllDocuments')

            let pdfID = documentList[0].idDocument

            let pdfURL = `/DocumentSave/GetNewAutoPopulatedFile?document_id=${pdfID}`

            let pdf = await $.get(`/DocumentSave/GetNewAutoPopulatedFile?document_id=${pdfID}`)

            let blob = new Blob([pdf])
            let blobURl = window.URL.createObjectURL(blob)

            let that = this

            // var request = new XMLHttpRequest();
            // request.open("GET", pdfURL, true); 
            // request.responseType = "blob";
            // request.onload = function (e) {
            //     if (this.status === 200) {
            //         let file = window.URL.createObjectURL(this.response)
            //         that.setState({
            //             url: file
            //         }, () => {
            //         })
            //     };
            // };
            // request.send();

        } catch (err) {
            console.log('Error:', err)
        }
    }

    async populatePage() {

        let documentList = await $.get('/DocumentSave/GetAllDocuments')

        let documentID = documentList[0].idDocument
        
        let object = await $.get(`/DocumentSave/GetDocumentMeta?document_id=${documentID}`)

        let documentFields = []

        for(let form in object) {
            let currentForm = object[form]
            console.log(currentForm.left)

                let newForm = 
                    <div className='document-form' style={{}}>
                        <div className='input-form-name'>{currentForm.field_name}</div>
                        <input className='document-input' defaultValue={currentForm.value} type="text"/>
                    </div>
                documentFields.push(newForm)
        }

        this.setState({
            documentFields: documentFields
        })

    }

    componentDidMount() {
        this.getDocument()
        this.populatePage()
        // this.run()
    }

    render() {
        let file = this.state.url

        return(
            <div className='DocumentView'>
                {/* <embed width="100%" height="100%" data-name="plugin" id="plugin" src={file} type="application/pdf"  title="" data-internalinstanceid='8'/> */}
                <div id='document-form-div'>
                    {this.state.documentFields}
                </div>
            </div>
        )
    }

}