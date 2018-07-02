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
            userList: [],
            userObjects: []
        }
    }

    //Views
    handleSelectDocumentView = () => {

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

        })
    }

    handleSelectPermissionsView = () => {
        let currentView = (
            <div className='container'>
                <div id='select-users-header' className='documents-header'>Select Users</div>
                <div className='document-list-container'>
                    <div id='user-search-main-container'>
                        <div id='user-search-bar-container'>
                            <div id='search-bar-magnifying-glass'></div>
                            <input onBlur={this.clearUsersFromSearch} onFocus={(e) => {this.handleFindUser(e)}} onChange={(e) => {this.handleFindUser(e)}} id='user-search-bar' placeholder='Find Users' type="text"/>
                            {this.state.userSearchResults}
                        </div>
                        <div id='added-users-title'>Selected Users</div>
                        <div className='added-users-container'>
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

        })
    }

    handleSelectPreviewView = () => {

        let currentView = (
            <div className='container'>
                <div id='document-view-container'>
                    <DocumentView document_id={this.state.document_id}/>
                </div>
                <div id='show-sidebar-icon-container' onClick={this.showSidebar}>
                    <img id='show-sidebar-icon' src="/images/left-arrow-1.png" alt=""/>
                </div>
                <div id='document-view-sidebar' className=''>
                    <div id='close-sidebar-icon' onClick={this.hideSidebar}>x</div>
                    <div className='documents-header'>Selected Users</div>
                    <div id='added-users-container-preview' className='added-users-container'>
                        {this.state.userList}
                    </div>
                </div>
            </div>
        )
        this.setState({
            currentView: currentView,
            view: 'Preview'
        }, () => {

        })

    }

    //Creates list in state of documents to be rendered
    renderDocuments = () => {

        let documents = this.props.documentResults
        let documentList = []

        for(let i = 0; i < documents.length; i++) {

            let document_id = '/dist/documents/' + documents[i].document_id

            let newDocument = 
                <div key={i} className='viewable-document' id={documents[i].idDocument} onClick={(e) => {this.selectDocument(e)}}>
                    <div className='viewable-document-field' id='first-field'>{(i+1) + '.'}</div>
                    <div className='viewable-document-field'>{documents[i].name}</div>
                </div>

            documentList.push(newDocument)
            }

        this.setState({
            documentList: documentList
        }, () => {
            this.handleSelectDocumentView()
        })

    }

    selectDocument = (e) => {
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
            document_id: target.id
        }, () => {

        })

    }

    //Finding and displaying added users
     handleFindUser = async (e) => {
        let query = e.target.value

        if(query === '') {
            this.clearUsersFromSearch()
            return
        }

        try {

            // let result = $.ajax({

            // })

            let userArray = ['user1', 'user2', 'user3']
            
            this.displayUsersFromSearch(userArray)

        } catch(e) {
            console.log(e)
        }

    }

    clearUsersFromSearch = () => {
        setTimeout(
            () => {
                this.setState({
                    userSearchResults: ''
                }, () => {
                    this.handleSelectPermissionsView()                        
                })
            },
            150
        )
    }

    displayUsersFromSearch = (userArray) => {

        let userSearchResultsArray = []

        for(let i = 0; i < userArray.length; i++) {
            let userSearchResult = (
                <li className='user-search-result' onClick={this.addUser}>
                    {userArray[i]}
                </li>
            )
            userSearchResultsArray.push(userSearchResult)
        }

        let userSearchResults = (
            <ul id='user-search-results-list'>
                {userSearchResultsArray}
            </ul>
        )

        this.setState({
            userSearchResults: userSearchResults
        }, () => {
            this.handleSelectPermissionsView()            
        })

    }


    addUser = () => {

        let userObjects = this.state.userObjects.slice()
        let userList = this.state.userList.slice() 

        let user = {
            name: 'Example User',
            id: Math.random()
        }

        userObjects.push(user)

        let addedUser = 
            <div className='added-user' id={user.id.toString()}>
                {user.name}
                <div className='added-user-delete-icon' onClick={(e) => {this.deleteUser(e)}}>x</div>
            </div>

        userList.push(addedUser)

        let input = document.getElementById('user-search-bar') as HTMLInputElement
        input.value = ''

        this.setState({
            userList: userList,
            userObjects: userObjects
        }, () => {
            this.handleSelectPermissionsView()
        })

    }

    deleteUser = (e) => {

        let id = e.target.parentNode.id
        let userList = this.state.userList.slice()
        let userObjects = this.state.userObjects.slice()


        userList.forEach(element => {
            if(element.props.id === id) {
                userList.pop(element)
            }
        })

        userObjects.forEach(user => {
            if(user.id === parseFloat(id)) {
                userObjects.pop(user)
            }
        })

        this.setState({
            userList: userList,
            userObjects: userObjects
        }, () => {
            this.handleSelectPermissionsView()
        })

    }

    //Sidebar Functions

    hideSidebar() {

        let sidebar = document.getElementById('document-view-sidebar')
        sidebar.classList.add('hide-sidebar')
        sidebar.classList.remove('show-sidebar')

    }

    showSidebar() {

        let sidebar = document.getElementById('document-view-sidebar')
        sidebar.classList.add('show-sidebar')
        sidebar.classList.remove('hide-sidebar')

    }

    componentWillMount() {
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