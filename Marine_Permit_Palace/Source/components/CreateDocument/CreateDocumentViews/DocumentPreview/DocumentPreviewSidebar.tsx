import * as React from 'react';

interface Props {
    userList: Array<any>,
    showSidebar: boolean,
    getHideSidebar: (boolean) => void
}

class DocumentPreviewSidebar extends React.Component<Props, any> {

    constructor(props) {
        super(props)
        this.state = {

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
                    <div className='documents-header'>Selected Field</div>
                    <div> Show field here</div>
                    <div className='documents-header'>User List</div>
                    <div id='added-users-container-preview' className='added-users-container'>
                        {this.props.userList}
                    </div>
                </div>
        );
    }
}

export default DocumentPreviewSidebar;