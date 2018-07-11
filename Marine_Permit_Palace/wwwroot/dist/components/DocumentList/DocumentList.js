"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const s = require('./styling/style.sass');
class DocumentList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            documentList: []
        };
    }
    //Creates list in state of objects to be rendered
    renderDocuments() {
        let documents = this.props.documentResults;
        let documentList = [];
        for (let i = 0; i < documents.length; i++) {
            let file = '/dist/documents/' + documents[i].file;
            let newDocument = React.createElement("div", { key: i, className: 'viewable-document', id: documents[i].idDocument, onClick: (e) => { this.props.viewDocument(e); } },
                React.createElement("div", { className: 'viewable-document-field', id: 'first-field' }, (i + 1) + '.'),
                React.createElement("div", { className: 'viewable-document-field' }, documents[i].name));
            documentList.push(newDocument);
        }
        this.setState({
            documentList: documentList
        });
    }
    componentWillMount() {
        this.renderDocuments();
    }
    render() {
        return (React.createElement("div", { className: 'DocumentList' },
            React.createElement("div", { className: 'documents-header' }, "Pending Documents"),
            React.createElement("div", { className: 'document-list-container' }, this.state.documentList)));
    }
}
exports.default = DocumentList;
//# sourceMappingURL=DocumentList.js.map