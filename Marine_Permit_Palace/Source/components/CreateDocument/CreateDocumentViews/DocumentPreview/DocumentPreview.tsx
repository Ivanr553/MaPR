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
    documentPreviewBoolean: boolean,
    handleAddedUserPress: (e: React.MouseEvent) => void,
    deleteUser: (e: any) => void,
    document_meta: Array<document_meta_field>,
    handleSelectedFieldId: (id: number) => void,
    currentSelectedFieldId: number,
    currentSelectedField: currentSelectedField,
    removeAssignedUser: (user: user, removeOption: null | number) => void,
    assigned_user: user,
    completeDocumentCreation: () => void
}

 
class DocumentPreview extends React.Component<Props, any> {

    constructor(props) {
        super(props)
        this.state = {
            document_name: '',
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

        let document_name = this.state.document_name

        document_name = e.target.value

        this.setState({
            document_name: document_name
        }, () => {
            this.props.getDocumentName(this.state.document_name)
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

        let signatureFields = document_meta.filter(field => field.field_type === 'Signature')

        let result = signatureFields.map(field => {
            if(field.assigned_to === null) {
                return false
            }
        })

        if(result.indexOf(false) >=0) {
            return false
        }

        if(this.state.document_name === '') {
            return false
        }

        if(this.props.assigned_user === null) {
            return false
        }

        return true
        
    }

    // NOT WORKING -- Waiting on Mitchell //

    submitDocument = async () => {

        if(!this.verifyDocumentCompletion()) {
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
                if(!!document_meta_field.assigned_to) {
                    document_meta_field.assigned_to = document_meta_field.assigned_to.dod_id
                }
                return document_meta_field
            })

            let assignedDocument = {
                document_meta: document_meta,
                document_id: this.props.document_id,
                document_name: this.state.document_name,
                assignees: assignees
            }

            console.log(assignedDocument)

            let response = await fetch('/DocumentManager/AssignDocument', {
                method: "POST",
                mode: "cors",
                credentials: "same-origin",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                },
                body: JSON.stringify(assignedDocument)
            })

            if((response as any).status === 200) {
                this.props.completeDocumentCreation()
            } else {
                alert('There was an error submitting the document')
                throw new Error(response.statusText)
            }

        } catch(e) {
            throw new Error(e)
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