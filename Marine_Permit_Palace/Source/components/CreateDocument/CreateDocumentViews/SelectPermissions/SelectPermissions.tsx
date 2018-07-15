import * as React from 'react';
import AddedUser from './AddedUser';
import * as $ from 'jquery'

interface Props {
    getSelectPermissionsComplete(selectPermissionsComplete: boolean): void,
    addUser: () => void,
    userObjects: Array<any>,
    userList: Array<JSX.Element>,
    selectPermissionsBoolean: boolean
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

    // showUserList = (): Array<JSX.Element> => {

    //     return this.props.userList

    // }


    //Finding and displaying added users
    handleFindUser = async (e) => {
        let query = e.target.value

        if(query === '') {
            this.clearUsersFromSearch()
            return
        }

        try {

            let result = await $.get(`/Account/FindUsers?search=${query}`)

            //No users yet, will jsut use fake ones for now  

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
                <li className='user-search-result' onClick={this.props.addUser}>
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
                        <div className='added-users-container'>
                            {this.props.userList}
                        </div> 
                    </div>
                </div>
            </div>
        );
    }
}

export default SelectPermissions;