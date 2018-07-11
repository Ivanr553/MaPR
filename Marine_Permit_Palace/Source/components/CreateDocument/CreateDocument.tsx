import * as React from 'react'
import * as $ from 'jquery'
import PDF from 'react-pdf-js'

const s = require('./styling/style.sass')

import DocumentList from '../DocumentList/DocumentList'
import DocumentView from '../DocumentView/DocumentView'
import SelectPermissions from './CreateDocumentViews/SelectPermissions/SelectPermissions';
import SelectDocument from './CreateDocumentViews/SelectDocument/SelectDocument';
import DocumentPreview from './CreateDocumentViews/DocumentPreview/DocumentPreview';

export default class CreateDocument extends React.Component<any, any> {

    constructor(props) {
        super(props)
        this.state = {
            documentResults: this.props.documentResults,
            currentView: '',
            view: '',
            documentList: [],
            document_id: '',
            documentName: '',
            nextButton: '',
            readyForNext: false,
            userList: [],
            userObjects: []
        }
    }

    //Views
    handleSelectDocumentView = () => {

        let currentView = <SelectDocument documents={this.props.documentResults} getDocumentId={this.getDocumentId} getSelectDocumentComplete={this.getSelectDocumentComplete} />
        this.setState({
            currentView: currentView,
            view: 'SelectDocument'
        })
    }

    handleSelectPermissionsView = () => {
        let currentView = <SelectPermissions getUserList={this.getUserList} getSelectPermissionsComplete={this.getSelectPermissionsComplete} />
        this.setState({
            currentView: currentView,
            view: 'SelectPermissions'
        }, () => {

        })
    }

    handleSelectPreviewView = () => {

        let currentView = <DocumentPreview userList={this.state.userList} document_id={this.state.document_id} getDocumentName={this.getDocumentName} getDocumentPreviewComplete={this.getDocumentPreviewComplete}/>
        this.setState({
            currentView: currentView,
            view: 'Preview'
        })

    }

    //State Management Functions

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

    componentWillMount() {
        this.handleSelectDocumentView()
    }

    render() {

        return(
            <div id='CreateDocument'>
                <div id='create-document-nav-bar'>
                    <div id='create-document-nav-bar-item-document' className='create-document-nav-bar-item' onClick={this.handleSelectDocumentView}>
                        Select Document
                    </div>
                    <div className='create-document-nav-bar-item' onClick={this.handleSelectPermissionsView}>
                        Create Permissions
                    </div>
                    <div className='create-document-nav-bar-item' onClick={this.handleSelectPreviewView}>
                        Preview
                    </div>
                </div>
                <div className='container'>
                    {this.state.currentView}
                </div>
            </div>
        )

    }


}