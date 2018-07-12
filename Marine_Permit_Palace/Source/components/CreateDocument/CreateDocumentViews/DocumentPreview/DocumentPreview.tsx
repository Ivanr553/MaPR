import * as React from 'react';

import DocumentView from '../../../DocumentView/DocumentView'


interface Props {
    document_id: string,
    userList: Array<any>,
    getDocumentName(documentName: String): void,
    getDocumentPreviewComplete(documentPreviewComplete: boolean): void
}

 
class DocumentPreview extends React.Component<Props, any> {

    constructor(props) {
        super(props)
        this.state = {
            documentName: ''
        }

    }

    previewOnClickHandler = (e) => {
        console.log(e.target)
    }

    handleDocumentNameChange = (e) => {

        let documentName = this.state.documentName

        documentName = e.target.value

        this.setState({
            documentName: documentName
        }, () => {
            this.props.getDocumentName(this.state.documentName)
        })
    }

    //Sidebar Functions
    hideSidebar() {
        let sidebar = document.getElementById('document-view-sidebar')
        sidebar.classList.add('hide-sidebar')
        sidebar.classList.remove('show-sidebar')
    }

    showSidebar() {
        let sidebar = document.getElementById('document-view-sidebar')
        sidebar.classList.add('show-sidebar')
        sidebar.classList.remove('hide-sidebar')
    }

    getDocumentId = () => {
        this.setState({
            document_id: this.props.document_id
        });
    }

    giveDocumentPreviewComplete = () => {
        this.props.getDocumentPreviewComplete(true)
    }

    componentWillMount() {
        this.getDocumentId()
    }

    render() {
        return (
            <div id='DocumentPreview'>
                <div id='document-view-container'>
                    <div id='document-view-header'>
                        <input placeholder='Document Name' onChange={(e) => {this.handleDocumentNameChange(e)}} id='document-name-input' type="text"/>
                        <div id='save-button'>
                            Save File
                        </div>
                    </div>
                    <DocumentView document_id={this.state.document_id} view={'DocumentPreview'} previewOnClickHandler={this.previewOnClickHandler}/>
                </div>
                <div id='show-sidebar-icon-container' onClick={this.showSidebar}>
                    <img id='show-sidebar-icon' src="/images/left-arrow-1.png" alt=""/>
                </div>
                <div id='document-view-sidebar' className=''>
                    <div id='close-sidebar-icon' onClick={this.hideSidebar}>x</div>
                    <div className='documents-header'>Selected Users</div>
                    <div id='added-users-container-preview' className='added-users-container'>
                        {this.props.userList}
                    </div>
                </div>
            </div>
        );
    }
}

export default DocumentPreview;