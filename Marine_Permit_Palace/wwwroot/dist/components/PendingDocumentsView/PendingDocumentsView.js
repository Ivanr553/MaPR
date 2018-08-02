"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const DocumentList_1 = require("../DocumentList/DocumentList");
require("./styling/style.sass");
class PendingDocumentsView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            documentList: []
        };
    }
    render() {
        return (React.createElement("div", { className: 'DocumentList' },
            React.createElement("div", { className: 'documents-header' }, "Pending Documents"),
            React.createElement(DocumentList_1.default, { documents: this.props.pendingDocumentList, selectDocument: this.props.selectDocument, document_id: this.state.document_id }),
            React.createElement("div", { className: 'documents-header' }, "Completed Documents"),
            React.createElement(DocumentList_1.default, { documents: this.props.completedDocumentList, selectDocument: this.props.selectDocument, document_id: this.state.document_id })));
    }
}
exports.default = PendingDocumentsView;
//# sourceMappingURL=PendingDocumentsView.js.map