import * as React from 'react';
import AddedUser from './AddedUser';

import {user, selectedField} from '../../CreateDocumentValidation'

interface AddedUserListProps {
    userList: Array<user>,
    handleAddedUserPress: (e: React.MouseEvent) => void,
    deleteUser: (e: React.MouseEvent) => void,
    isInSidebar: boolean,
    selectedField: selectedField,
    className: string,
    selectedUser?: user
}

class AddedUserList extends React.Component<AddedUserListProps, any> {

    constructor(props) {
        super(props)
        this.state = {
            fieldAssigned: false
        }
    }

    checkForAssignedField = () => {

        let userList = this.props.userList.slice()

        let result: boolean = false

        userList.forEach(user => {
            if(!!!user.assigned_to) {
                if(user.assigned_to.indexOf(this.props.selectedField.id) >= 0) {
                    result = true
                }
            }
        })

        return result

    }

    renderAddedUsers(): Array<JSX.Element> {

        let userList = this.props.userList
        let userElementList = []

        if(this.props.isInSidebar && !!this.props.selectedField) {
            userList = userList.filter(user => {
                return user.assigned_to.indexOf(this.props.selectedField.id) < 0}
            )
        }
        
        userList.forEach( user => {
            userElementList.push(<AddedUser selectedField={this.props.selectedField} key={Math.random()} fieldAssigned={this.checkForAssignedField()} selectedUser={this.props.selectedUser} user={user} handleAddedUserPress={e => this.props.handleAddedUserPress(e)} deleteUser={this.props.deleteUser} isInSidebar={this.props.isInSidebar} />)
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