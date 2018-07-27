"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const DocumentList_1 = require("../DocumentList/DocumentList");
const s = require('./styling/style.sass');
class PendingDocumentsView extends React.Component {
    constructor(props) {
        super(props);
        this.getDocuments = () => __awaiter(this, void 0, void 0, function* () {
            let request = yield fetch('/DocumentSave/GetAllTemplateDocuments', { credentials: 'same-origin' });
            let response = yield request.json();
            console.log(response);
        });
        this.state = {
            documentList: []
        };
    }
    componentDidMount() {
        this.getDocuments();
    }
    render() {
        return (React.createElement("div", { className: 'DocumentList' },
            React.createElement("div", { className: 'documents-header' }, "Pending Documents"),
            React.createElement(DocumentList_1.default, { documents: this.props.documents, selectDocument: this.props.selectDocument, document_id: this.state.document_id })));
    }
}
exports.default = PendingDocumentsView;
//# sourceMappingURL=PendingDocumentsView.js.map