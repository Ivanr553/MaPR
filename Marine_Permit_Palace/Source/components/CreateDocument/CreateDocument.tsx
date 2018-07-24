import * as React from 'react'
import * as $ from 'jquery'
import PDF from 'react-pdf-js'

const s = require('./styling/style.sass')

import SelectPermissions from './CreateDocumentViews/SelectPermissions/SelectPermissions';
import SelectDocument from './CreateDocumentViews/SelectDocument/SelectDocument';
import DocumentPreview from './CreateDocumentViews/DocumentPreview/DocumentPreview';
import CreateDocumentNavButton from './CreateDocumentNavButton/CreateDocumentNavButton'
import AddedUser from './CreateDocumentViews/SelectPermissions/AddedUser'

//Modules
import {user, createDocumentState} from './CreateDocumentValidation'
import {documentResponse, document_meta_field, databaseUser} from '../../AppValidation'
import {getDocumentPromise} from '../../services/services'

interface Props {
    createDocumentState: object,
    getCreateDocumentState: (state: object) => void,
    documentResults: Array<any>,
    getCurrentView: (currentView: React.ComponentElement<HTMLElement, any>) => void,
    viewDocument: (e) => void
}

//Main Class
export default class CreateDocument extends React.Component<Props, any> {

    constructor(props) {
        super(props)
        this.state = this.props.createDocumentState as createDocumentState
    }

    //Views
    handleSelectDocumentView = (): void => {
        this.setState({
            selectDocumentBoolean: true,
            selectPermissionsBoolean: false,
            documentPreviewBoolean: false
        })
    }

    handleSelectPermissionsView = (): void => {
        this.setState({
            selectDocumentBoolean: false,
            selectPermissionsBoolean: true,
            documentPreviewBoolean: false
        })
    }

    handleSelectPreviewView = (): void => {
        this.setState({
            selectDocumentBoolean: false,
            selectPermissionsBoolean: false,
            documentPreviewBoolean: true
        })

    }

    //State Management Functions
    //UserList Management
    addUser = (user: databaseUser) => {

        let userList

        userList = this.state.userList

        let newUser: user = {
            dod_id: parseInt(user.dod_id),
            name: user.first_name,
            assigned_to: [],
            is_allowed_approve: false,
            is_allowed_edit: false,
            is_allowed_submit: false,
            is_allowed_assign: false
        }

        userList.push(newUser)

        let input = document.getElementById('user-search-bar') as HTMLInputElement
        input.value = ''

        this.setState({
            userList: userList
        }, () => {
            if(this.state.userList.length > 0) {
                this.setState({
                    selectPermissionsComplete: true
                })
            }
        })

    }

    deleteUser = (e) => {

        let elementId = e.target.parentNode.id
        let userList = this.state.userList        
        let assignedField: Array<number>
        let editedUser

        userList.forEach(user => {    
            if(user.dod_id.toString() === elementId.toString()) {
                user = user
                userList.splice(userList.indexOf(user), 1)
            }
        })

        // this.removeAssignedUser(editedUser, null)

        this.setState({
            userList: userList
        }, () => {
            if(this.state.userList.length < 1) {
                this.setState({
                    selectPermissionsComplete: false
                })
            }
        })

    }

    //THIS IS NOT WORKING

    removeAssignedUser = (user: user, removeOption: null | number) => {

        let document_meta: Array<document_meta_field> = this.state.document_meta
        let userList = this.state.userList

        if(user.assigned_to !== null && user.assigned_to.length > 0) {
            if(removeOption === null) {
                user.assigned_to.forEach(field => {
                    document_meta[field].assigned_to = null
                })
            } else {
                document_meta[removeOption].assigned_to = null
                user.assigned_to = user.assigned_to.filter((item) => {return item !== removeOption})
            }
        }

        userList[userList.indexOf(user)] = user

        this.setState({
            document_meta: document_meta,
            userList: userList
        })
    }

