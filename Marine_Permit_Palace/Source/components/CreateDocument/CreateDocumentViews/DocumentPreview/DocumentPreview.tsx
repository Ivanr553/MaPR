import * as React from 'react';

import DocumentView from '../../../DocumentView/DocumentView'
import DocumentPreviewSidebar from './DocumentPreviewSidebar';

import {user, currentSelectedField} from '../../CreateDocumentValidation'
import { document_meta_field } from '../../../../AppValidation';
import Button from '../../../Button/Button';


interface Props {
    document_id: string,
    userList: Array<user>,
    getDocumentName(documentName: String): void,
    getDocumentPreviewComplete(documentPreviewComplete: boolean): void,
    documentPreviewBoolean: boolean,
    handleAddedUserPress: (e: React.MouseEvent) => void,
    deleteUser: (e: any) => void,
    document_meta: Array<document_meta_field>,
    handleSelectedFieldId: (id: number) => void,
    currentSelectedFieldId: number,
    currentSelectedField: currentSelectedField,
    removeAssignedUser: (user: user, removeOption: null | number) => void,
    assigned_user: user
}

 
class DocumentPreview extends React.Component<Props, any> {

    constructor(props) {
        super(props)
        this.state = {
            documentName: '',
            currentSelectedField: '',
            userList: [],
            assigned_to: ''
        }

    }

    handleShow = () => {

        if(!this.props.documentPreviewBoolean) {
            let style = {
                display: 'none'
            } 

            return style

        } else {
            let style = {
                display: 'block'
            } 

           return style
        }
    }

    previewOnClickHandler = (e): void => {

        let id = e.target.id

        //Clearing previously selected field
        if(!!this.props.currentSelectedField) {
            document.getElementById(this.props.document_meta.indexOf(this.props.currentSelectedField as any).toString()).classList.remove('selectedField')
        }

        document.getElementById(id).classList.add('selectedField')

        // let currentSelectedFieldValue = (this.props.document_meta as Array<document_meta_field>)[id].assigned_to

        this.props.handleSelectedFieldId(parseInt(id))
        this.showSidebar()

    }

    handleDocumentNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        let documentName = this.state.documentName

        documentName = e.target.value

        this.setState({
            documentName: documentName
        }, () => {
            this.props.getDocumentName(this.state.documentName)
        })
    }

    showSidebar = () => {
       this.setState({
           showSidebar: true
       })
    }

    getHideSidebar = (showSidebar): void => {
        this.setState({
            showSidebar: showSidebar
        })
    }

    verifyDocumentCompletion = () => {

        let document_meta = this.props.document_meta
        console.log(this.props.userList)

        let signatureFields = document_meta.filter(field => field.field_type === 'Signature')

        let result = signatureFields.map(field => {
            if(field.assigned_to === null) {
                return false
            }
        })

        if(result.indexOf(false) >=0) {
            console.log('fields unfinished')
            return false
        }

        if(this.state.documentName === '') {
            console.log('document name invalid')
            return false
        }

        if(this.props.assigned_user === null) {
            console.log('no assigned user')
            return false
        }

        return true
        
    }

    // NOT WORKING -- Waiting on Mitchell //

    submitDocument = async () => {

        if(!this.verifyDocumentCompletion()) {
            console.log('document unfinished')
            return
        }

        let userList = this.props.userList.slice()

        let props_document_meta = []
        this.props.document_meta.forEach(document_meta_field => {
            props_document_meta.push(Object.assign({}, document_meta_field))
        })

        let assignees = []
        userList.forEach(user => {
            assignees.push(Object.assign({}, user))
        })

        try {

            assignees.map( user => {
                delete user.name
                delete user.assigned_to
                return user
            })

            let document_meta = props_document_meta.map(document_meta_field => {
                document_meta_field.field_position = null
                return document_meta_field
            })

            let assignedDocument = {
                document_meta: document_meta,
                submitted_document_id: this.props.document_id,
                assignees: assignees
            }

            let body = JSON.stringify(assignedDocument)

            let response = await fetch('/DocumentManager/AssignDocument', {
                method: "POST",
                mode: "cors",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify(assignedDocument)
            })

            let result = await response.json()

            console.log(result)

        } catch(e) {
            throw Error(e)
         }

    }

    renderDocumentSaveButton = () => {

        if(!this.verifyDocumentCompletion()) {
            return (
                <Button innerText={'Submit'} color='rgb(226, 120, 120)' onClickHandler={this.submitDocument} />
            )
        }

        if(this.verifyDocumentCompletion()) {
            return (
                <Button innerText={'Submit'} color='rgb(94, 163, 91)' onClickHandler={this.submitDocument} />
            )
        }

    }
 

    //State management methods
    getDocumentId = (): void => {
        this.setState({
            document_id: this.props.document_id
        })
    }

    giveDocumentPreviewComplete = (): void => {
        this.props.getDocumentPreviewComplete(true)
    }


    //React lifecycle methods
    componentDidMount() {
        this.handleShow()
        this.getDocumentId()
    }

    render() {        
        return (
            <div id='DocumentPreview' style={this.handleShow()}>
                <div id='document-view-container'>
                    <div id='document-view-header'>
                        <div id='documents-view-header-button-container'>
                            {this.renderDocumentSaveButton()}
                        </div>
                        <input placeholder='Document Name' onChange={(e) => {this.handleDocumentNameChange(e)}} id='document-name-input' type="text"/>
                        <div></div>
                    </div>
                    <DocumentView document_id={this.props.document_id} document_meta={this.props.document_meta} view={'DocumentPreview'} previewOnClickHandler={this.previewOnClickHandler}/>
                </div>
                <div id='show-sidebar-icon-container' onClick={this.showSidebar}>
                    <img id='show-sidebar-icon' src="/images/left-arrow-1.png" alt=""/>
                </div>
                <DocumentPreviewSidebar removeAssignedUser={this.props.removeAssignedUser} currentSelectedFieldId={this.props.currentSelectedFieldId} currentSelectedField={this.props.currentSelectedField} showSidebar={this.state.showSidebar} deleteUser={this.props.deleteUser} handleAddedUserPress={this.props.handleAddedUserPress} userList={this.props.userList} getHideSidebar={this.getHideSidebar} />
            </div>
        );
    }
}

export default DocumentPreview;