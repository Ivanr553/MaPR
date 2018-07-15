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
const $ = require("jquery");
const s = require('./styling/style.sass');
const DocumentList_1 = require("../DocumentList/DocumentList");
const DocumentView_1 = require("../DocumentView/DocumentView");
const About_1 = require("../About/About");
const CreateDocument_1 = require("../CreateDocument/CreateDocument");
const UploadDocument_1 = require("../UploadDocument/UploadDocument");
const SignatureView_1 = require("../SignatureView/SignatureView");
class MetaBar extends React.Component {
    constructor(props) {
        super(props);
        //========================== Sending/Retrieving Data ==========================
        this.getCurrentUser = () => __awaiter(this, void 0, void 0, function* () {
            let user = yield this.props.getCurrentUser();
            this.setState({
                user: user
            });
        });
        this.getDocuments = () => __awaiter(this, void 0, void 0, function* () {
            try {
                let documentList = yield $.get('/DocumentSave/GetAllDocuments');
                this.setState({
                    documentResults: documentList
                }, () => {
                    this.populateDocumentLinks();
                });
            }
            catch (e) {
                Error(e);
            }
        });
        this.getCurrentView = (currentView) => {
            this.setState({
                currentView: currentView
            }, () => {
                this.props.getCurrentView(this.state.currentView);
            });
        };
        //==================== Handle Notifications ======================
        this.getNotifications = () => __awaiter(this, void 0, void 0, function* () {
            try {
                let response = yield $.get('/Notification');
                let notificationCount = response.notification_count;
                this.setState({
                    notificationCount: notificationCount
                });
            }
            catch (e) {
                Error(e);
            }
        });
        this.renderNotification = () => {
            if (this.state.notificationCount <= 0) {
                return React.createElement("img", { id: 'pending-document-notification', src: "/images/notification-undefined.png", alt: "", onClick: this.handleDocumentListPress });
            }
        };
        //================= Populating Content on Page ==================
        this.populateDocumentLinks = () => {
            let documents = this.state.documentResults.slice();
            let documentLinks = [];
            for (let i = 0; i < documents.length; i++) {
                let documentLink = React.createElement("div", { className: 'document-link', id: documents[i].idDocument, key: i, "data-params": { id: documents[i].id, document: documents[i] }, onClick: (e) => { this.handleLinkPress(e); } }, documents[i].name);
                documentLinks.push(documentLink);
            }
            this.setState({
                documentLinks: documentLinks
            }, () => {
                this.handleDocumentListPress();
            });
        };
        //================== OnClick/Button Handlers =================
        this.handleLinkPress = (e) => __awaiter(this, void 0, void 0, function* () {
            let document_id = e.target.id;
            let setFile = yield this.setState({
                document_id: document_id
            });
            let setCurrentView = yield this.setState({
                currentView: React.createElement(DocumentView_1.default, { document_id: this.state.document_id, view: 'PendingDocuments' })
            });
            let getCurrentView = yield this.props.getCurrentView(this.state.currentView);
        });
        this.handleDocumentLinkPress = (e) => __awaiter(this, void 0, void 0, function* () {
            let target = e.target;
            while (!target.classList.contains('viewable-document')) {
                target = target.parentNode;
            }
            let document_id = target.id;
            let setFile = yield this.setState({
                document_id: document_id
            });
            let setCurrentView = yield this.setState({
                currentView: React.createElement(DocumentView_1.default, { document_id: this.state.document_id, view: 'PendingDocuments' })
            });
            let getCurrentView = yield this.props.getCurrentView(this.state.currentView);
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
                currentView: React.createElement(CreateDocument_1.default, { getCurrentView: this.getCurrentView, documentResults: this.state.documentResults, viewDocument: this.handleDocumentLinkPress })
            }, () => {
                this.props.getCurrentView(this.state.currentView);
                this.handleMetabarSelectionStyling('create-document-metabar-button', 'create-document-metabar-triangle');
            });
        };
        this.handleDocumentListPress = () => {
            this.setState({
                currentView: React.createElement(DocumentList_1.default, { documentResults: this.state.documentResults, viewDocument: this.handleDocumentLinkPress })
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
            user: {},
            currentView: '',
            documentResults: [],
            currentDocuments: []
        };
    }
    //==================== React Lifecycle Methods ====================
    componentDidMount() {
        this.getDocuments();
        this.getCurrentUser();
        this.getNotifications();
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