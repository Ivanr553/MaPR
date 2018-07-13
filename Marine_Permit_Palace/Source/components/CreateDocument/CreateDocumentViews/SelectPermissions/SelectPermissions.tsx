import * as React from 'react';

interface Props {
    getUserList(userList: Array<any>): void,
    getSelectPermissionsComplete(selectPermissionsComplete: boolean): void
}

class SelectPermissions extends React.Component<any, any> {

    constructor(props) {
        super(props)
        this.state =  {
            userObjects: [],
            userList: []
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
            this.giveUserList()
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
            this.giveUserList()
        })

    }

    //State Management
    giveSelectPermissionsComplete = selectPermissionsComplete => {
        this.props.getSelectPermissionsComplete(selectPermissionsComplete)
    }

    giveUserList = () => {
        this.props.getUserList(this.state.userList)
        if(this.state.userList.length > 0) {
            this.giveSelectPermissionsComplete(true)
        }
    }

    componentDidUpdate() {
        if(this.state.userList.length < 1) {
            this.giveSelectPermissionsComplete(false)
        }
    }

    render() {
        return (
            <div id='SelectPermissions'>
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
        );
    }
}

export default SelectPermissions;