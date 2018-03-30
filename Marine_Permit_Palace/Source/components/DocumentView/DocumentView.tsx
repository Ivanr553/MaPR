import * as React from 'react'
import PDF from 'react-pdf-js'
import $ from 'jquery'

const s = require('./styling/style.sass')

export default class DocumentView extends React.Component<any, any> {

    constructor(props) {
        super(props)
        this.state ={
            numPages: 1,
            pageNumber: 1,
            document: [],
            file: ''
        }

        // this.onDocumentLoad = this.onDocumentLoad.bind(this)
    }

    async getDocument() {

        try {

            let session = await $.post('/checkSession')
            let username = session.username

            let user = await $.post('/findUser', {username: username})
            let pdfId = user.pdfs[0]
            console.log(pdfId)

            const pdf = await $.post('/viewPDF', {id: pdfId})
            let blob = new Blob(pdf, {type: 'application/pdf'})
            let url = URL.createObjectURL(blob);
            this.setState({
                file: url
            })
        } catch (err) {
            console.log('Error:', err)
        }
    }

    componentDidMount() {
        // this.getDocument()
        // this.run()
    }

    render() {
        let file = '/dist/documents/' + this.props.file

        return(
            <div className='DocumentView'>
                <embed width="100%" height="100%" data-name="plugin" id="plugin" src={file} type="application/pdf"  title="" data-internalinstanceid='8'/>
            </div>
        )
    }

}