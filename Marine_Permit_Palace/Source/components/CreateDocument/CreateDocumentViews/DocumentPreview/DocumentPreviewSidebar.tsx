import * as React from 'react';

import AddedUser from '../SelectPermissions/AddedUser'
import AddedUserList from '../SelectPermissions/AddedUserList';

import {user, currentSelectedField} from '../../CreateDocumentValidation'


interface Props {
    showSidebar: boolean,
    getHideSidebar: (boolean) => void,
    currentSelectedField: currentSelectedField,
    handleAddedUserPress: (e: React.MouseEvent) => void,
    deleteUser: (e: React.MouseEvent) => void,
    userList: Array<user>,
    currentSelectedFieldId: number,
    removeAssignedUser: (user: user, removeOption: null | number) => void
}

class DocumentPreviewSidebar extends React.Component<Props, any> {

    constructor(props) {
        super(props)
        this.state = {

        }
    }


    cleanUpFieldName = (field_name: string): string => {
        while(field_name.indexOf('_') > -1) {
            field_name = field_name.replace('_', ' ')
        }
        return field_name.charAt(0).toUpperCase() + field_name.slice(1)
    }

    showSelectedField = () => {
        if(this.props.currentSelectedField === undefined) {
            return
        }
         else {

            let field_name: string = this.cleanUpFieldName(this.props.currentSelectedField.field_name)

            return (
                <div>
                    <div className='preview-documents-header'>{field_name}</div>
                    <div className='selected-field-display-container'> 
                        {this.showSelectedFieldContent()}
                    </div>
                </div>
            )
         }
    }

    showSelectedFieldContent = () => {

        if(this.props.currentSelectedField.assigned_to !== null) {
            return <AddedUser removeAssignedUser={this.props.removeAssignedUser} key={Math.random()} fieldAssigned={true} currentSelectedFieldId={this.props.currentSelectedFieldId} user={this.props.currentSelectedField.assigned_to} handleAddedUserPress={e => this.props.handleAddedUserPress(e)} deleteUser={this.props.deleteUser} isInSidebar={true} />
        } else {
            return null
        }

    }

    //Sidebar Functions
    hideSidebar = (): void => {
        let sidebar = document.getElementById('document-view-sidebar')
        sidebar.classList.add('hide-sidebar')
        sidebar.classList.remove('show-sidebar')
        this.giveHideSidebar()
    }

    showSidebar = (): void => {
        let sidebar = document.getElementById('document-view-sidebar')
        sidebar.classList.add('show-sidebar')
        sidebar.classList.remove('hide-sidebar')
    }

    giveHideSidebar = (): void => {
        this.props.getHideSidebar(false)
    }

    componentDidUpdate() {
        if(this.props.showSidebar) {
            this.showSidebar()
        }
    }

    render() {
        return (
            <div id='document-view-sidebar' className=''>
                    <div id='close-sidebar-icon' onClick={this.hideSidebar}>x</div>
                    {this.showSelectedField()}
                    <div className='preview-documents-header'>User List</div>
                    <AddedUserList removeAssignedUser={this.props.removeAssignedUser} className='added-users-container-preview' currentSelectedFieldId={this.props.currentSelectedFieldId} userList={this.props.userList} handleAddedUserPress={this.props.handleAddedUserPress} deleteUser={this.props.deleteUser} isInSidebar={true} />
                </div>
        );
    }
}

export default DocumentPreviewSidebar;