import * as React from 'react'

import './styling/style.sass'


export default class UploadDocument extends React.Component<any, any> {

    //@ts-ignore
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    uploadDroppedFile = async (e) => {
        e.preventDefault()
        e.stopPropagation()
        
        try {

            let FormStuff = new FormData(); 

            for (var i = 0; i < e.dataTransfer.files.length; i++) {
                FormStuff.append("files", e.dataTransfer.files[i]);
                console.log(e.dataTransfer.files[i]);
            }

            let url = '/DocumentUpload/Upload'
            
            let request = await fetch(url, {
                method: 'POST',
                credentials: "same-origin",
                body: FormStuff
            })
            let response = await request.json()

            console.log(response)

            if(response.status_code === 200) {
                alert('Upload Successful!')
            } else {
                alert('Error With Upload')
            }

        } catch(e) {
            throw new Error(e)
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
           </div>
        )
    }

}