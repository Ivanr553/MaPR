import * as React from 'react';
import AddedUserList from '../SelectPermissions/AddedUserList';

interface Props {
    showSidebar: boolean,
    getHideSidebar: (boolean) => void,
    currentSelectedField: {
        user: {
            name: string,
            id: number
        },
        field_name: string
    },
    assignUserToField: (e: React.MouseEvent) => void,
    deleteUser: (e: React.MouseEvent) => void,
    userList: Array<{
        name: string,
        id: number,
        assigned_to: null | number
    }>
}

class DocumentPreviewSidebar extends React.Component<Props, any> {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    showSelectedField = () => {
        if(this.props.currentSelectedField === undefined) {
            return
        }
         else {
            return this.props.currentSelectedField.field_name
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
                    <div className='preview-documents-header'>Selected Field</div>
                    <div className='selected-field-display-container'> 
                        Currently Selected Field: {this.showSelectedField()}
                    </div>
                    <div className='preview-documents-header'>User List</div>
                    <div id='added-users-container-preview'>
                        <AddedUserList userList={this.props.userList} assignUserToField={this.props.assignUserToField} deleteUser={this.props.deleteUser} isInSidebar={true} />
                    </div>
                </div>
        );
    }
}

export default DocumentPreviewSidebar;