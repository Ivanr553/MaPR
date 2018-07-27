"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const DocumentItem_1 = require("./DocumentItem/DocumentItem");
const s = require('./styling/style.sass');
class DocumentList extends React.Component {
    constructor(props) {
        super(props);
        //Creates list in state of objects to be rendered
        this.getDocumentList = (documents) => {
            return (documents.map((document) => {
                return (React.createElement(DocumentItem_1.default, { key: Math.random(), document: document, selectDocument: this.props.selectDocument, selectedDocument: this.props.document_id }));
            }));
        };
        this.state = {
            documentList: []
        };
    }
    render() {
        return (React.createElement("div", { className: 'document-list-container' }, this.getDocumentList(this.props.documents)));
    }
}
exports.default = DocumentList;
//# sourceMappingURL=DocumentList.js.map