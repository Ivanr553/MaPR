import * as React from 'react';
import AddedUser from './AddedUser';

import {user} from '../../CreateDocumentValidation'

interface AddedUserListProps {
    userList: Array<user>,
    assignUserToField: (e: React.MouseEvent) => void,
    deleteUser: (e: React.MouseEvent) => void,
    isInSidebar: boolean,
    currentSelectedFieldId: number,
    className: string
}

class AddedUserList extends React.Component<AddedUserListProps, any> {

    constructor(props) {
        super(props)
        this.state = {
            fieldAssigned: false
        }
    }

    checkForAssignedField = () => {

        let userList = this.props.userList
        let currentSelectedFieldId = this.props.currentSelectedFieldId

        let result: boolean = false

        userList.forEach(user => {
            if(user.assigned_to !== null) {
                if(user.assigned_to.indexOf(currentSelectedFieldId) >= 0) {
                    console.log('sending:', true)
                    result = true
                }
            }
        })

        return result

    }

    renderAddedUsers(): Array<JSX.Element> {

        let userList = this.props.userList
        let userElementList = []

        userList.forEach( user => {
            userElementList.push(<AddedUser key={Math.random()} fieldAssigned={this.checkForAssignedField()} currentSelectedFieldId={this.props.currentSelectedFieldId} user={user} assignUserToField={e => this.props.assignUserToField(e)} deleteUser={this.props.deleteUser} isInSidebar={this.props.isInSidebar} />)
        })

        return userElementList

    }

    componentDidMount() {

    }

    render() {
        return (
            <div className={this.props.className}>
                {this.renderAddedUsers()}
            </div>
        );
    }
}

export default AddedUserList;