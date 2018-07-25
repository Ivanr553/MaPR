import * as React from 'react';

import {user} from '../../CreateDocumentValidation'
import Switch from '../../../Switch/Switch';

interface Props {
    selectedUser: user,
    handleSwitchToggle: (field: string) => void,
    assigned_user: user,
    handleAssignedUserToggle: (user: user) => void
}

class AddedUserPermissions extends React.Component<Props, any> {

    checkIfAssignedUser = (): boolean => {
        return this.props.assigned_user === this.props.selectedUser
    }

    render() {
        
        if(!!!this.props.selectedUser) {
            return <div className='AddedUserPermissions'></div>
        }

        return (
            <div className='AddedUserPermissions'>
                <div className='user-permissions-title'>Can Edit</div>
                    <Switch offInnerText={'Cannot Edit'} onInnerText={'Can Edit'} field={'is_allowed_edit'} handleSwitchToggle={this.props.handleSwitchToggle} initialToggle={this.props.selectedUser.is_allowed_edit}/>
                <div className='user-permissions-title'>Can Approve</div>
                    <Switch offInnerText={'Cannot Approve'} onInnerText={'Can Approve'} field={'is_allowed_approve'} handleSwitchToggle={this.props.handleSwitchToggle} initialToggle={this.props.selectedUser.is_allowed_approve}/>
                <div className='user-permissions-title'>Can Submit</div>
                    <Switch offInnerText={'Cannot Submit'} onInnerText={'Can Submit'} field={'is_allowed_submit'} handleSwitchToggle={this.props.handleSwitchToggle} initialToggle={this.props.selectedUser.is_allowed_submit}/>
                <div className='user-permissions-title'>Can Submit</div>
                    <Switch offInnerText={'Cannot Assign'} onInnerText={'Can Assign'} field={'is_allowed_assign'} handleSwitchToggle={this.props.handleSwitchToggle} initialToggle={this.props.selectedUser.is_allowed_assign}/>
                <div className='user-permissions-title'>Assigned To</div>
                    <Switch offInnerText={'Not Assigned'} onInnerText={'Assigned'} field={null} user={this.props.selectedUser} handleSwitchToggle={this.props.handleAssignedUserToggle} initialToggle={this.checkIfAssignedUser()}/>
            </div>
        );
    }
}

export default AddedUserPermissions;