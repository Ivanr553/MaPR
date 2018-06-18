"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
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
            readyForNext: false
        };
        // this.handleDocumentLinkPress = this.handleDocumentLinkPress.bind(this)
        this.handleSelectDocumentView = this.handleSelectDocumentView.bind(this);
        this.handleSelectPermissionsView = this.handleSelectPermissionsView.bind(this);
        this.handleNext = this.handleNext.bind(this);
        this.handleBack = this.handleBack.bind(this);
    }
    //Views
    handleSelectDocumentView() {
        let currentView = (React.createElement("div", null,
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
        let currentView = (React.createElement("div", null,
            React.createElement("div", { className: 'documents-header' }, "Select Document Permissions"),
            React.createElement("div", { className: 'document-list-container' },
                React.createElement("div", null,
                    "Selected Document: ",
                    this.state.document_id),
                React.createElement("div", null, "Send to:"),
                React.createElement("div", null, "Allow viewing priviledge:"))));
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