    handleAddedUserPress = (e: React.MouseEvent) => {

        let target = (e.target as HTMLElement)
        // if(target.classList.contains('added-user-delete-icon')) {
        //     return
        // }
        while (target.id === '') {
            target = target.parentElement
        }

        let elementId = parseInt(target.id)
        let userList = this.state.userList

        let user = userList.filter(user => user.dod_id === elementId)[0]
        if(!this.assignUserToFieldChecks(elementId)) {
            return
        }

        this.assignUserToField(user)

    }

    assignUserToField = (user: user) => { 

        let userList = this.state.userList
        let document_meta = this.state.document_meta

        user.assigned_to.push(parseInt(this.state.currentSelectedFieldId))
        document_meta[this.state.currentSelectedFieldId].assigned_to = user

        this.setState({
            userList: userList,
            document_meta: document_meta
        })

    }

    assignUserToFieldChecks = (dod_id: number): boolean =>  {

        let userList = this.state.userList
        let document_meta = this.state.document_meta

        let user: user = userList.filter(user => user.dod_id === dod_id)[0]

        if(this.state.currentSelectedFieldId === undefined) {
            alert('Select field before assigning user')
            return false
        } 

        //Checking if user has already been assigned this field
        if(user.assigned_to.indexOf(parseInt(this.state.currentSelectedFieldId)) >= 0) {
            console.log('user is already assigned to field', user.assigned_to, this.state.currentSelectedFieldId)
            this.removeAssignedUser(user, parseInt(this.state.currentSelectedFieldId))
            return false
        }

        //Checking if a user has already been assigned to a field
        if(document_meta[this.state.currentSelectedFieldId].assigned_to !== null) {
            console.log('user is already assigned to a field',document_meta[this.state.currentSelectedFieldId].assigned_to) 
            return false
        }

        return true
        
    }

    handleSelectedFieldId = (currentSelectedFieldId: number) => {
        this.setState({
            currentSelectedFieldId: currentSelectedFieldId
        })

    }

    getDocumentMeta = async () => {

        let promise = await getDocumentPromise(this.state.document_id)
        let documentResponse: documentResponse  = await promise.promise as documentResponse
        let document_meta = documentResponse.document_meta

        this.setState({
            document_meta: document_meta
        })

    }


    //State Management
    disableDocumentPreview = () => {
        if(this.state.selectDocumentComplete && this.state.selectPermissionsComplete) {
            return false
        } else {
            return true
        }
    }

    getDocumentName = (documentName) => {
        this.setState({
            documentName: documentName
        })
    }

    getDocumentId = (document_id) => {
        this.setState({
            document_id: document_id
        }, () => {
            this.getDocumentMeta()
        })
    }

    giveDocumentId = () => {
        return this.state.document_id
    }

    getSelectDocumentComplete = (selectDocumentComplete) => {
        this.setState({
            selectDocumentComplete: selectDocumentComplete
        })
    }

    getSelectPermissionsComplete = (selectPermissionsComplete) => {
        this.setState({
            selectPermissionsComplete: selectPermissionsComplete
        })
    }

    getDocumentPreviewComplete = (documentPreviewComplete) => {
        this.setState({
            documentPreviewComplete: documentPreviewComplete
        })
    }

    componentDidUpdate() {
        this.props.getCreateDocumentState(this.state)
    }

    componentDidMount() {
        this.setState({
            state: this.props.createDocumentState
        })
    }

    componentWillMount() {
        this.handleSelectDocumentView()
    }

