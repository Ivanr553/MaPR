"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const s = require('./styling/style.sass');
const SelectPermissions_1 = require("./CreateDocumentViews/SelectPermissions/SelectPermissions");
const SelectDocument_1 = require("./CreateDocumentViews/SelectDocument/SelectDocument");
const DocumentPreview_1 = require("./CreateDocumentViews/DocumentPreview/DocumentPreview");
const CreateDocumentNavButton_1 = require("./CreateDocumentNavButton/CreateDocumentNavButton");
const services_1 = require("../../services/services");
//Main Class
class CreateDocument extends React.Component {
    constructor(props) {
        super(props);
        //Views
        this.handleSelectDocumentView = () => {
            this.setState({
                selectDocumentBoolean: true,
                selectPermissionsBoolean: false,
                documentPreviewBoolean: false
            });
        };
        this.handleSelectPermissionsView = () => {
            this.setState({
                selectDocumentBoolean: false,
                selectPermissionsBoolean: true,
                documentPreviewBoolean: false
            });
        };
        this.handleSelectPreviewView = () => {
            this.setState({
                selectDocumentBoolean: false,
                selectPermissionsBoolean: false,
                documentPreviewBoolean: true
            });
        };
        //State Management Functions
        //UserList Management
        this.addUser = () => {
            let userList;
            userList = this.state.userList;
            let user = {
                name: `Example User ${Math.random()}`,
                id: Math.random(),
                assigned_to: null
            };
            userList.push(user);
            let input = document.getElementById('user-search-bar');
            input.value = '';
            this.setState({
                userList: userList
            }, () => {
                if (this.state.userList.length > 0) {
                    this.setState({
                        selectPermissionsComplete: true
                    });
                }
            });
        };
        this.deleteUser = (e) => {
            let id = e.target.parentNode.id;
            let userList = this.state.userList;
            let assignedField;
            userList.forEach(user => {
                if (user.id.toString() === id.toString()) {
                    assignedField = user.assigned_to;
                    userList.splice(userList.indexOf(user), 1);
                }
            });
            this.removeAssignedUser(assignedField);
            this.setState({
                userList: userList
            }, () => {
                if (this.state.userList.length < 1) {
                    this.setState({
                        selectPermissionsComplete: false
                    });
                }
            });
        };
        this.removeAssignedUser = (assignedField) => {
            let document_meta = this.state.document_meta;
            document_meta[assignedField].assigned_to = null;
            this.setState({
                document_meta: document_meta
            });
        };
        this.assignUserToField = (e) => {
            let id = e.target.id;
            let userList = this.state.userList;
            let document_meta = this.state.document_meta;
            let user = userList.filter(user => user.id.toString() === id.toString())[0];
            if (user.assigned_to === null) {
                user.assigned_to = [];
            }
            if (!this.assignUserToFieldChecks(id)) {
                return;
            }
            user.assigned_to.push(this.state.currentSelectedFieldId);
            document_meta[this.state.currentSelectedFieldId].assigned_to = user;
            this.setState({
                userList: userList,
                document_meta: document_meta
            });
        };
        this.assignUserToFieldChecks = (id) => {
            let userList = this.state.userList;
            let document_meta = this.state.document_meta;
            let user = userList.filter(user => user.id.toString() === id.toString())[0];
            if (this.state.currentSelectedFieldId === undefined) {
                alert('Select field before assigning user');
                return false;
            }
            //Checking if user has already been assigned this field
            if (user.assigned_to.indexOf(this.state.currentSelectedFieldId) >= 0) {
                return false;
            }
            //Checking if a user has already been assigned to a field
            if (document_meta[this.state.currentSelectedFieldId].assigned_to !== null) {
                return false;
            }
            return true;
        };
        this.handleSelectedFieldId = (currentSelectedFieldId) => {
            this.setState({
                currentSelectedFieldId: currentSelectedFieldId
            });
        };
        this.getDocumentMeta = () => __awaiter(this, void 0, void 0, function* () {
            let promise = yield services_1.getDocumentPromise(this.state.document_id);
            let documentResponse = yield promise.promise;
            let document_meta = documentResponse.document_meta;
            this.setState({
                document_meta: document_meta
            });
        });
        //State Management
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
            });
        };
        this.getDocumentId = (document_id) => {
            this.setState({
                document_id: document_id
            }, () => {
                this.getDocumentMeta();
            });
        };
        this.giveDocumentId = () => {
            return this.state.document_id;
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
            selectDocumentShow: true,
            documentPreviewShow: false,
            selectPermissionsBoolean: false,
            document_meta: Array
        };
    }
    componentDidUpdate() {
    }
    componentWillMount() {
        this.handleSelectDocumentView();
    }
    render() {
        if (this.state.selectDocumentBoolean) {
            return (React.createElement("div", { id: 'CreateDocument' },
                React.createElement("div", { id: 'create-document-nav-bar' },
                    React.createElement(CreateDocumentNavButton_1.default, { complete: this.state.selectDocumentComplete, id: 'create-document-nav-bar-item-document', innerText: 'Select Document', onClickHandler: this.handleSelectDocumentView, disable: false, selected: this.state.selectDocumentBoolean }),
                    React.createElement(CreateDocumentNavButton_1.default, { complete: this.state.selectPermissionsComplete, id: 'create-permissions-nav-bar-item-document', innerText: 'Create Permissions', onClickHandler: this.handleSelectPermissionsView, disable: false, selected: this.state.selectPermissionsBoolean }),
                    React.createElement(CreateDocumentNavButton_1.default, { complete: false, id: 'document-preview-nav-bar-item-document', innerText: 'Preview', onClickHandler: this.handleSelectPreviewView, disable: this.disableDocumentPreview(), selected: this.state.documentPreviewBoolean })),
                React.createElement("div", { className: 'container' },
                    React.createElement(SelectDocument_1.default, { selectDocumentBoolean: this.state.selectDocumentBoolean, documents: this.props.documentResults, getDocumentId: this.getDocumentId, getSelectDocumentComplete: this.getSelectDocumentComplete }))));
        }
        if (this.state.selectPermissionsBoolean) {
            return (React.createElement("div", { id: 'CreateDocument' },
                React.createElement("div", { id: 'create-document-nav-bar' },
                    React.createElement(CreateDocumentNavButton_1.default, { complete: this.state.selectDocumentComplete, id: 'create-document-nav-bar-item-document', innerText: 'Select Document', onClickHandler: this.handleSelectDocumentView, disable: false, selected: this.state.selectDocumentBoolean }),
                    React.createElement(CreateDocumentNavButton_1.default, { complete: this.state.selectPermissionsComplete, id: 'create-permissions-nav-bar-item-document', innerText: 'Create Permissions', onClickHandler: this.handleSelectPermissionsView, disable: false, selected: this.state.selectPermissionsBoolean }),
                    React.createElement(CreateDocumentNavButton_1.default, { complete: false, id: 'document-preview-nav-bar-item-document', innerText: 'Preview', onClickHandler: this.handleSelectPreviewView, disable: this.disableDocumentPreview(), selected: this.state.documentPreviewBoolean })),
                React.createElement("div", { className: 'container' },
                    React.createElement(SelectPermissions_1.default, { currentSelectedFieldId: this.state.currentSelectedFieldId, assignUserToField: this.assignUserToField, selectPermissionsBoolean: this.state.selectPermissionsBoolean, addUser: this.addUser, deleteUser: this.deleteUser, userList: this.state.userList, getSelectPermissionsComplete: this.getSelectPermissionsComplete }))));
        }
        if (this.state.documentPreviewBoolean) {
            return (React.createElement("div", { id: 'CreateDocument' },
                React.createElement("div", { id: 'create-document-nav-bar' },
                    React.createElement(CreateDocumentNavButton_1.default, { complete: this.state.selectDocumentComplete, id: 'create-document-nav-bar-item-document', innerText: 'Select Document', onClickHandler: this.handleSelectDocumentView, disable: false, selected: this.state.selectDocumentBoolean }),
                    React.createElement(CreateDocumentNavButton_1.default, { complete: this.state.selectPermissionsComplete, id: 'create-permissions-nav-bar-item-document', innerText: 'Create Permissions', onClickHandler: this.handleSelectPermissionsView, disable: false, selected: this.state.selectPermissionsBoolean }),
                    React.createElement(CreateDocumentNavButton_1.default, { complete: false, id: 'document-preview-nav-bar-item-document', innerText: 'Preview', onClickHandler: this.handleSelectPreviewView, disable: this.disableDocumentPreview(), selected: this.state.documentPreviewBoolean })),
                React.createElement("div", { className: 'container' },
                    React.createElement(DocumentPreview_1.default, { currentSelectedField: this.state.document_meta[this.state.currentSelectedFieldId], handleSelectedFieldId: this.handleSelectedFieldId, currentSelectedFieldId: this.state.currentSelectedFieldId, deleteUser: this.deleteUser, assignUserToField: this.assignUserToField, documentPreviewBoolean: this.state.documentPreviewBoolean, userList: this.state.userList, document_id: this.state.document_id, document_meta: this.state.document_meta, getDocumentName: this.getDocumentName, getDocumentPreviewComplete: this.getDocumentPreviewComplete }))));
        }
    }
}
exports.default = CreateDocument;
//# sourceMappingURL=CreateDocument.js.map