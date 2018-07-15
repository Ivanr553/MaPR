"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const DocumentView_1 = require("../../../DocumentView/DocumentView");
class DocumentPreview extends React.Component {
    constructor(props) {
        super(props);
        this.previewOnClickHandler = (e) => {
            console.log(e.target);
        };
        this.handleDocumentNameChange = (e) => {
            let documentName = this.state.documentName;
            documentName = e.target.value;
            this.setState({
                documentName: documentName
            }, () => {
                this.props.getDocumentName(this.state.documentName);
            });
        };
        this.getDocumentId = () => {
            this.setState({
                document_id: this.props.document_id
            });
        };
        this.giveDocumentPreviewComplete = () => {
            this.props.getDocumentPreviewComplete(true);
        };
        this.state = {
            documentName: ''
        };
    }
    //Sidebar Functions
    hideSidebar() {
        let sidebar = document.getElementById('document-view-sidebar');
        sidebar.classList.add('hide-sidebar');
        sidebar.classList.remove('show-sidebar');
    }
    showSidebar() {
        let sidebar = document.getElementById('document-view-sidebar');
        sidebar.classList.add('show-sidebar');
        sidebar.classList.remove('hide-sidebar');
    }
    componentWillMount() {
        this.getDocumentId();
    }
    render() {
        return (React.createElement("div", { id: 'DocumentPreview' },
            React.createElement("div", { id: 'document-view-container' },
                React.createElement("div", { id: 'document-view-header' },
                    React.createElement("input", { placeholder: 'Document Name', onChange: (e) => { this.handleDocumentNameChange(e); }, id: 'document-name-input', type: "text" }),
                    React.createElement("div", { id: 'save-button' }, "Save File")),
                React.createElement(DocumentView_1.default, { document_id: this.state.document_id, view: 'DocumentPreview', previewOnClickHandler: this.previewOnClickHandler })),
            React.createElement("div", { id: 'show-sidebar-icon-container', onClick: this.showSidebar },
                React.createElement("img", { id: 'show-sidebar-icon', src: "/images/left-arrow-1.png", alt: "" })),
            React.createElement("div", { id: 'document-view-sidebar', className: '' },
                React.createElement("div", { id: 'close-sidebar-icon', onClick: this.hideSidebar }, "x"),
                React.createElement("div", { className: 'documents-header' }, "Selected Users"),
                React.createElement("div", { id: 'added-users-container-preview', className: 'added-users-container' }, this.props.userList))));
    }
}
exports.default = DocumentPreview;
//# sourceMappingURL=DocumentPreview.js.map