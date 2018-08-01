"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
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
        this.selectDocument = (e) => {
            let target = e.target;
            while (!target.classList.contains('document-item')) {
                target = target.parentNode;
            }
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