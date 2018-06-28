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
class CreateDocument extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            documentResults: this.props.documentResults,
            currentView: '',
            view: '',
            documentList: [],
            document_id: '',
            nextButton: '',
            readyForNext: false,
            userList: []
        };
        // this.handleDocumentLinkPress = this.handleDocumentLinkPress.bind(this)
        this.handleSelectDocumentView = this.handleSelectDocumentView.bind(this);
        this.handleSelectPermissionsView = this.handleSelectPermissionsView.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.handleBack = this.handleBack.bind(this);
        this.handleAddUser = this.handleAddUser.bind(this);
    }
    //Views
    handleSelectDocumentView() {
        let currentView = (React.createElement("div", { className: 'container' },
            React.createElement("div", { className: 'documents-header' }, "Select Template Document"),
            React.createElement("div", { className: 'document-list-container' }, this.state.documentList)));
        this.setState({
            currentView: currentView,
            view: 'SelectDocument'
        }, () => {
            this.handleButtons();
        });
    }
    handleSelectPermissionsView() {
        let currentView = (React.createElement("div", { className: 'container' },
            React.createElement("div", { className: 'documents-header' }, "Select Document Permissions"),
            React.createElement("div", { className: 'document-list-container' },
                React.createElement("div", null,
                    "Selected Document: ",
                    this.state.document_id),
                React.createElement("div", { className: 'documents-header' }, "Select Users"),
                React.createElement("div", { id: 'user-search-main-container' },
                    React.createElement("div", { id: 'user-search-bar-container' },
                        React.createElement("div", { id: 'search-bar-magnifying-glass' }),
                        React.createElement("input", { onClick: this.handleAddUser, onChange: (e) => { this.handleFindUser(e); }, id: 'user-search-bar', placeholder: 'Find Users', type: "text" })),
                    React.createElement("div", { id: 'added-users-title' }, "Selected Users"),
                    React.createElement("div", { id: 'added-users-container' }, this.state.userList)))));
        this.setState({
            currentView: currentView,
            view: 'SelectPermissions'
        }, () => {
            this.handleButtons();
        });
    }
    //Handle View Switching
    handleNext() {
        if (this.state.view === 'SelectDocument') {
            if (this.state.document_id === '') {
                return;
            }
            this.handleSelectPermissionsView();
            return;
        }
        if (this.state.view === 'SelectPermissions') {
            return;
        }
    }
    handleBack() {
        if (this.state.view === 'SelectPermissions') {
            this.handleSelectDocumentView();
            return;
        }
    }
    //Creating Buttons
    handleButtons() {
        let backButton;
        if (this.state.view === 'SelectDocument') {
            backButton = '';
            this.setState({
                backButton: backButton
            });
        }
        if (this.state.view === 'SelectPermissions') {
            backButton =
                React.createElement("button", { className: 'create-document-button selectable-button', id: 'create-document-back-button', onClick: this.handleBack }, "Back");
            this.setState({
                backButton: backButton
            });
        }
        let nextButton;
        if (!this.state.readyForNext) {
            nextButton =
                React.createElement("button", { className: 'create-document-button', id: 'create-document-next-button' }, "Next");
            this.setState({
                nextButton: nextButton
            }, () => {
                this.forceUpdate();
                return nextButton;
            });
        }
        else {
            nextButton =
                React.createElement("button", { className: 'create-document-button selectable-button', id: 'create-document-next-button', onClick: this.handleNext }, "Next");
            this.setState({
                nextButton: nextButton
            }, () => {
                return nextButton;
            });
        }
    }
    //Creates list in state of documents to be rendered
    renderDocuments() {
        let documents = this.props.documentResults;
        let documentList = [];
        for (let i = 0; i < documents.length; i++) {
            let file = '/dist/documents/' + documents[i].file;
            let newDocument = React.createElement("div", { key: i, className: 'viewable-document', id: documents[i].file, onClick: (e) => { this.selectDocument(e); } },
                React.createElement("div", { className: 'viewable-document-field', id: 'first-field' }, (i + 1) + '.'),
                React.createElement("div", { className: 'viewable-document-field' }, documents[i].title));
            documentList.push(newDocument);
        }
        this.setState({
            documentList: documentList
        }, () => {
            this.handleSelectDocumentView();
        });
    }
    selectDocument(e) {
        let target = e.target;
        while (!target.classList.contains('viewable-document')) {
            target = target.parentNode;
        }
        let parent = target.parentNode;
        for (let i = 0; i < parent.children.length; i++) {
            if (parent.children[i].className === 'viewable-document') {
                parent.children[i].style.border = 'solid 2px rgba(0, 0, 0, 0)';
            }
        }
        if (target.classList.contains('viewable-document')) {
            target.style.border = 'solid 2px rgba(38, 107, 168, 0.7)';
        }
        this.setState({
            document_id: target.id,
            readyForNext: true
        }, () => {
            this.handleButtons();
        });
    }
    //Finding and displaying added users
    handleFindUser(e) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = e.target.value;
            try {
                let result = $.ajax({});
            }
            catch (e) {
                console.log(e);
            }
        });
    }
    handleAddUser() {
        let userList = this.state.userList.slice();
        let user = 'Example User';
        let addedUser = React.createElement("div", { className: 'added-user' }, user);
        userList.push(addedUser);
        this.setState({
            userList: userList
        }, () => {
            this.handleSelectPermissionsView();
        });
    }
    handleDeleteUser() {
    }
    componentWillMount() {
        this.handleButtons();
        this.renderDocuments();
    }
    render() {
        return (React.createElement("div", { id: 'CreateDocument' },
            this.state.currentView,
            React.createElement("div", { id: 'button-container' },
                this.state.backButton,
                this.state.nextButton)));
    }
}
exports.default = CreateDocument;
//# sourceMappingURL=CreateDocument.js.map