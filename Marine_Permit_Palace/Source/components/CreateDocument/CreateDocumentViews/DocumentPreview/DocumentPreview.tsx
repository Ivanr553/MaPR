import * as React from 'react';
import * as $ from 'jquery'

import DocumentView from '../../../DocumentView/DocumentView'
import { EventHandler } from 'react';
import DocumentPreviewSidebar from './DocumentPreviewSidebar';

import {user, currentSelectedField} from '../../CreateDocumentValidation'
import { document_meta_field } from '../../../../AppValidation';


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
    removeAssignedUser: (user: user, removeOption: null | number) => void
}

 
class DocumentPreview extends React.Component<Props, any> {

    constructor(props) {
        super(props)
        this.state = {
            documentName: '',
            currentSelectedField: '',
            userList: []
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
        if(this.props.currentSelectedField !== undefined) {
            document.getElementById(this.props.document_meta.indexOf(this.props.currentSelectedField as any).toString()).classList.remove('selectedField')
        }

        document.getElementById(id).classList.add('selectedField')

        let currentSelectedFieldValue = (this.props.document_meta as Array<document_meta_field>)[id].assigned_to

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

        let signatureFields = document_meta.filter(field => field.field_type === 'Signature')

        let result = signatureFields.map(field => {
            if(field.assigned_to === null) {
                return false
            }
        })

        if(result.indexOf(false) >=0) {
            return false
        }

        if(this.state.documentName === '') {
            return false
        }

        return true
        
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
        this.verifyDocumentCompletion()
    }

    render() {
        return (
            <div id='DocumentPreview' style={this.handleShow()}>
                <div id='document-view-container'>
                    <div id='document-view-header'>
                        <input placeholder='Document Name' onChange={(e) => {this.handleDocumentNameChange(e)}} id='document-name-input' type="text"/>
                        <div id='save-button'>
                            Assign File
                        </div>
                    </div>
                    <DocumentView document_id={this.props.document_id} view={'DocumentPreview'} previewOnClickHandler={this.previewOnClickHandler}/>
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