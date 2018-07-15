import * as React from 'react';

import DocumentView from '../../../DocumentView/DocumentView'
import { EventHandler } from 'react';
import DocumentPreviewSidebar from './DocumentPreviewSidebar';


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
            documentName: String,
            currentSelectedField: String
        }

    }

    previewOnClickHandler = (e): void => {

        let id = e.target.id

        //Clearing previously selected field
        if(this.state.currentSelectedField != '') {
            document.getElementById(this.state.currentSelectedField).classList.remove('selectedField')
        }

        document.getElementById(this.state.currentSelectedField).classList.add('selectedField')


    }

    handleDocumentNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        let documentName = this.state.documentName

        documentName = e.target.value

        this.setState({
            documentName: documentName
        }, () => {
            this.props.getDocumentName(this.state.documentName)
        })
    }

    showSidebar = () => {
       this.setState({
           showSidebar: true
       })
    }

    getHideSidebar = (showSidebar): void => {
        this.setState({
            showSidebar: showSidebar
        })
    }
 

    //State management methods
    getDocumentId = (): void => {
        this.setState({
            document_id: this.props.document_id
        });
    }

    giveDocumentPreviewComplete = (): void => {
        this.props.getDocumentPreviewComplete(true)
    }


    //React lifecycle methods
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
                <DocumentPreviewSidebar showSidebar={this.state.showSidebar} userList={this.state.userList} getHideSidebar={this.getHideSidebar} />
            </div>
        );
    }
}

export default DocumentPreview;