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
import {user} from './CreateDocumentValidation'
import {documentResponse, document_meta_field} from '../../AppValidation'
import {getDocumentPromise} from '../../services/services'

//Main Class
export default class CreateDocument extends React.Component<any, any> {

    constructor(props) {
        super(props)
        this.state = {
            currentView: '',
            view: '',
            document_id: '',
            documentName: '',
            userList: [],
            selectDocumentShow: true,
            documentPreviewShow: false,
            selectPermissionsBoolean: false,
            document_meta: Array
        }
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
    addUser = () => {

        let userList

        userList = this.state.userList



        //Creating multiple users for testing
        for(let i = 0; i < 3; i++) {
            let user: user = {
                name: `Example User ${Math.random()}`,
                dod_id: Math.random(),
                assigned_to: null
            }
            userList.push(user)
        }


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
        let assignedField: null | [number]

        userList.forEach(user => {    
            if(user.dod_id.toString() === elementId.toString()) {
                assignedField = user.assigned_to
                userList.splice(userList.indexOf(user), 1)
            }
        })

        this.removeAssignedUser(assignedField)

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

    removeAssignedUser = (assignedField: [number] | null) => {
        let document_meta: Array<document_meta_field> = this.state.document_meta
        if(assignedField !== null && assignedField.length > 0) {
            assignedField.forEach(field => {
                document_meta[field].assigned_to = null
            })
        }

        this.setState({
            document_meta: document_meta
        })
    }

    assignUserToField = (e: React.MouseEvent) => {       

        let elementId = (e.target as HTMLDivElement).id
        let userList = this.state.userList
        let document_meta = this.state.document_meta

        let user = userList.filter(user => user.dod_id.toString() === elementId.toString())[0]
        if(user.assigned_to === null) {
            user.assigned_to = []
        }

        if(!this.assignUserToFieldChecks(elementId)) {
            return
        }

        user.assigned_to.push(this.state.currentSelectedFieldId)
        document_meta[this.state.currentSelectedFieldId].assigned_to = user

        this.setState({
            userList: userList,
            document_meta: document_meta
        })

    }

    assignUserToFieldChecks = (dod_id: string): boolean =>  {

        let userList = this.state.userList
        let document_meta = this.state.document_meta

        let user = userList.filter(user => user.dod_id.toString() === dod_id.toString())[0]

        if(this.state.currentSelectedFieldId === undefined) {
            alert('Select field before assigning user')
            return false
        } 

        //Checking if user has already been assigned this field
        if(user.assigned_to.indexOf(this.state.currentSelectedFieldId) >= 0) {
            return false
        }

        //Checking if a user has already been assigned to a field
        if(document_meta[this.state.currentSelectedFieldId].assigned_to !== null) {
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
                        <SelectDocument selectDocumentBoolean={this.state.selectDocumentBoolean} documents={this.props.documentResults} getDocumentId={this.getDocumentId} getSelectDocumentComplete={this.getSelectDocumentComplete} />
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
                        <SelectPermissions currentSelectedFieldId={this.state.currentSelectedFieldId} assignUserToField={this.assignUserToField} selectPermissionsBoolean={this.state.selectPermissionsBoolean} addUser={this.addUser} deleteUser={this.deleteUser} userList={this.state.userList} getSelectPermissionsComplete={this.getSelectPermissionsComplete} />
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
                        <DocumentPreview currentSelectedField={this.state.document_meta[this.state.currentSelectedFieldId]} handleSelectedFieldId={this.handleSelectedFieldId} currentSelectedFieldId={this.state.currentSelectedFieldId} deleteUser={this.deleteUser} assignUserToField={this.assignUserToField} documentPreviewBoolean={this.state.documentPreviewBoolean} userList={this.state.userList} document_id={this.state.document_id} document_meta={this.state.document_meta} getDocumentName={this.getDocumentName} getDocumentPreviewComplete={this.getDocumentPreviewComplete}/>
                    </div>
                </div>
            )

        }
    }


}