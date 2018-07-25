import * as React from 'react';
import AddedUser from './AddedUser';
import AddedUserList from './AddedUserList'
import * as $ from 'jquery'

import {user} from '../../CreateDocumentValidation'
import {databaseUser} from '../../../../AppValidation'
import AddedUserPermissions from './AddedUserPermissions';

const s = require('./styling/style.sass')

interface Props {
    getSelectPermissionsComplete(selectPermissionsComplete: boolean): void,
    addUser: (user: databaseUser) => void,
    userList: Array<user>,
    selectPermissionsBoolean: boolean,
    handleAddedUserPress: (e: React.MouseEvent) => void,
    deleteUser: (e: React.MouseEvent) => void,
    currentSelectedFieldId: number,
    removeAssignedUser: (user: user, removeOptions: null | number) => void,
    assigned_user: user,
    handleToggleAssignedUser: (user: user) => void
}

class SelectPermissions extends React.Component<Props, any> {

    constructor(props) {
        super(props)
        this.state =  {
            userSearchResults: '',
            selectedUser: undefined
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

    handleAddedUserPress = (e) => {

        let target = e.target

        if(target.classList.contains('added-user-delete-icon')) {
            return
        }

        while(target.id === '') {
            target = target.parentNode
        }

        let id = parseInt(target.id)
        
        let user = this.props.userList.filter(user => {
            return user.dod_id === id
        })[0]

        this.setState({
            selectedUser: user
        })

    }

    handleSwitchToggle = (field: string) => {

        const selectedUser = this.state.selectedUser

        selectedUser[field] = !selectedUser[field]

        this.setState({
            selectedUser: selectedUser
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

            let userArray: Array<databaseUser> = await $.get(`/Account/FindUsers?search=${query}`)
            
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

        let userSearchResultsArray: Array<JSX.Element> = []

        for(let i = 0; i < userArray.length; i++) {

            let user: databaseUser = userArray[i]

            let userSearchResult = (
                <li key={user.dod_id} className='user-search-result' onClick={() => this.props.addUser(user)}>
                    {user.dod_id}, {user.first_name}
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
                            <input autoComplete='off' onBlur={this.clearUsersFromSearch} onFocus={(e) => {this.handleFindUser(e)}} onChange={(e) => {this.handleFindUser(e)}} id='user-search-bar' placeholder='Find Users' type="text"/>
                            {this.state.userSearchResults}
                        </div>
                        <div className='added-users-components-grid'>
                            <div id='added-users-title'>Selected Users</div>
                            <AddedUserList selectedUser={this.state.selectedUser} handleAddedUserPress={this.handleAddedUserPress} removeAssignedUser={this.props.removeAssignedUser} className='added-users-container' currentSelectedFieldId={this.props.currentSelectedFieldId} userList={this.props.userList} deleteUser={this.props.deleteUser} isInSidebar={false} />
                            <AddedUserPermissions assigned_user={this.props.assigned_user} selectedUser={this.state.selectedUser} handleSwitchToggle={this.handleSwitchToggle} handleAssignedUserToggle={this.props.handleToggleAssignedUser} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SelectPermissions;