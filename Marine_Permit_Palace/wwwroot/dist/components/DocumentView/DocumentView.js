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
const $ = require("jquery");
const s = require('./styling/style.sass');
class DocumentView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            numPages: 1,
            pageNumber: 1,
            document: [],
            url: ''
        };
        // this.onDocumentLoad = this.onDocumentLoad.bind(this)
    }
    getDocument() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let documentList = yield $.get('/DocumentSave/GetAllDocuments');
                let pdfID = documentList[0].idDocument;
                let pdfURL = `/DocumentSave/GetNewAutoPopulatedFile?document_id=${pdfID}`;
                let pdf = yield $.get(`/DocumentSave/GetNewAutoPopulatedFile?document_id=${pdfID}`);
                let blob = new Blob([pdf]);
                let blobURl = window.URL.createObjectURL(blob);
                let that = this;
                // var request = new XMLHttpRequest();
                // request.open("GET", pdfURL, true); 
                // request.responseType = "blob";
                // request.onload = function (e) {
                //     if (this.status === 200) {
                //         let file = window.URL.createObjectURL(this.response)
                //         that.setState({
                //             url: file
                //         }, () => {
                //         })
                //     };
                // };
                // request.send();
            }
            catch (err) {
                console.log('Error:', err);
            }
        });
    }
    populatePage() {
        return __awaiter(this, void 0, void 0, function* () {
            let documentList = yield $.get('/DocumentSave/GetAllDocuments');
            let documentID = documentList[0].idDocument;
            let object = yield $.get(`/DocumentSave/GetDocumentMeta?document_id=${documentID}`);
            let documentFields = [];
            for (let form in object) {
                let currentForm = object[form];
                console.log(currentForm.left);
                let newForm = React.createElement("div", { className: 'document-form', style: {} },
                    React.createElement("div", { className: 'input-form-name' }, currentForm.field_name),
                    React.createElement("input", { className: 'document-input', defaultValue: currentForm.value, type: "text" }));
                documentFields.push(newForm);
            }
            this.setState({
                documentFields: documentFields
            });
        });
    }
    componentDidMount() {
        this.getDocument();
        this.populatePage();
        // this.run()
    }
    render() {
        let file = this.state.url;
        return (React.createElement("div", { className: 'DocumentView' },
            React.createElement("div", { id: 'document-form-div' }, this.state.documentFields)));
    }
}
exports.default = DocumentView;
//# sourceMappingURL=DocumentView.js.map