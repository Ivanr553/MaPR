import * as React from 'react';

import {user} from '../../CreateDocumentValidation'

interface Props {
    user: user,
    currentSelectedFieldId: number,
    assignUserToField: (e: React.MouseEvent) => void,
    removeAssignedUser: (user: user, removeOptions: null | number) => void,
    deleteUser: (e: React.MouseEvent) => void,
    isInSidebar: boolean,
    fieldAssigned: boolean
}


class AddedUser extends React.Component<Props, any> {

    getStyle = () => {

        if(this.props.isInSidebar) {
            
            let style = {
                cursor: 
                    ((this.props.user.assigned_to !== null && this.props.user.assigned_to.indexOf(this.props.currentSelectedFieldId) >= 0) || this.props.fieldAssigned) 
                        ? 'default' : 'pointer',
                backgroundColor: 
                    (this.props.user.assigned_to !== null && this.props.user.assigned_to.indexOf(this.props.currentSelectedFieldId) >= 0) 
                        ? 'lightgrey' : ''
            }

            return style
        }
        if(!this.props.isInSidebar) {

            let style = {
                backgroundColor: 
                    (this.props.user.assigned_to !== null && this.props.user.assigned_to.indexOf(this.props.currentSelectedFieldId) >= 0) 
                        ? 'lightgrey' : ''
            }

            return style
        }
    }

    render() {

        if(this.props.isInSidebar) {
            return (
                <div style={this.getStyle()} className='added-user' id={this.props.user.dod_id.toString()}>
                    <div onClick={(e) => this.props.assignUserToField(e)}>
                        {this.props.user.dod_id}
                    </div>
                    <div onClick={(e) => this.props.assignUserToField(e)}>
                        {this.props.user.name}
                    </div>
                </div>
            )
        }

        if(!this.props.isInSidebar) {
            return (
                <div style={this.getStyle()} className='added-user' id={this.props.user.dod_id.toString()}>
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