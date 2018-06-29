import * as React from 'react'
import * as $ from 'jquery'
import PDF from 'react-pdf-js'

const s = require('./styling/style.sass')

import DocumentList from '../DocumentList/DocumentList'
import DocumentView from '../DocumentView/DocumentView'

export default class CreateDocument extends React.Component<any, any> {

    constructor(props) {
        super(props)
        this.state = {
            documentResults: this.props.documentResults,
            currentView: '',
            view: '',
            documentList: [],
            document_id: '',
            nextButton: '',
            readyForNext: false,
            userList: []
        }

        // this.handleDocumentLinkPress = this.handleDocumentLinkPress.bind(this)
        this.handleSelectDocumentView = this.handleSelectDocumentView.bind(this)
        this.handleSelectPermissionsView = this.handleSelectPermissionsView.bind(this)
        // this.handleSelectPreviewView = this.handleSelectPreviewView.bind(this)
        this.handleNext = this.handleNext.bind(this)
        this.handleBack = this.handleBack.bind(this)
        this.handleAddUser = this.handleAddUser.bind(this)
    }

    //Views
    handleSelectDocumentView() {

        let currentView = (
            <div className='container'>
                <div className='documents-header'>Select Template Document</div>
                <div className='document-list-container'>
                    {this.state.documentList}
                </div>
            </div>
        )
        this.setState({
            currentView: currentView,
            view: 'SelectDocument'
        }, () => {
            // this.handleButtons()
        })
    }

    handleSelectPermissionsView() {
        let currentView = (
            <div className='container'>
                <div className='documents-header'>Select Document Permissions</div>
                <div className='document-list-container'>
                    <div>Selected Document: {this.state.document_id}</div>
                    <div className='documents-header'>Select Users</div>
                    <div id='user-search-main-container'>
                        <div id='user-search-bar-container'>
                            <div id='search-bar-magnifying-glass'></div>
                            <input onClick={this.handleAddUser} onChange={(e) => {this.handleFindUser(e)}} id='user-search-bar' placeholder='Find Users' type="text"/>
                        </div>
                        <div id='added-users-title'>Selected Users</div>
                        <div id='added-users-container'>
                            {this.state.userList}
                        </div> 
                    </div>
                </div>
            </div>
        )
        this.setState({
            currentView: currentView,
            view: 'SelectPermissions'
        }, () => {
            // this.handleButtons()
        })
    }

    handleSelectPreviewView = () => {

        let currentView = (
            <div className='container'>
                <div className='documents-header'>Document Preview</div>
                <div id='document-view-container'>
                    <DocumentView file={this.state.document_id}/>
                </div>
            </div>
        )
        this.setState({
            currentView: currentView,
            view: 'Preview'
        }, () => {

        })

    }

    //Handle View Switching
    handleNext() {

        if(this.state.view === 'SelectDocument') {

            if(this.state.document_id === '') {
                return
            }

            this.handleSelectPermissionsView()
            return
        }

        if(this.state.view === 'SelectPermissions') {

            return

        }

    }

    handleBack() {

        if(this.state.view === 'SelectPermissions') {

            this.handleSelectDocumentView()
            return
        }

    }

    //Creating Buttons
    // handleButtons() {

    //     let backButton

    //     if(this.state.view === 'SelectDocument') {
            
    //         backButton = ''

    //         this.setState({
    //             backButton: backButton
    //         })
    //     }

    //     if(this.state.view === 'SelectPermissions') {
         
    //         backButton = 
    //         <button className='create-document-button selectable-button' id='create-document-back-button' onClick={this.handleBack}>
    //             Back
    //         </button>

    //         this.setState({
    //             backButton: backButton
    //         })
    //     }

    //     let nextButton

    //     if(!this.state.readyForNext) {

    //         nextButton =
    //             <button className='create-document-button' id='create-document-next-button'>
    //                 Next
    //             </button>

    //         this.setState({
    //             nextButton: nextButton
    //         }, () => {
    //             this.forceUpdate()
    //             return nextButton
    //         })
    //     }
    //     else {

    //         nextButton =
    //         <button className='create-document-button selectable-button' id='create-document-next-button' onClick={this.handleNext}>
    //             Next
    //         </button>

    //         this.setState({
    //             nextButton: nextButton
    //         }, () => {
    //             return nextButton
    //         }) 
    //     }

    // }

    //Creates list in state of documents to be rendered
    renderDocuments() {

        let documents = this.props.documentResults
        let documentList = []

        for(let i = 0; i < documents.length; i++) {

            let file = '/dist/documents/' + documents[i].file

            let newDocument = 
                <div key={i} className='viewable-document' id={documents[i].file} onClick={(e) => {this.selectDocument(e)}}>
                    <div className='viewable-document-field' id='first-field'>{(i+1) + '.'}</div>
                    <div className='viewable-document-field'>{documents[i].title}</div>
                </div>

            documentList.push(newDocument)
            }

        this.setState({
            documentList: documentList
        }, () => {
            this.handleSelectDocumentView()
        })

    }

    selectDocument(e) {
        let target = e.target

        while (!target.classList.contains('viewable-document')) {
            target = target.parentNode
        }

        let parent = target.parentNode

        for(let i = 0; i < parent.children.length; i++) {
            if(parent.children[i].className === 'viewable-document') {
                parent.children[i].style.border = 'solid 2px rgba(0, 0, 0, 0)'
            }
        }

        if(target.classList.contains('viewable-document')) {
            target.style.border = 'solid 2px rgba(38, 107, 168, 0.7)'
        }


        this.setState({
            document_id: target.id,
            readyForNext: true
        }, () => {
            // this.handleButtons()
        })

    }

    //Finding and displaying added users
    async handleFindUser(e) {
        let query = e.target.value

        try {

            let result = $.ajax({

            })
            
        } catch(e) {
            console.log(e)
        }

    }


    handleAddUser() {
        
        let userList = this.state.userList.slice() 

        let user = 'Example User'

        let addedUser = 
            <div className='added-user'>
                {user}
            </div>

        userList.push(addedUser)

        this.setState({
            userList: userList
        }, () => {
            this.handleSelectPermissionsView()
        })

    }

    handleDeleteUser() {



    }

    componentWillMount() {
        // this.handleButtons()
        this.renderDocuments()
    }

    render() {

        return(
            <div id='CreateDocument'>
                <div id='create-document-nav-bar'>
                    <div id='create-document-nav-bar-item-document' className='create-document-nav-bar-item' onClick={this.handleSelectDocumentView}>Select Document</div>
                    <div className='create-document-nav-bar-item' onClick={this.handleSelectPermissionsView}>Create Permissions</div>
                    <div className='create-document-nav-bar-item' onClick={this.handleSelectPreviewView}>Preview</div>
                </div>
                {this.state.currentView}
            </div>
        )

    }


}