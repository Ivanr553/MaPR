import * as React from 'react'
import * as $ from 'jquery'
import PDF from 'react-pdf-js'

const s = require('./styling/style.sass')

export default class UploadDocument extends React.Component<any, any> {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return(
            <div id='UploadDocument' onDragOver={(e) => {
                e.preventDefault()
            }}>

                <div id='dropzone' onDrop={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    console.log(e.dataTransfer.files)
                }}>

                    Drop Files Here

                </div>

                <form action="" method='post'
                    onSubmit={(e) => {
                        e.preventDefault()
                        console.log(document.getElementById('uploadedFile').value)
                        console.log(e)
                    }}>
                    <input id='uploadedFile' type="file" name='file[]' multiple={true}/>
                    <input type="submit" value='Upload'/>
                </form>
            </div>
        )
    }

}