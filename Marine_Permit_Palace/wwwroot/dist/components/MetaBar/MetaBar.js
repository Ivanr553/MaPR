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
const PendingDocumentsView_1 = require("../PendingDocumentsView/PendingDocumentsView");
const DocumentView_1 = require("../DocumentView/DocumentView");
const About_1 = require("../About/About");
const CreateDocument_1 = require("../CreateDocument/CreateDocument");
const UploadDocument_1 = require("../UploadDocument/UploadDocument");
const SignatureView_1 = require("../SignatureView/SignatureView");
class MetaBar extends React.Component {
    constructor(props) {
        super(props);
        //========================== Sending/Retrieving Data ==========================
        this.getDocuments = () => __awaiter(this, void 0, void 0, function* () {
            try {
                let request = yield fetch('/DocumentSave/GetAllTemplateDocuments', { credentials: "same-origin" });
                let documentList = yield request.json();
                this.setState({
                    documentResults: documentList
                });
            }
            catch (e) {
                throw new Error(e);
            }
        });
        this.getPendingDocuments = () => __awaiter(this, void 0, void 0, function* () {
            let pendingDocuments = yield fetch('/DocumentSave/GetSavedDocuments', { credentials: 'same-origin' })
                .then(data => {
                return data.json()
                    .then(data => {
                    let responseArray = data.my_documents;
                    return responseArray.map(item => {
                        return {
                            name: item.document_name,
                            idDocument: item.submitted_document_id
                        };
                    });
                });
            });
            this.setState({
                pendingDocuments: pendingDocuments
            }, () => {
                this.handleDocumentListPress();
            });
        });
        this.getSignature = () => __awaiter(this, void 0, void 0, function* () {
            let request = yield fetch('/Account/GetSignature', { credentials: 'same-origin' });
            let response = yield request.json();
            this.setState({
                signature_base64: response.signature_base64
            });
        });
        this.getCurrentView = (currentView) => {
            this.setState({
                currentView: currentView
            }, () => {
                this.props.getCurrentView(this.state.currentView);
            });
        };
        this.getCreateDocumentState = (createDocumentState) => {
            this.setState({
                createDocumentState: createDocumentState
            });
        };
        //==================== Handle Notifications ======================
        this.getNotifications = () => __awaiter(this, void 0, void 0, function* () {
            try {
                let request = yield fetch('/Notification', { credentials: 'same-origin' });
                let response = yield request.json();
                let notificationCount = response.notification_count;
                this.setState({
                    notificationCount: notificationCount
                });
            }
            catch (e) {
                throw new Error(e);
            }
        });
        this.renderNotification = () => {
            if (this.state.notificationCount <= 0) {
                return React.createElement("img", { id: 'pending-document-notification', src: "/images/notification-undefined.png", alt: "", onClick: this.handleDocumentListPress });
            }
        };
        //================== OnClick/Button Handlers =================
        this.handleDocumentLinkPress = (e) => __awaiter(this, void 0, void 0, function* () {
            let target = e.target;
            while (!target.classList.contains('document-item')) {
                target = target.parentNode;
            }
            let document_id = target.id;
            let pendingDocuments = this.state.pendingDocuments;
            let document_name = '';
            pendingDocuments.forEach(document => {
                if (document.idDocument === document_id) {
                    document_name = document.name;
                }
            });
            this.setState({
                document_id: document_id
            }, () => {
                this.setState({
                    currentView: React.createElement(DocumentView_1.default, { signature_base64: this.state.signature_base64, document_name: document_name, document_id: this.state.document_id, view: 'PendingDocuments' })
                }, () => {
                    this.props.getCurrentView(this.state.currentView);
                });
            });
        });
        this.handleMetabarSelectionStyling = (selectedMetabarView, selectedMetabarViewButton) => {
            //Removing classes from buttons
            document.getElementById('document-list-metabar-button').classList.remove('metabar-link-selected');
            document.getElementById('create-document-metabar-button').classList.remove('metabar-link-selected');
            document.getElementById('upload-document-metabar-button').classList.remove('metabar-link-selected');
            document.getElementById('signature-page-metabar-button').classList.remove('metabar-link-selected');
            //Removing classes from triangles
            document.getElementById('document-list-metabar-triangle').classList.remove('metabar-triangle-selected');
            document.getElementById('create-document-metabar-triangle').classList.remove('metabar-triangle-selected');
            document.getElementById('upload-document-metabar-triangle').classList.remove('metabar-triangle-selected');
            document.getElementById('signature-page-metabar-triangle').classList.remove('metabar-triangle-selected');
            //Adding class to button and triangle
            document.getElementById(selectedMetabarView).classList.add('metabar-link-selected');
            document.getElementById(selectedMetabarViewButton).classList.add('metabar-triangle-selected');
        };
        this.handleNewDocumentPress = () => {
            this.setState({
                currentView: React.createElement(CreateDocument_1.default, { createDocumentState: this.state.createDocumentState, getCreateDocumentState: this.getCreateDocumentState, getCurrentView: this.getCurrentView, documentResults: this.state.documentResults, viewDocument: this.handleDocumentLinkPress })
            }, () => {
                this.props.getCurrentView(this.state.currentView);
                this.handleMetabarSelectionStyling('create-document-metabar-button', 'create-document-metabar-triangle');
            });
        };
        this.handleDocumentListPress = () => {
            this.setState({
                currentView: React.createElement(PendingDocumentsView_1.default, { selectDocument: this.handleDocumentLinkPress, pendingDocuments: this.state.pendingDocuments })
            }, () => {
                this.props.getCurrentView(this.state.currentView);
                this.handleMetabarSelectionStyling('document-list-metabar-button', 'document-list-metabar-triangle');
            });
        };
        this.handleSignaturePress = () => {
            this.setState({
                currentView: React.createElement(SignatureView_1.default, null)
            }, () => {
                this.props.getCurrentView(this.state.currentView);
                this.handleMetabarSelectionStyling('signature-page-metabar-button', 'signature-page-metabar-triangle');
            });
        };
        this.handleUploadDocumentPress = () => {
            this.setState({
                currentView: React.createElement(UploadDocument_1.default, null)
            }, () => {
                this.props.getCurrentView(this.state.currentView);
                this.handleMetabarSelectionStyling('upload-document-metabar-button', 'upload-document-metabar-triangle');
            });
        };
        this.handleAboutPress = () => {
            this.setState({
                currentView: React.createElement(About_1.default, null)
            }, () => {
                this.props.getCurrentView(this.state.currentView);
            });
        };
        this.state = {
            currentView: '',
            documentResults: [],
            pendingDocuments: [],
            currentDocuments: [],
            createDocumentState: {
                document_id: '',
                document_meta: Array,
                documentName: '',
                userList: [],
                selectDocumentBoolean: true,
                documentPreviewBoolean: false,
                selectPermissionsBoolean: false
            }
        };
    }
    //==================== React Lifecycle Methods ====================
    componentDidMount() {
        this.getDocuments();
        this.getPendingDocuments();
        this.getNotifications();
        this.getSignature();
    }
    componentDidCatch() {
    }
    render() {
        return (React.createElement("div", { id: 'MetaBar' },
            React.createElement("div", { id: 'logo-container' },
                React.createElement("img", { id: 'logo', src: '/images/MAPR_logo_edit.png' })),
            React.createElement("div", { title: 'Pending Documents', className: 'metabar-button-abbr' },
                this.renderNotification(),
                React.createElement("img", { id: 'document-list-metabar-button', src: '/images/doc_icon.png', onClick: this.handleDocumentListPress }),
                React.createElement("div", { id: 'document-list-metabar-triangle', className: 'metabar-triangle' })),
            React.createElement("abbr", { title: 'Create New Document', className: 'metabar-button-abbr' },
                React.createElement("img", { id: 'create-document-metabar-button', className: 'metabar-link', src: '/images/new_document-white.png', onClick: this.handleNewDocumentPress }),
                React.createElement("div", { id: 'create-document-metabar-triangle', className: 'metabar-triangle' })),
            React.createElement("abbr", { title: 'Upload Document', className: 'metabar-button-abbr' },
                React.createElement("img", { id: 'upload-document-metabar-button', className: 'metabar-link', src: '/images/upload-document.png', onClick: this.handleUploadDocumentPress }),
                React.createElement("div", { id: 'upload-document-metabar-triangle', className: 'metabar-triangle' })),
            React.createElement("abbr", { title: 'Signature Page', className: 'metabar-button-abbr' },
                React.createElement("img", { id: 'signature-page-metabar-button', className: 'metabar-link', src: '/images/pencil.png', onClick: this.handleSignaturePress }),
                React.createElement("div", { id: 'signature-page-metabar-triangle', className: 'metabar-triangle' }))));
    }
}
exports.default = MetaBar;
//# sourceMappingURL=MetaBar.js.map