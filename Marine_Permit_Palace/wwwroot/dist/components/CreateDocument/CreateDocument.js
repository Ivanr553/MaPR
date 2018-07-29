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
        this.addUser = (user) => {
            let userList;
            userList = this.state.userList.slice();
            let newUser = {
                dod_id: parseInt(user.dod_id),
                name: user.first_name,
                assigned_to: [],
                is_allowed_approve: false,
                is_allowed_edit: true,
                is_allowed_submit: false,
                is_allowed_assign: false
            };
            if (!this.validateDuplicateUsers(newUser.dod_id)) {
                return;
            }
            userList.push(newUser);
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
        this.validateDuplicateUsers = (dod_id) => {
            let userList = this.state.userList.slice();
            const verifyDuplicate = userList.map(user => {
                return user.dod_id === dod_id;
            });
            if (verifyDuplicate.indexOf(true) >= 0) {
                return false;
            }
            return true;
        };
        this.deleteUser = (e) => {
            let elementId = e.target.parentNode.id;
            let userList = this.state.userList;
            let assignedField;
            let editedUser;
            userList.forEach(user => {
                if (user.dod_id.toString() === elementId.toString()) {
                    user = user;
                    userList.splice(userList.indexOf(user), 1);
                }
            });
            // this.removeAssignedUser(editedUser, null)
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
        this.removeAssignedUser = (user, removeOption) => {
            let document_meta = this.state.document_meta;
            let userList = this.state.userList;
            if (user.assigned_to !== null && user.assigned_to.length > 0) {
                if (removeOption === null) {
                    user.assigned_to.forEach(field => {
                        document_meta[field].assigned_to = null;
                    });
                }
                else {
                    document_meta[removeOption].assigned_to = null;
                    user.assigned_to = user.assigned_to.filter((item) => { return item !== removeOption; });
                }
            }
            userList[userList.indexOf(user)] = user;
            this.setState({
                document_meta: document_meta,
                userList: userList
            });
        };
        this.handleAddedUserPress = (e) => {
            let target = e.target;
            while (target.id === '') {
                target = target.parentElement;
            }
            let elementId = parseInt(target.id);
            let userList = this.state.userList.slice();
            let user = userList.filter(user => user.dod_id === elementId)[0];
            if (!this.assignUserToFieldChecks(elementId)) {
                return;
            }
            this.assignUserToField(user);
        };
        this.assignUserToField = (user) => {
            let userList = this.state.userList.slice();
            let document_meta = this.state.document_meta;
            user.assigned_to.push(parseInt(this.state.currentSelectedFieldId));
            document_meta[this.state.currentSelectedFieldId].assigned_to = user;
            this.setState({
                userList: userList,
                document_meta: document_meta
            });
        };
        this.assignUserToFieldChecks = (dod_id) => {
            let userList = this.state.userList;
            let document_meta = this.state.document_meta;
            let user = userList.filter(user => user.dod_id === dod_id)[0];
            if (this.state.currentSelectedFieldId === undefined) {
                alert('Select field before assigning user');
                return false;
            }
            //Checking if user has already been assigned this field
            if (user.assigned_to.indexOf(parseInt(this.state.currentSelectedFieldId)) >= 0) {
                this.removeAssignedUser(user, parseInt(this.state.currentSelectedFieldId));
                return false;
            }
            //Checking if a user has already been assigned to a field
            if (document_meta[this.state.currentSelectedFieldId].assigned_to !== null) {
                return false;
            }
            return true;
        };
        this.handleToggleAssignedUser = (user) => {
            if (user === this.state.assigned_user) {
                this.setState({
                    assigned_user: null
                });
                return;
            }
            this.setState({
                assigned_user: user
            });
        };
        this.handleSelectedFieldId = (currentSelectedFieldId) => {
            this.setState({
                currentSelectedFieldId: currentSelectedFieldId
            });
        };
        this.getDocumentMeta = () => __awaiter(this, void 0, void 0, function* () {
            let promise = yield services_1.getTemplateDocumentPromise(this.state.document_id);
            let request = yield promise.promise;
            let documentResponse = yield request.json();
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
        this.getDocumentName = (document_name) => {
            this.setState({
                document_name: document_name
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
        this.state = this.props.createDocumentState;
    }
    componentDidUpdate() {
        this.props.getCreateDocumentState(this.state);
    }
    componentDidMount() {
        this.setState({
            state: this.props.createDocumentState
        });
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
                    React.createElement(SelectDocument_1.default, { selectDocumentBoolean: this.state.selectDocumentBoolean, documents: this.props.documentResults, getDocumentId: this.getDocumentId, getSelectDocumentComplete: this.getSelectDocumentComplete, document_id: this.state.document_id }))));
        }
        if (this.state.selectPermissionsBoolean) {
            return (React.createElement("div", { id: 'CreateDocument' },
                React.createElement("div", { id: 'create-document-nav-bar' },
                    React.createElement(CreateDocumentNavButton_1.default, { complete: this.state.selectDocumentComplete, id: 'create-document-nav-bar-item-document', innerText: 'Select Document', onClickHandler: this.handleSelectDocumentView, disable: false, selected: this.state.selectDocumentBoolean }),
                    React.createElement(CreateDocumentNavButton_1.default, { complete: this.state.selectPermissionsComplete, id: 'create-permissions-nav-bar-item-document', innerText: 'Create Permissions', onClickHandler: this.handleSelectPermissionsView, disable: false, selected: this.state.selectPermissionsBoolean }),
                    React.createElement(CreateDocumentNavButton_1.default, { complete: false, id: 'document-preview-nav-bar-item-document', innerText: 'Preview', onClickHandler: this.handleSelectPreviewView, disable: this.disableDocumentPreview(), selected: this.state.documentPreviewBoolean })),
                React.createElement("div", { className: 'container' },
                    React.createElement(SelectPermissions_1.default, { assigned_user: this.state.assigned_user, handleToggleAssignedUser: this.handleToggleAssignedUser, removeAssignedUser: this.removeAssignedUser, currentSelectedFieldId: this.state.currentSelectedFieldId, handleAddedUserPress: this.handleAddedUserPress, selectPermissionsBoolean: this.state.selectPermissionsBoolean, addUser: this.addUser, deleteUser: this.deleteUser, userList: this.state.userList, getSelectPermissionsComplete: this.getSelectPermissionsComplete }))));
        }
        if (this.state.documentPreviewBoolean) {
            return (React.createElement("div", { id: 'CreateDocument' },
                React.createElement("div", { id: 'create-document-nav-bar' },
                    React.createElement(CreateDocumentNavButton_1.default, { complete: this.state.selectDocumentComplete, id: 'create-document-nav-bar-item-document', innerText: 'Select Document', onClickHandler: this.handleSelectDocumentView, disable: false, selected: this.state.selectDocumentBoolean }),
                    React.createElement(CreateDocumentNavButton_1.default, { complete: this.state.selectPermissionsComplete, id: 'create-permissions-nav-bar-item-document', innerText: 'Create Permissions', onClickHandler: this.handleSelectPermissionsView, disable: false, selected: this.state.selectPermissionsBoolean }),
                    React.createElement(CreateDocumentNavButton_1.default, { complete: false, id: 'document-preview-nav-bar-item-document', innerText: 'Preview', onClickHandler: this.handleSelectPreviewView, disable: this.disableDocumentPreview(), selected: this.state.documentPreviewBoolean })),
                React.createElement("div", { className: 'container' },
                    React.createElement(DocumentPreview_1.default, { assigned_user: this.state.assigned_user, removeAssignedUser: this.removeAssignedUser, currentSelectedField: this.state.document_meta[this.state.currentSelectedFieldId], handleSelectedFieldId: this.handleSelectedFieldId, currentSelectedFieldId: this.state.currentSelectedFieldId, deleteUser: this.deleteUser, handleAddedUserPress: this.handleAddedUserPress, documentPreviewBoolean: this.state.documentPreviewBoolean, userList: this.state.userList, document_id: this.state.document_id, document_meta: this.state.document_meta, getDocumentName: this.getDocumentName, getDocumentPreviewComplete: this.getDocumentPreviewComplete }))));
        }
    }
}
exports.default = CreateDocument;
//# sourceMappingURL=CreateDocument.js.map