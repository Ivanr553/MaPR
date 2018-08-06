import * as React from 'react';

import {user, selectedField} from '../../CreateDocumentValidation'

interface Props {
    user: user,
    selectedField: selectedField,
    handleAddedUserPress: (e: React.MouseEvent) => void,
    deleteUser: (e: React.MouseEvent) => void,
    isInSidebar: boolean,
    fieldAssigned: boolean,
    selectedUser?: user,
    page?: number
}


class AddedUser extends React.Component<Props, any> {

    getStyle = () => {

        if(this.props.isInSidebar) {
            
            let style = {
                cursor: 'pointer',
                backgroundColor: 
                    (!!this.props.user.assigned_to && this.props.user.assigned_to.indexOf(this.props.selectedField) >= 0) 
                        ? 'lightgrey' : ''
            }

            return style
        }
        if(!this.props.isInSidebar) {

            let cursor = 'pointer'
            let backgroundColor = ''

            if(!!this.props.selectedUser) {
                cursor = this.props.user === this.props.selectedUser ? 'default' : 'pointer'
                backgroundColor = this.props.user === this.props.selectedUser ? 'lightgrey' : ''
            }

            let style = {
                backgroundColor: backgroundColor,
                cursor: cursor
            }

            return style
        }
    }

    render() {

        if(this.props.isInSidebar) {
            return (
                <div style={this.getStyle()} className='added-user' id={this.props.user.dod_id.toString()} onClick={(e) => this.props.handleAddedUserPress(e)}>
                    <div>
                        {this.props.user.dod_id}
                    </div>
                    <div>
                        {this.props.user.name}
                    </div>
                </div>
            )
        }

        if(!this.props.isInSidebar) {
            return (
                <div style={this.getStyle()} className='added-user' id={this.props.user.dod_id.toString()} onClick={e => this.props.handleAddedUserPress(e)}>
                    <div>
                        {this.props.user.dod_id}
                    </div>
                    <div>
                        {this.props.user.name !== null ? this.props.user.name : ' '}
                    </div>
                    <div className='added-user-delete-icon' onClick={(e) => {this.props.deleteUser(e)}}>x</div>
                </div>
            )
        }    
    }
}

export default AddedUser;