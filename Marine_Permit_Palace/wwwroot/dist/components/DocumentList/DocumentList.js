"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_pdf_js_1 = require("react-pdf-js");
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
            let newDocument = React.createElement("div", { className: 'viewable-document', key: i, id: documents[i].file, onClick: (e) => { this.props.viewDocument(e); } },
                React.createElement("div", { className: 'pdf-preview-container' },
                    React.createElement(react_pdf_js_1.default, { className: 'pdf-preview', file: file }),
                    React.createElement("div", { className: 'pdf-preview-shader' })),
                React.createElement("div", { className: 'viewable-document-title' }, documents[i].title));
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
            React.createElement("div", { className: 'documents-header' }, "Documents"),
            this.state.documentList));
    }
}
exports.default = DocumentList;
//# sourceMappingURL=DocumentList.js.map