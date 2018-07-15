import * as React from 'react'
import * as $ from 'jquery'
import PDF from 'react-pdf-js'

const s = require('./styling/style.sass')

import SelectPermissions from './CreateDocumentViews/SelectPermissions/SelectPermissions';
import SelectDocument from './CreateDocumentViews/SelectDocument/SelectDocument';
import DocumentPreview from './CreateDocumentViews/DocumentPreview/DocumentPreview';
import CreateDocumentNavButton from './CreateDocumentNavButton/CreateDocumentNavButton'
import AddedUser from './CreateDocumentViews/SelectPermissions/AddedUser'

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
            userObjects: [],
            selectDocumentShow: true,
            documentPreviewShow: false,
            selectPermissionsBoolean: false
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
        let userObjects

        userList = this.state.userList
        userObjects = this.state.userObjects

        let user = {
            name: `Example User ${Math.random()}`,
            id: Math.random()
        }

        userObjects.push(user)

        let addedUser = <AddedUser user={user} onClickHandler={this.deleteUser} componentThis={this}/>

        userList.push(addedUser)

        let input = document.getElementById('user-search-bar') as HTMLInputElement
        input.value = ''


        this.setState({
            userList: userList,
            userObjects: userObjects
        }, () => {
            if(this.state.userList.length > 0) {
                this.setState({
                    selectPermissionsComplete: true
                })
            }
        })

    }

    deleteUser = (e) => {

        let id = e.target.parentNode.id
        let userList = this.state.userList
        let userObjects = this.state.userObjects


        userList.forEach(element => {
            if(element.props.user.id == id) {
                userList.splice(userList.indexOf(element), 1)
            }
        })

        userObjects.forEach(user => {
            if(user.id === parseFloat(id)) {
                userObjects.splice(userObjects.indexOf(user), 1)
            }
        })

        this.setState({
            userList: userList,
            userObjects: userObjects
        }, () => {
            if(this.state.userList.length < 1) {
                this.setState({
                    selectPermissionsComplete: false
                })
            }
        })

    }

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
        },() => {
            console.log(this.state.document_id)
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
                    <SelectPermissions selectPermissionsBoolean={this.state.selectPermissionsBoolean} addUser={this.addUser} userObjects={this.state.userObjects} userList={this.state.userList} getSelectPermissionsComplete={this.getSelectPermissionsComplete} />
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
                    <DocumentPreview documentPreviewBoolean={this.state.documentPreviewBoolean} userList={this.state.userList} document_id={this.state.document_id} getDocumentName={this.getDocumentName} getDocumentPreviewComplete={this.getDocumentPreviewComplete}/>
                </div>
            </div>
            )

        }

        // return(
        //     <div id='CreateDocument'>
        //         <div id='create-document-nav-bar'>
        //             <CreateDocumentNavButton complete={this.state.selectDocumentComplete} id={'create-document-nav-bar-item-document'} innerText={'Select Document'} onClickHandler={ this.handleSelectDocumentView} disable={false} selected={this.state.selectDocumentBoolean}/>
        //             <CreateDocumentNavButton complete={this.state.selectPermissionsComplete} id={'create-permissions-nav-bar-item-document'} innerText={'Create Permissions'} onClickHandler={this.handleSelectPermissionsView} disable={false} selected={this.state.selectPermissionsBoolean}/>
        //             <CreateDocumentNavButton complete={false} id={'document-preview-nav-bar-item-document'} innerText={'Preview'} onClickHandler={this.handleSelectPreviewView} disable={this.disableDocumentPreview()} selected={this.state.documentPreviewBoolean}/>
        //         </div>
        //         <div className='container'>
        //             <SelectDocument selectDocumentBoolean={this.state.selectDocumentBoolean} documents={this.props.documentResults} getDocumentId={this.getDocumentId} getSelectDocumentComplete={this.getSelectDocumentComplete} />
        //             <SelectPermissions selectPermissionsBoolean={this.state.selectPermissionsBoolean} addUser={this.addUser} userObjects={this.state.userObjects} userList={this.state.userList} getSelectPermissionsComplete={this.getSelectPermissionsComplete} />
        //             <DocumentPreview documentPreviewBoolean={this.state.documentPreviewBoolean} userList={this.state.userList} document_id={this.giveDocumentId()} getDocumentName={this.getDocumentName} getDocumentPreviewComplete={this.getDocumentPreviewComplete}/>
        //         </div>
        //     </div>
        // )

    }


}