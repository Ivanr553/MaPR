import * as React from 'react';

import AddedUser from '../SelectPermissions/AddedUser'
import AddedUserList from '../SelectPermissions/AddedUserList';

import {user, selectedField} from '../../CreateDocumentValidation'


interface Props {
    showSidebar: boolean,
    getHideSidebar: (boolean) => void,
    selectedField: selectedField,
    handleAddedUserPress: (e: React.MouseEvent) => void,
    deleteUser: (e: React.MouseEvent) => void,
    userList: Array<user>
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

        if(!!!this.props.selectedField) {
            return
        } else {

            let field_name: string = this.cleanUpFieldName(this.props.selectedField.field_name)

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
        console.log(this.props.selectedField)

        if(this.props.selectedField.assigned_to !== null) {
            return <AddedUser key={Math.random()} selectedField={this.props.selectedField} fieldAssigned={true} user={this.props.selectedField.assigned_to} handleAddedUserPress={e => this.props.handleAddedUserPress(e)} deleteUser={this.props.deleteUser} isInSidebar={true} />
        } else {
            return <div className='added-user' style={{cursor: 'default'}}>Select User</div>
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
                    <AddedUserList className='added-users-container-preview' selectedField={this.props.selectedField} userList={this.props.userList} handleAddedUserPress={this.props.handleAddedUserPress} deleteUser={this.props.deleteUser} isInSidebar={true} />
                </div>
        );
    }
}

export default DocumentPreviewSidebar;