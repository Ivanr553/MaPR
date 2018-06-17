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
const Account_1 = require("../Account/Account");
const About_1 = require("../About/About");
const CreateDocument_1 = require("../CreateDocument/CreateDocument");
const UploadDocument_1 = require("../UploadDocument/UploadDocument");
class MetaBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            currentView: '',
            documentResults: [],
            currentDocuments: []
        };
        this.getCurrentView = this.getCurrentView.bind(this);
        this.getCurrentUser = this.getCurrentUser.bind(this);
        this.handleDocumentListPress = this.handleDocumentListPress.bind(this);
        this.handleDocumentLinkPress = this.handleDocumentLinkPress.bind(this);
        this.handleSettingsPress = this.handleSettingsPress.bind(this);
        this.handleAboutPress = this.handleAboutPress.bind(this);
        this.getDocuments = this.getDocuments.bind(this);
        this.populateDocumentLinks = this.populateDocumentLinks.bind(this);
        this.handleNewDocumentPress = this.handleNewDocumentPress.bind(this);
        this.handleUploadDocumentPress = this.handleUploadDocumentPress.bind(this);
    }
    getCurrentUser() {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield this.props.getCurrentUser();
            this.setState({
                user: user
            });
        });
    }
    //Will get the documents from the back end, for now is just using a hardcoded object
    getDocuments() {
        return __awaiter(this, void 0, void 0, function* () {
            let result = {
                documents: [
                    {
                        id: '23456',
                        title: 'NAVMC',
                        created_by: 'Officer',
                        action_required: 'Fill Out',
                        status: 'pending',
                        file: 'NAVMC10694.pdf'
                    },
                    {
                        id: '23456',
                        title: 'NAVMC',
                        created_by: 'Officer',
                        action_required: 'Fill Out',
                        status: 'pending',
                        file: 'NAVMC10694.pdf'
                    },
                    {
                        id: '23456',
                        title: 'NAVMC',
                        created_by: 'Officer',
                        action_required: 'Fill Out',
                        status: 'pending',
                        file: 'NAVMC10694.pdf'
                    },
                    {
                        id: '23456',
                        title: 'NAVMC',
                        created_by: 'Officer',
                        action_required: 'Fill Out',
                        status: 'pending',
                        file: 'NAVMC10694.pdf'
                    }
                ]
            };
            try {
                let documentList = yield $.get('/DocumentSave/GetAllDocuments');
                console.log(documentList);
                let pdfID = documentList[0].idDocument;
                let returnPDF = yield $.get(`/DocumentSave/GetNewAutoPopulatedFile?document_id=${pdfID}`);
            }
            catch (e) {
                console.log(e);
            }
            this.setState({
                documentResults: result.documents
            }, () => {
                this.populateDocumentLinks();
            });
        });
    }
    populateDocumentLinks() {
        let documents = this.state.documentResults.slice();
        let documentLinks = [];
        for (let i = 0; i < documents.length; i++) {
            let documentLink = React.createElement("div", { className: 'document-link', id: documents[i].file, key: i, "data-params": { id: documents[i].id, document: documents[i] }, onClick: (e) => { this.handleLinkPress(e); } }, documents[i].title);
            documentLinks.push(documentLink);
        }
        this.setState({
            documentLinks: documentLinks
        }, () => {
            this.handleDocumentListPress();
        });
    }
    handleLinkPress(e) {
        return __awaiter(this, void 0, void 0, function* () {
            let file = e.target.id;
            let setFile = yield this.setState({
                file: file
            });
            let setCurrentView = yield this.setState({
                currentView: React.createElement(DocumentView_1.default, { file: this.state.file })
            });
            let getCurrentView = yield this.props.getCurrentView(this.state.currentView);
        });
    }
    handleDocumentLinkPress(e) {
        return __awaiter(this, void 0, void 0, function* () {
            let target = e.target;
            while (!target.classList.contains('viewable-document')) {
                target = target.parentNode;
            }
            let file = target.id;
            let setFile = yield this.setState({
                file: file
            });
            let setCurrentView = yield this.setState({
                currentView: React.createElement(DocumentView_1.default, { file: this.state.file })
            });
            let getCurrentView = yield this.props.getCurrentView(this.state.currentView);
        });
    }
    handleUploadDocumentPress() {
        this.setState({
            currentView: React.createElement(UploadDocument_1.default, null)
        }, () => {
            this.props.getCurrentView(this.state.currentView);
        });
    }
    handleStudioPress() {
        window.open('/A/App/Studio', '_self');
    }
    getCurrentView(currentView) {
        this.setState({
            currentView: currentView
        }, () => {
            this.props.getCurrentView(this.state.currentView);
        });
    }
    handleNewDocumentPress() {
        this.setState({
            currentView: React.createElement(CreateDocument_1.default, { getCurrentView: this.getCurrentView, documentResults: this.state.documentResults, viewDocument: this.handleDocumentLinkPress })
        }, () => {
            this.props.getCurrentView(this.state.currentView);
        });
    }
    handleDocumentListPress() {
        this.setState({
            currentView: React.createElement(DocumentList_1.default, { documentResults: this.state.documentResults, viewDocument: this.handleDocumentLinkPress })
        }, () => {
            this.props.getCurrentView(this.state.currentView);
        });
    }
    handleSettingsPress() {
        this.setState({
            currentView: React.createElement(Account_1.default, { getCurrentUser: this.props.getCurrentUser })
        }, () => {
            this.props.getCurrentView(this.state.currentView);
        });
    }
    handleAboutPress() {
        this.setState({
            currentView: React.createElement(About_1.default, null)
        }, () => {
            this.props.getCurrentView(this.state.currentView);
        });
    }
    componentDidMount() {
        this.getDocuments();
        this.getCurrentUser();
    }
    render() {
        let studio;
        if (this.state.user.authorization > 1) {
            studio = React.createElement("div", { className: 'metabar-link', onClick: this.handleStudioPress }, "Studio (Unfinished)");
        }
        return (React.createElement("div", { id: 'MetaBar' },
            React.createElement("div", { id: 'logo-container' },
                React.createElement("img", { id: 'logo', src: '/images/MAPR_logo_edit.png' })),
            React.createElement("img", { className: 'metabar-link', src: '/images/doc_icon.png', onClick: this.handleDocumentListPress }),
            React.createElement("img", { className: 'metabar-link', src: '/images/new_document-white.png', onClick: this.handleNewDocumentPress }),
            React.createElement("img", { className: 'metabar-link', src: '/images/upload-document.png', onClick: this.handleUploadDocumentPress }),
            React.createElement("img", { className: 'metabar-link', src: '/images/settings.png', onClick: this.handleSettingsPress })));
    }
}
exports.default = MetaBar;
//# sourceMappingURL=MetaBar.js.map