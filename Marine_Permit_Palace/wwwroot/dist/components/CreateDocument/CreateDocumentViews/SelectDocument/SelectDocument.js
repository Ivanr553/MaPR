"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
class SelectDocument extends React.Component {
    constructor(props) {
        super(props);
        this.getDocumentList = (documents) => {
            let documentList = [];
            for (let i = 0; i < documents.length; i++) {
                let document_id = '/dist/documents/' + documents[i].document_id;
                let newDocument = React.createElement("div", { key: i, className: 'viewable-document', id: documents[i].idDocument, onClick: (e) => { this.selectDocument(e); } },
                    React.createElement("div", { className: 'viewable-document-field', id: 'first-field' }, (i + 1) + '.'),
                    React.createElement("div", { className: 'viewable-document-field' }, documents[i].name));
                documentList.push(newDocument);
            }
            this.setState({
                documentList: documentList
            });
        };
        this.selectDocument = (e) => {
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
    componentWillMount() {
        this.getDocumentList(this.props.documents);
    }
    render() {
        return (React.createElement("div", { id: 'SelectDocument' },
            React.createElement("div", { className: 'documents-header' }, "Select Template Document"),
            React.createElement("div", { className: 'document-list-container' }, this.state.documentList)));
    }
}
exports.default = SelectDocument;
//# sourceMappingURL=SelectDocument.js.map