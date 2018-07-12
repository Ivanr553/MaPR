import * as React from 'react'
import * as $ from 'jquery'
import PDF from 'react-pdf-js'

const s = require('./styling/style.sass')


export default class UploadDocument extends React.Component<any, any> {

    //@ts-ignore
    constructor(props) {
        super(props)
        this.state = {

        }
        //@ts-ignore
        this.files = React.createRef()
    }

    uploadDroppedFile = async (e) => {
        e.preventDefault()
        e.stopPropagation()

        try {

            let file = e.dataTransfer.files[0]
            let url = '/DocumentUpload/Upload'
    
            let response = await $.ajax({
                method: 'POST',
                url: url,
                contentType: 'application-pdf',
                body: file
            })
    
            console.log(response)

        } catch(e) {
            Error(e)
        }

    }

    handleFormSubmit = async (e) => {
        e.preventDefault()

        try {

            // @ts-ignore
            let file = this.files.current.files[0]
            let url = '/DocumentUpload/Upload'
    
            let response = await $.ajax({
                method: 'POST',
                url: url,
                contentType: 'application-pdf',
                body: file
            })
    
            console.log(response)

        } catch(e) {
            Error(e)
        }
    }

    render() {
        return(
            <div id='UploadDocument' onDragOver={(e) => {
                e.preventDefault()
            }}>
                <div className='documents-header'>Upload Document</div>

                <div id='dropzone' onDrop={(e) => {
                    this.uploadDroppedFile(e)
                }}>
                    Drop Files Here
                </div>

                <form id='file-submition-form' action="" method='post'
                    onSubmit={(e) => this.handleFormSubmit(e)}>
                    <input id='uploadedFile' type="file" 
                    //@ts-ignore
                    name='file[]' multiple={true} ref={this.files}/>
                    <input type="submit" value='Upload'/>
                </form>
            </div>
        )
    }

}