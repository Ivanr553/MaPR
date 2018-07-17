import * as React from 'react';
import AddedUser from './AddedUser';
import AddedUserList from './AddedUserList'
import * as $ from 'jquery'

import {user} from '../../CreateDocumentValidation'

const s = require('./styling/style.sass')

interface Props {
    getSelectPermissionsComplete(selectPermissionsComplete: boolean): void,
    addUser: () => void,
    userList: Array<user>,
    selectPermissionsBoolean: boolean,
    assignUserToField: (e: React.MouseEvent) => void,
    deleteUser: (e: React.MouseEvent) => void,
    currentSelectedFieldId: number
}

class SelectPermissions extends React.Component<Props, any> {

    constructor(props) {
        super(props)
        this.state =  {
            userObjects: [],
            userList: []
        }
    }

    handleShow = () => {

        if(!this.props.selectPermissionsBoolean) {
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


    //Finding and displaying added users
    handleFindUser = async (e) => {
        let query = e.target.value

        if(query === '') {
            this.clearUsersFromSearch()
            return
        }

        try {

            let result = await $.get(`/Account/FindUsers?search=${query}`)

            //No users yet, will just use fake ones for now  

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
                })
            },
            150
        )
    }

    displayUsersFromSearch = (userArray) => {

        let userSearchResultsArray = []

        for(let i = 0; i < userArray.length; i++) {
            let userSearchResult = (
                <li key={i} className='user-search-result' onClick={this.props.addUser}>
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
        })

    }

    //State Management
    giveSelectPermissionsComplete = selectPermissionsComplete => {
        this.props.getSelectPermissionsComplete(selectPermissionsComplete)
    }

    componentDidMount() {
        this.handleShow()
    }

    render() {
        return (
            <div id='SelectPermissions' style={this.handleShow()}>
                <div id='select-users-header' className='documents-header'>Select Users</div>
                <div className='document-list-container'>
                    <div id='user-search-main-container'>
                        <div id='user-search-bar-container'>
                            <div id='search-bar-magnifying-glass'></div>
                            <input onBlur={this.clearUsersFromSearch} onFocus={(e) => {this.handleFindUser(e)}} onChange={(e) => {this.handleFindUser(e)}} id='user-search-bar' placeholder='Find Users' type="text"/>
                            {this.state.userSearchResults}
                        </div>
                        <div id='added-users-title'>Selected Users</div>
                        <AddedUserList className='added-users-container' currentSelectedFieldId={this.props.currentSelectedFieldId} userList={this.props.userList} assignUserToField={this.props.assignUserToField} deleteUser={this.props.deleteUser} isInSidebar={false} />
                    </div>
                </div>
            </div>
        );
    }
}

export default SelectPermissions;