import * as React from 'react';
import AddedUser from './AddedUser';

interface Props {
    userList: Array<{
        id: number,
        name: string,
        assigned_to: null | number
    }>,
    assignUserToField: (e: React.MouseEvent) => void,
    deleteUser: (e: React.MouseEvent) => void,
    isInSidebar: boolean
}

class AddedUserList extends React.Component<Props, any> {

    renderAddedUsers(): Array<JSX.Element> {

        let userList = this.props.userList
        let userElementList = []

        userList.forEach( user => {
            userElementList.push(<AddedUser key={Math.random()} user={user} assignUserToField={e => this.props.assignUserToField(e)} deleteUser={this.props.deleteUser} isInSidebar={this.props.isInSidebar} />)
        })

        return userElementList

    }

    render() {
        return (
            <div className='AddedUserList added-users-container'>
                {this.renderAddedUsers()}
            </div>
        );
    }
}

export default AddedUserList;