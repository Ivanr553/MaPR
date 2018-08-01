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
const DocumentView_1 = require("../../../DocumentView/DocumentView");
const DocumentPreviewSidebar_1 = require("./DocumentPreviewSidebar");
const Button_1 = require("../../../Button/Button");
class DocumentPreview extends React.Component {
    constructor(props) {
        super(props);
        this.handleShow = () => {
            if (!this.props.documentPreviewBoolean) {
                let style = {
                    display: 'none'
                };
                return style;
            }
            else {
                let style = {
                    display: 'block'
                };
                return style;
            }
        };
        this.previewOnClickHandler = (e) => {
            let id = e.target.id;
            //Clearing previously selected field
            if (!!this.props.currentSelectedField) {
                document.getElementById(this.props.document_meta.indexOf(this.props.currentSelectedField).toString()).classList.remove('selectedField');
            }
            document.getElementById(id).classList.add('selectedField');
            // let currentSelectedFieldValue = (this.props.document_meta as Array<document_meta_field>)[id].assigned_to
            this.props.handleSelectedFieldId(parseInt(id));
            this.showSidebar();
        };
        this.handleDocumentNameChange = (e) => {
            let document_name = this.state.document_name;
            document_name = e.target.value;
            this.setState({
                document_name: document_name
            }, () => {
                this.props.getDocumentName(this.state.document_name);
            });
        };
        this.showSidebar = () => {
            this.setState({
                showSidebar: true
            });
        };
        this.getHideSidebar = (showSidebar) => {
            this.setState({
                showSidebar: showSidebar
            });
        };
        this.verifyDocumentCompletion = () => {
            let document_meta = this.props.document_meta;
            let signatureFields = document_meta.filter(field => field.field_type === 'Signature');
            let result = signatureFields.map(field => {
                if (field.assigned_to === null) {
                    return false;
                }
            });
            if (result.indexOf(false) >= 0) {
                return false;
            }
            if (this.state.document_name === '') {
                return false;
            }
            if (this.props.assigned_user === null) {
                return false;
            }
            return true;
        };
        // NOT WORKING -- Waiting on Mitchell //
        this.submitDocument = () => __awaiter(this, void 0, void 0, function* () {
            if (!this.verifyDocumentCompletion()) {
                return;
            }
            let userList = this.props.userList.slice();
            let props_document_meta = [];
            this.props.document_meta.forEach(document_meta_field => {
                props_document_meta.push(Object.assign({}, document_meta_field));
            });
            let assignees = [];
            userList.forEach(user => {
                assignees.push(Object.assign({}, user));
            });
            try {
                assignees.map(user => {
                    delete user.name;
                    delete user.assigned_to;
                    return user;
                });
                let document_meta = props_document_meta.map(document_meta_field => {
                    document_meta_field.field_position = null;
                    if (!!document_meta_field.assigned_to) {
                        document_meta_field.assigned_to = document_meta_field.assigned_to.dod_id;
                    }
                    return document_meta_field;
                });
                let assignedDocument = {
                    document_meta: document_meta,
                    document_id: this.props.document_id,
                    document_name: this.state.document_name,
                    assignees: assignees
                };
                let response = yield fetch('/DocumentManager/AssignDocument', {
                    method: "POST",
                    mode: "cors",
                    credentials: "same-origin",
                    headers: {
                        "Content-Type": "application/json; charset=utf-8",
                    },
                    body: JSON.stringify(assignedDocument)
                });
                if (response.status === 200) {
                    this.props.completeDocumentCreation();
                }
                else {
                    alert('There was an error submitting the document');
                    throw new Error(response.statusText);
                }
            }
            catch (e) {
                throw new Error(e);
            }
        });
        this.renderDocumentSaveButton = () => {
            if (!this.verifyDocumentCompletion()) {
                return (React.createElement(Button_1.default, { innerText: 'Submit', color: 'rgb(226, 120, 120)', onClickHandler: this.submitDocument }));
            }
            if (this.verifyDocumentCompletion()) {
                return (React.createElement(Button_1.default, { innerText: 'Submit', color: 'rgb(94, 163, 91)', onClickHandler: this.submitDocument }));
            }
        };
        //State management methods
        this.getDocumentId = () => {
            this.setState({
                document_id: this.props.document_id
            });
        };
        this.state = {
            document_name: '',
            currentSelectedField: '',
            userList: [],
            assigned_to: ''
        };
    }
    //React lifecycle methods
    componentDidMount() {
        this.handleShow();
        this.getDocumentId();
    }
    render() {
        return (React.createElement("div", { id: 'DocumentPreview', style: this.handleShow() },
            React.createElement("div", { id: 'document-view-container' },
                React.createElement("div", { id: 'document-view-header' },
                    React.createElement("div", { id: 'documents-view-header-button-container' }, this.renderDocumentSaveButton()),
                    React.createElement("input", { placeholder: 'Document Name', onChange: (e) => { this.handleDocumentNameChange(e); }, id: 'document-name-input', type: "text" }),
                    React.createElement("div", null)),
                React.createElement(DocumentView_1.default, { document_id: this.props.document_id, document_meta: this.props.document_meta, view: 'DocumentPreview', previewOnClickHandler: this.previewOnClickHandler })),
            React.createElement("div", { id: 'show-sidebar-icon-container', onClick: this.showSidebar },
                React.createElement("img", { id: 'show-sidebar-icon', src: "/images/left-arrow-1.png", alt: "" })),
            React.createElement(DocumentPreviewSidebar_1.default, { removeAssignedUser: this.props.removeAssignedUser, currentSelectedFieldId: this.props.currentSelectedFieldId, currentSelectedField: this.props.currentSelectedField, showSidebar: this.state.showSidebar, deleteUser: this.props.deleteUser, handleAddedUserPress: this.props.handleAddedUserPress, userList: this.props.userList, getHideSidebar: this.getHideSidebar })));
    }
}
exports.default = DocumentPreview;
//# sourceMappingURL=DocumentPreview.js.map