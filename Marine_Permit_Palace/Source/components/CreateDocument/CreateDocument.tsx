import * as React from 'react'

import './styling/style.sass'

import SelectPermissions from './CreateDocumentViews/SelectPermissions/SelectPermissions';
import SelectDocument from './CreateDocumentViews/SelectDocument/SelectDocument';
import DocumentPreview from './CreateDocumentViews/DocumentPreview/DocumentPreview';
import CreateDocumentNavButton from './CreateDocumentNavButton/CreateDocumentNavButton'

//Modules
import {user, createDocumentState, selectedField} from './CreateDocumentValidation'
import {documentResponse, documentPage, databaseUser} from '../../AppValidation'
import {getTemplateDocumentPromise} from '../../services/services'

interface Props {
    createDocumentState: object,
    getCreateDocumentState: (state: object) => void,
    documentResults: Array<any>,
    getCurrentView: (currentView: React.ComponentElement<HTMLElement, any>) => void,
    viewDocument: (e) => void,
    getPendingDocuments: () => void
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

        userList = this.state.userList.slice()

        let newUser: user = {
            dod_id: parseInt(user.dod_id),
            name: user.first_name,
            assigned_to: [],
            is_allowed_approve: false,
            is_allowed_edit: true,
            is_allowed_submit: false,
            is_allowed_assign: false
        }

        if(!this.validateDuplicateUsers(newUser.dod_id)) {
            return
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

    validateDuplicateUsers = (dod_id: number): boolean => {

        let userList = this.state.userList.slice()

        const verifyDuplicate = userList.map(user => {
            return user.dod_id === dod_id
        })

        if(verifyDuplicate.indexOf(true) >= 0) {
            return false
        }

        return true

    }

    deleteUser = (e) => {

        let elementId = e.target.parentNode.id
        let userList = this.state.userList

        userList.forEach(user => {    
            if(user.dod_id.toString() === elementId.toString()) {
                user = user
                userList.splice(userList.indexOf(user), 1)
            }
        })

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

    removeAssignedUser = (user: user, page: number, removeOption: null | number) => {

        let pages: Array<documentPage> = this.state.pages
        let userList: Array<user> = this.state.userList
        let selectedField: selectedField = this.state.selectedField


        if(!!user.assigned_to && user.assigned_to.length > 0) {
            if(removeOption === null) {
                user.assigned_to.forEach(id => {
                    pages[page].document_meta[id].assigned_to = null
                    selectedField.assigned_to = null
                })
            } else {
                pages[page].document_meta[removeOption].assigned_to = null
                user.assigned_to = user.assigned_to.filter((id) => {return id !== removeOption})
                selectedField.assigned_to = null
            }
        }

        userList[userList.indexOf(user)] = user

        this.setState({
            pages: pages,
            userList: userList,
            selectedField: selectedField
        })
    }

    handleAddedUserPress = (e: React.MouseEvent) => {

        let target = (e.target as HTMLElement)
        while (target.id === '') {
            target = target.parentElement
        }

        let dod_id = parseInt(target.id)
        let userList = this.state.userList.slice()

        let user = userList.filter(user => user.dod_id === dod_id)[0]
        if(!this.assignUserToFieldChecks(user)) {
            return
        }

        this.assignUserToField(user)

    }

    assignUserToField = (user: user) => { 

        let userList = this.state.userList.slice()
        let pages: Array<documentPage> = this.state.pages
        let selectedField: selectedField = this.state.selectedField

        user.assigned_to.push(selectedField.id)
        pages[selectedField.page].document_meta[selectedField.id].assigned_to = user
        selectedField.assigned_to = user

        this.setState({
            userList: userList,
            pages: pages,
            selectedField: selectedField
        })

    }

    assignUserToFieldChecks = (user: user): boolean =>  {

        let pages = this.state.pages
        let selectedField = this.state.selectedField

        if(!!!this.state.selectedField.id) {
            alert('Select field before assigning user')
            return false
        } 

        //Checking if user has already been assigned this field
        if(user.assigned_to.indexOf(selectedField.id) >= 0) {
            console.log('removing user')
            this.removeAssignedUser(user, selectedField.page, this.state.selectedField.id)
            return false
        }

        //Checking if a user has already been assigned to a field
        if(pages[selectedField.page].document_meta[selectedField.id].assigned_to !== null) {

            return false
        }

        return true
        
    }

    handleToggleAssignedUser = (user: user) => {

        if(user === this.state.assigned_user) {
            this.setState({
                assigned_user: null
            })
            return
        }

        this.setState({
            assigned_user: user
        })

    }

    handleSelectedField = (selectedField: selectedField) => {
        this.setState({
            selectedField: selectedField
        })

    }

    getDocumentMeta = async () => {

        let promise = await getTemplateDocumentPromise(this.state.document_id)
        let request = await promise.promise
        let documentResponse: documentResponse  = await request.json() as documentResponse

        let pages: Array<documentPage> = documentResponse.pages

        this.setState({
            pages: pages
        })

    }


    //State Management
    completeDocumentCreation = () => {

        let state = {
            document_id: '',
            pages: Array,
            document_name: '',
            userList: [],
            selectDocumentBoolean: true,
            documentPreviewBoolean: false,
            selectPermissionsBoolean: false
        }

        this.props.getCreateDocumentState(state)

        this.setState({
            document_id: '',
            pages: Array,
            document_name: '',
            userList: [],
            selectDocumentBoolean: true,
            documentPreviewBoolean: false,
            selectPermissionsBoolean: false,
            selectDocumentComplete: false,
            selectPermissionsComplete: false
        }, () => {
            this.handleSelectDocumentView()
        })

        this.props.getPendingDocuments()


    }

    disableDocumentPreview = () => {
        if(this.state.selectDocumentComplete && this.state.selectPermissionsComplete) {
            return false
        } else {
            return true
        }
    }

    getDocumentName = (document_name) => {
        this.setState({
            document_name: document_name
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

    componentDidUpdate() {
        this.props.getCreateDocumentState(this.state)
    }

    componentDidMount() {
        this.handleSelectDocumentView()        
    }

    componentWillMount() {

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
                        <SelectPermissions selectedField={this.state.selectedField} assigned_user={this.state.assigned_user} handleToggleAssignedUser={this.handleToggleAssignedUser} removeAssignedUser={this.removeAssignedUser} selectPermissionsBoolean={this.state.selectPermissionsBoolean} addUser={this.addUser} deleteUser={this.deleteUser} userList={this.state.userList} getSelectPermissionsComplete={this.getSelectPermissionsComplete} />
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
                        <DocumentPreview selectedField={this.state.selectedField} completeDocumentCreation={this.completeDocumentCreation} assigned_user={this.state.assigned_user} handleSelectedField={this.handleSelectedField} deleteUser={this.deleteUser} handleAddedUserPress={this.handleAddedUserPress} documentPreviewBoolean={this.state.documentPreviewBoolean} userList={this.state.userList} document_id={this.state.document_id} pages={this.state.pages} getDocumentName={this.getDocumentName}/>
                    </div>
                </div>
            )

        }
    }


}