    render() {

        if(this.state.selectDocumentBoolean) {

            return (
                <div id='CreateDocument'>
                    <div id='create-document-nav-bar'>
                        <CreateDocumentNavButton complete={this.state.selectDocumentComplete} id={'create-document-nav-bar-item-document'} innerText={'Select Document'} onClickHandler={ this.handleSelectDocumentView} disable={false} selected={this.state.selectDocumentBoolean}/>
                        <CreateDocumentNavButton complete={this.state.selectPermissionsComplete} id={'create-permissions-nav-bar-item-document'} innerText={'Create Permissions'} onClickHandler={this.handleSelectPermissionsView} disable={false} selected={this.state.selectPermissionsBoolean}/>
                        <CreateDocumentNavButton complete={false} id={'document-preview-nav-bar-item-document'} innerText={'Preview'} onClickHandler={this.handleSelectPreviewView} disable={this.disableDocumentPreview()} selected={this.state.documentPreviewBoolean}/>
                    </div>
                    <div className='container'>
                        <SelectDocument selectDocumentBoolean={this.state.selectDocumentBoolean} documents={this.props.documentResults} getDocumentId={this.getDocumentId} getSelectDocumentComplete={this.getSelectDocumentComplete} document_id={this.state.document_id}/>
                    </div>
                </div>
            )

        }
        if(this.state.selectPermissionsBoolean) {

            return (
                <div id='CreateDocument'>
                    <div id='create-document-nav-bar'>
                        <CreateDocumentNavButton complete={this.state.selectDocumentComplete} id={'create-document-nav-bar-item-document'} innerText={'Select Document'} onClickHandler={ this.handleSelectDocumentView} disable={false} selected={this.state.selectDocumentBoolean}/>
                        <CreateDocumentNavButton complete={this.state.selectPermissionsComplete} id={'create-permissions-nav-bar-item-document'} innerText={'Create Permissions'} onClickHandler={this.handleSelectPermissionsView} disable={false} selected={this.state.selectPermissionsBoolean}/>
                        <CreateDocumentNavButton complete={false} id={'document-preview-nav-bar-item-document'} innerText={'Preview'} onClickHandler={this.handleSelectPreviewView} disable={this.disableDocumentPreview()} selected={this.state.documentPreviewBoolean}/>
                    </div>
                    <div className='container'>
                        <SelectPermissions removeAssignedUser={this.removeAssignedUser} currentSelectedFieldId={this.state.currentSelectedFieldId} handleAddedUserPress={this.handleAddedUserPress} selectPermissionsBoolean={this.state.selectPermissionsBoolean} addUser={this.addUser} deleteUser={this.deleteUser} userList={this.state.userList} getSelectPermissionsComplete={this.getSelectPermissionsComplete} />
                    </div>
                </div>
            )

        }
        if(this.state.documentPreviewBoolean) {

            return (
                <div id='CreateDocument'>
                    <div id='create-document-nav-bar'>
                        <CreateDocumentNavButton complete={this.state.selectDocumentComplete} id={'create-document-nav-bar-item-document'} innerText={'Select Document'} onClickHandler={ this.handleSelectDocumentView} disable={false} selected={this.state.selectDocumentBoolean}/>
                        <CreateDocumentNavButton complete={this.state.selectPermissionsComplete} id={'create-permissions-nav-bar-item-document'} innerText={'Create Permissions'} onClickHandler={this.handleSelectPermissionsView} disable={false} selected={this.state.selectPermissionsBoolean}/>
                        <CreateDocumentNavButton complete={false} id={'document-preview-nav-bar-item-document'} innerText={'Preview'} onClickHandler={this.handleSelectPreviewView} disable={this.disableDocumentPreview()} selected={this.state.documentPreviewBoolean}/>
                    </div>
                    <div className='container'>
                        <DocumentPreview removeAssignedUser={this.removeAssignedUser} currentSelectedField={this.state.document_meta[this.state.currentSelectedFieldId]} handleSelectedFieldId={this.handleSelectedFieldId} currentSelectedFieldId={this.state.currentSelectedFieldId} deleteUser={this.deleteUser} handleAddedUserPress={this.handleAddedUserPress} documentPreviewBoolean={this.state.documentPreviewBoolean} userList={this.state.userList} document_id={this.state.document_id} document_meta={this.state.document_meta} getDocumentName={this.getDocumentName} getDocumentPreviewComplete={this.getDocumentPreviewComplete}/>
                    </div>
                </div>
            )

        }
    }


}