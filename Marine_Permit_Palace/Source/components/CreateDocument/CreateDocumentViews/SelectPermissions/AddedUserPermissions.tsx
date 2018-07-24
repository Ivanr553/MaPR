import * as React from 'react';

import {user} from '../../CreateDocumentValidation'
import Switch from '../../../Switch/Switch';

interface Props {
    user: user,
    handleSwitchToggle: (field: string) => void
}

class AddedUserPermissions extends React.Component<Props, any> {
    render() {
        
        if(this.props.user === undefined) {
            console.log('no user')
            return <div className='AddedUserPermissions'></div>
        }

        return (
            <div className='AddedUserPermissions'>
                <h1>User</h1>
                <h2>{this.props.user.name}</h2>
                <h1>Dod Id</h1>
                <h2>{this.props.user.dod_id}</h2>
                <h1>Can Edit</h1>
                    <Switch offInnerText={'Cannot Edit'} onInnerText={'Can Edit'} field={'is_allowed_edit'} handleSwitchToggle={this.props.handleSwitchToggle} initialToggle={this.props.user.is_allowed_edit}/>
                <h1>Can Approve</h1>
                    <Switch offInnerText={'Cannot Approve'} onInnerText={'Can Approve'} field={'is_allowed_approve'} handleSwitchToggle={this.props.handleSwitchToggle} initialToggle={this.props.user.is_allowed_approve}/>
                <h1>Can Submit</h1>
                    <Switch offInnerText={'Cannot Submit'} onInnerText={'Can Submit'} field={'is_allowed_submit'} handleSwitchToggle={this.props.handleSwitchToggle} initialToggle={this.props.user.is_allowed_submit}/>
                    <h1>Can Submit</h1>
                    <Switch offInnerText={'Cannot Assign'} onInnerText={'Can Assign'} field={'is_allowed_assign'} handleSwitchToggle={this.props.handleSwitchToggle} initialToggle={this.props.user.is_allowed_assign}/>
            </div>
        );
    }
}

export default AddedUserPermissions;