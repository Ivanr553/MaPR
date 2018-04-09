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
const DocumentList_1 = require("../DocumentList/DocumentList");
const DocumentView_1 = require("../DocumentView/DocumentView");
const Account_1 = require("../Account/Account");
const About_1 = require("../About/About");
class MetaBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            currentView: '',
            documentResults: [],
            currentDocuments: []
        };
        this.getCurrentUser = this.getCurrentUser.bind(this);
        this.handleDocumentListPress = this.handleDocumentListPress.bind(this);
        this.handleDocumentLinkPress = this.handleDocumentLinkPress.bind(this);
        this.handleSettingsPress = this.handleSettingsPress.bind(this);
        this.handleAboutPress = this.handleAboutPress.bind(this);
        this.getDocuments = this.getDocuments.bind(this);
        this.populateDocumentLinks = this.populateDocumentLinks.bind(this);
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
        let result = {
            documents: [
                {
                    id: '12345',
                    title: 'Road Test',
                    created_by: 'Officer',
                    action_required: 'Scoring',
                    status: 'pending',
                    file: 'RoadTest.pdf'
                },
                {
                    id: '23456',
                    title: 'Pre Trip and Skills Test',
                    created_by: 'Officer',
                    action_required: 'Scoring',
                    status: 'pending',
                    file: 'PreTripandSkillsTest.pdf'
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
                    id: '34567',
                    title: 'Test',
                    created_by: 'Officer',
                    action_required: 'Fill Out',
                    status: 'pending',
                    file: 'caf.pdf'
                }
            ]
        };
        this.setState({
            documentResults: result.documents
        }, () => {
            this.populateDocumentLinks();
            this.setState({
                currentView: React.createElement(DocumentList_1.default, { documentResults: this.state.documentResults, viewDocument: this.handleDocumentLinkPress })
            }, () => {
                this.props.getCurrentView(this.state.currentView);
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
    handleStudioPress() {
        window.open('/A/App/Studio', '_self');
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
        return (React.createElement("div", { className: 'MetaBar' },
            React.createElement("div", { className: 'metabar-link', onClick: this.handleDocumentListPress }, "Document List"),
            React.createElement("div", { className: 'document-list-links-container' }, this.state.documentLinks),
            studio,
            React.createElement("div", { className: 'metabar-link', onClick: this.handleSettingsPress }, "Account")));
    }
}
exports.default = MetaBar;
//# sourceMappingURL=MetaBar.js.map