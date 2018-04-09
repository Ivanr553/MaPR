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
const jquery_1 = require("jquery");
const s = require('./styling/style.sass');
class DocumentView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            numPages: 1,
            pageNumber: 1,
            document: [],
            file: ''
        };
        // this.onDocumentLoad = this.onDocumentLoad.bind(this)
    }
    getDocument() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let session = yield jquery_1.default.post('/checkSession');
                let username = session.username;
                let user = yield jquery_1.default.post('/findUser', { username: username });
                let pdfId = user.pdfs[0];
                console.log(pdfId);
                const pdf = yield jquery_1.default.post('/viewPDF', { id: pdfId });
                let blob = new Blob(pdf, { type: 'application/pdf' });
                let url = URL.createObjectURL(blob);
                this.setState({
                    file: url
                });
            }
            catch (err) {
                console.log('Error:', err);
            }
        });
    }
    componentDidMount() {
        // this.getDocument()
        // this.run()
    }
    render() {
        let file = '/dist/documents/' + this.props.file;
        return (React.createElement("div", { className: 'DocumentView' },
            React.createElement("embed", { width: "100%", height: "100%", "data-name": "plugin", id: "plugin", src: file, type: "application/pdf", title: "", "data-internalinstanceid": '8' })));
    }
}
exports.default = DocumentView;
//# sourceMappingURL=DocumentView.js.map