import * as React from 'react'
import * as $ from 'jquery'
import PDF from 'react-pdf-js'

const s = require('./styling/style.sass')

import SelectPermissions from './CreateDocumentViews/SelectPermissions/SelectPermissions';
import SelectDocument from './CreateDocumentViews/SelectDocument/SelectDocument';
import DocumentPreview from './CreateDocumentViews/DocumentPreview/DocumentPreview';
import CreateDocumentNavButton from './CreateDocumentNavButton/CreateDocumentNavButton'

//Main Class
export default class CreateDocument extends React.Component<any, any> {

    constructor(props) {
        super(props)
        this.state = {
            currentView: '',
            view: '',
            document_id: '',
            documentName: '',
            userList: [],
            userObjects: []
        }
    }

    //Views
    handleSelectDocumentView = (): void => {

        let currentView = <SelectDocument documents={this.props.documentResults} getDocumentId={this.getDocumentId} getSelectDocumentComplete={this.getSelectDocumentComplete} />
        this.setState({
            currentView: currentView,
            view: 'SelectDocument',
            selectDocumentBoolean: true,
            selectPermissionsBoolean: false,
            documentPreviewBoolean: false
        })
    }

    handleSelectPermissionsView = (): void => {
        let currentView = <SelectPermissions getUserList={this.getUserList} getSelectPermissionsComplete={this.getSelectPermissionsComplete} />
        this.setState({
            currentView: currentView,
            view: 'SelectPermissions',
            selectDocumentBoolean: false,
            selectPermissionsBoolean: true,
            documentPreviewBoolean: false
        }, () => {

        })
    }

    handleSelectPreviewView = (): void => {

        let currentView = <DocumentPreview userList={this.state.userList} document_id={this.state.document_id} getDocumentName={this.getDocumentName} getDocumentPreviewComplete={this.getDocumentPreviewComplete}/>
        this.setState({
            currentView: currentView,
            view: 'Preview',
            selectDocumentBoolean: false,
            selectPermissionsBoolean: false,
            documentPreviewBoolean: true
        })

    }

    //State Management Functions

    disableDocumentPreview = () => {
        if(this.state.selectDocumentComplete && this.state.selectPermissionsComplete) {
            return false
        } else {
            return true
        }
    }

    getDocumentName = (documentName) => {
        this.setState({
            documentName: documentName
        }, () => {
            console.log(this.state.documentName)
        });
    }

    getUserList = (userList) => {
        this.setState({
            userList: userList
        })
    }

    getDocumentId = (document_id) => {
        this.setState({
            document_id: document_id
        })
    }

    getSelectDocumentComplete = (selectDocumentComplete) => {
        this.setState({
            selectDocumentComplete: selectDocumentComplete
        })
    }

    getSelectPermissionsComplete = (selectPermissionsComplete) => {
        this.setState({
            selectPermissionsComplete: selectPermissionsComplete
        })
    }

    getDocumentPreviewComplete = (documentPreviewComplete) => {
        this.setState({
            documentPreviewComplete: documentPreviewComplete
        })
    }

    componentDidUpdate() {
        
    }

    componentWillMount() {
        this.handleSelectDocumentView()
    }

    render() {

        return(
            <div id='CreateDocument'>
                <div id='create-document-nav-bar'>
                    <CreateDocumentNavButton complete={this.state.selectDocumentComplete} id={'create-document-nav-bar-item-document'} innerText={'Select Document'} onClickHandler={ this.handleSelectDocumentView} disable={false} selected={this.state.selectDocumentBoolean}/>
                    <CreateDocumentNavButton complete={this.state.selectPermissionsComplete} id={'create-permissions-nav-bar-item-document'} innerText={'Create Permissions'} onClickHandler={this.handleSelectPermissionsView} disable={false} selected={this.state.selectPermissionsBoolean}/>
                    <CreateDocumentNavButton complete={false} id={'document-preview-nav-bar-item-document'} innerText={'Preview'} onClickHandler={this.handleSelectPreviewView} disable={this.disableDocumentPreview()} selected={this.state.documentPreviewBoolean}/>
                </div>
                <div className='container'>
                    {this.state.currentView}
                </div>
            </div>
        )

    }


}