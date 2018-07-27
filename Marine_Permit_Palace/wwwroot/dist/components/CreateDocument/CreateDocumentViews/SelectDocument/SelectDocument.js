"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const DocumentItem_1 = require("../../../DocumentList/DocumentItem/DocumentItem");
const DocumentList_1 = require("../../../DocumentList/DocumentList");
class SelectDocument extends React.Component {
    constructor(props) {
        super(props);
        this.handleShow = () => {
            if (!this.props.selectDocumentBoolean) {
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
        this.getDocumentList = (documents) => {
            return (documents.map((document) => {
                return (React.createElement(DocumentItem_1.default, { key: Math.random(), document: document, selectDocument: this.selectDocument, selectedDocument: this.props.document_id }));
            }));
        };
        this.selectDocument = (e) => {
            let target = e.target;
            while (!target.classList.contains('document-item')) {
                target = target.parentNode;
            }
            let parent = target.parentNode;
            this.setState({
                document_id: target.id
            }, () => {
                this.giveDocumentId();
                this.giveSelectDocumentComplete();
            });
        };
        //State Management
        this.giveDocumentId = () => {
            this.props.getDocumentId(this.state.document_id);
        };
        this.giveSelectDocumentComplete = () => {
            this.props.getSelectDocumentComplete(true);
        };
        this.state = {};
    }
    //React Lifecycle
    componentDidMount() {
        this.handleShow();
    }
    render() {
        return (React.createElement("div", { id: 'SelectDocument', style: this.handleShow() },
            React.createElement("div", { className: 'documents-header' }, "Select Template Document"),
            React.createElement(DocumentList_1.default, { documents: this.props.documents, selectDocument: this.selectDocument, document_id: this.props.document_id })));
    }
}
exports.default = SelectDocument;
//# sourceMappingURL=SelectDocument.js.map