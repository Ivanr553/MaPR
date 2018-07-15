"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const s = require('./styling/style.sass');
const SelectPermissions_1 = require("./CreateDocumentViews/SelectPermissions/SelectPermissions");
const SelectDocument_1 = require("./CreateDocumentViews/SelectDocument/SelectDocument");
const DocumentPreview_1 = require("./CreateDocumentViews/DocumentPreview/DocumentPreview");
const CreateDocumentNavButton_1 = require("./CreateDocumentNavButton/CreateDocumentNavButton");
//Main Class
class CreateDocument extends React.Component {
    constructor(props) {
        super(props);
        //Views
        this.handleSelectDocumentView = () => {
            let currentView = React.createElement(SelectDocument_1.default, { documents: this.props.documentResults, getDocumentId: this.getDocumentId, getSelectDocumentComplete: this.getSelectDocumentComplete });
            this.setState({
                currentView: currentView,
                view: 'SelectDocument',
                selectDocumentBoolean: true,
                selectPermissionsBoolean: false,
                documentPreviewBoolean: false
            });
        };
        this.handleSelectPermissionsView = () => {
            let currentView = React.createElement(SelectPermissions_1.default, { getUserList: this.getUserList, getSelectPermissionsComplete: this.getSelectPermissionsComplete });
            this.setState({
                currentView: currentView,
                view: 'SelectPermissions',
                selectDocumentBoolean: false,
                selectPermissionsBoolean: true,
                documentPreviewBoolean: false
            }, () => {
            });
        };
        this.handleSelectPreviewView = () => {
            let currentView = React.createElement(DocumentPreview_1.default, { userList: this.state.userList, document_id: this.state.document_id, getDocumentName: this.getDocumentName, getDocumentPreviewComplete: this.getDocumentPreviewComplete });
            this.setState({
                currentView: currentView,
                view: 'Preview',
                selectDocumentBoolean: false,
                selectPermissionsBoolean: false,
                documentPreviewBoolean: true
            });
        };
        //State Management Functions
        this.disableDocumentPreview = () => {
            if (this.state.selectDocumentComplete && this.state.selectPermissionsComplete) {
                return false;
            }
            else {
                return true;
            }
        };
        this.getDocumentName = (documentName) => {
            this.setState({
                documentName: documentName
            }, () => {
                console.log(this.state.documentName);
            });
        };
        this.getUserList = (userList) => {
            this.setState({
                userList: userList
            });
        };
        this.getDocumentId = (document_id) => {
            this.setState({
                document_id: document_id
            });
        };
        this.getSelectDocumentComplete = (selectDocumentComplete) => {
            this.setState({
                selectDocumentComplete: selectDocumentComplete
            });
        };
        this.getSelectPermissionsComplete = (selectPermissionsComplete) => {
            this.setState({
                selectPermissionsComplete: selectPermissionsComplete
            });
        };
        this.getDocumentPreviewComplete = (documentPreviewComplete) => {
            this.setState({
                documentPreviewComplete: documentPreviewComplete
            });
        };
        this.state = {
            currentView: '',
            view: '',
            document_id: '',
            documentName: '',
            userList: [],
            userObjects: []
        };
    }
    componentDidUpdate() {
    }
    componentWillMount() {
        this.handleSelectDocumentView();
    }
    render() {
        return (React.createElement("div", { id: 'CreateDocument' },
            React.createElement("div", { id: 'create-document-nav-bar' },
                React.createElement(CreateDocumentNavButton_1.default, { complete: this.state.selectDocumentComplete, id: 'create-document-nav-bar-item-document', innerText: 'Select Document', onClickHandler: this.handleSelectDocumentView, disable: false, selected: this.state.selectDocumentBoolean }),
                React.createElement(CreateDocumentNavButton_1.default, { complete: this.state.selectPermissionsComplete, id: 'create-permissions-nav-bar-item-document', innerText: 'Create Permissions', onClickHandler: this.handleSelectPermissionsView, disable: false, selected: this.state.selectPermissionsBoolean }),
                React.createElement(CreateDocumentNavButton_1.default, { complete: false, id: 'document-preview-nav-bar-item-document', innerText: 'Preview', onClickHandler: this.handleSelectPreviewView, disable: this.disableDocumentPreview(), selected: this.state.documentPreviewBoolean })),
            React.createElement("div", { className: 'container' }, this.state.currentView)));
    }
}
exports.default = CreateDocument;
//# sourceMappingURL=CreateDocument.js.map