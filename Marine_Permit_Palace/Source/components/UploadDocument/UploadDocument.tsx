import * as React from 'React'
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

    uploadDroppedFile = (e) => {
        e.preventDefault()
        e.stopPropagation()
        console.log(e.dataTransfer.files)
    }

    handleFormSubmit = (e) => {
        e.preventDefault()
        //@ts-ignore
        let files = this.files.current.files
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