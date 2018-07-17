"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const DocumentView_1 = require("../../../DocumentView/DocumentView");
const DocumentPreviewSidebar_1 = require("./DocumentPreviewSidebar");
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
            if (this.props.currentSelectedField !== undefined) {
                document.getElementById(this.props.document_meta.indexOf(this.props.currentSelectedField).toString()).classList.remove('selectedField');
            }
            document.getElementById(id).classList.add('selectedField');
            let currentSelectedFieldValue = this.props.document_meta[id].assigned_to;
            console.log(currentSelectedFieldValue);
            this.props.handleSelectedFieldId(id);
            this.showSidebar();
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
        //State management methods
        this.getDocumentId = () => {
            this.setState({
                document_id: this.props.document_id
            });
        };
        this.giveDocumentPreviewComplete = () => {
            this.props.getDocumentPreviewComplete(true);
        };
        this.state = {
            documentName: String,
            currentSelectedField: '',
            userList: []
        };
    }
    //React lifecycle methods
    componentDidMount() {
        this.handleShow();
        this.getDocumentId();
    }
    componentWillMount() {
    }
    render() {
        return (React.createElement("div", { id: 'DocumentPreview', style: this.handleShow() },
            React.createElement("div", { id: 'document-view-container' },
                React.createElement("div", { id: 'document-view-header' },
                    React.createElement("input", { placeholder: 'Document Name', onChange: (e) => { this.handleDocumentNameChange(e); }, id: 'document-name-input', type: "text" }),
                    React.createElement("div", { id: 'save-button' }, "Save File")),
                React.createElement(DocumentView_1.default, { document_id: this.props.document_id, view: 'DocumentPreview', previewOnClickHandler: this.previewOnClickHandler })),
            React.createElement("div", { id: 'show-sidebar-icon-container', onClick: this.showSidebar },
                React.createElement("img", { id: 'show-sidebar-icon', src: "/images/left-arrow-1.png", alt: "" })),
            React.createElement(DocumentPreviewSidebar_1.default, { currentSelectedFieldId: this.props.currentSelectedFieldId, currentSelectedField: this.props.currentSelectedField, showSidebar: this.state.showSidebar, deleteUser: this.props.deleteUser, assignUserToField: this.props.assignUserToField, userList: this.props.userList, getHideSidebar: this.getHideSidebar })));
    }
}
exports.default = DocumentPreview;
//# sourceMappingURL=DocumentPreview.js.map