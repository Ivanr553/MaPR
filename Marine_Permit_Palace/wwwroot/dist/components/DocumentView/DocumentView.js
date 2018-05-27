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
const react_pdf_js_1 = require("react-pdf-js");
const $ = require("jquery");
const s = require('./styling/style.sass');
class DocumentView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            numPages: 1,
            pageNumber: 1,
            document: [],
            url: '',
            documentObject: {},
            documentName: ''
        };
    }
    getDocument() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let documentList = yield $.get('/DocumentSave/GetAllDocuments');
                let pdfID = documentList[0].idDocument;
                let pdfURL = `/DocumentSave/GetNewAutoPopulatedFile?document_id=${pdfID}`;
                this.setState({
                    url: pdfURL
                });
            }
            catch (err) {
                console.log('Error:', err);
            }
        });
    }
    populatePage() {
        return __awaiter(this, void 0, void 0, function* () {
            let documentList = yield $.get('/DocumentSave/GetAllDocuments');
            let document_id = documentList[0].idDocument;
            let pdf = yield $.get(`/DocumentSave/GetNewAutoPopulatedFile?document_id=${document_id}`);
            let documentObject = yield $.get(`/DocumentSave/GetDocumentMeta?document_id=${document_id}`);
            let documentFields = [];
            //Document Variables
            //Width: 0.9*85vw
            //Height: auto
            let pdfWidth = documentObject.document_size.right;
            let pdfHeight = documentObject.document_size.height;
            let pdfRatio = pdfHeight / pdfWidth;
            let webWidth = 0.9 * 85; //in vw
            let webHeigth = webWidth * pdfRatio; // in vw
            for (let form in documentObject.document_meta) {
                let currentForm = documentObject.document_meta[form];
                let name = currentForm.field_name;
                while (name.indexOf('_') > -1) {
                    name = name.replace('_', ' ');
                }
                let left = ((currentForm.field_position.position.left) * webWidth) / pdfWidth;
                let top = ((pdfHeight - currentForm.field_position.position.top) * webHeigth) / pdfHeight;
                let height = (currentForm.field_position.position.height * webHeigth) / pdfHeight;
                let width = (currentForm.field_position.position.width * webWidth) / pdfWidth;
                if (name.indexOf('check') === 0) {
                    currentForm.value = false;
                    let newForm = React.createElement("div", { className: 'form-wrapper', style: { position: 'absolute', left: `${left}vw`, top: `${top}vw`, width: `${width}vw`, height: `${height}vw` } },
                        React.createElement("input", { id: form, className: 'document-checkbox', style: {}, type: "checkbox", onChange: (e) => { this.handleFormEdit(e, form); } }));
                    documentFields.push(newForm);
                }
                else {
                    let newForm = React.createElement("div", { className: 'form-wrapper' },
                        React.createElement("input", { id: form, style: { position: 'absolute', left: `${left}vw`, top: `${top}vw`, width: `${width}vw`, height: `${height}vw` }, className: 'document-input', defaultValue: currentForm.value, type: "text", onChange: (e) => { this.handleFormEdit(e, form); } }));
                    documentFields.push(newForm);
                }
            }
            this.setState({
                documentFields: documentFields,
                documentObject: documentObject,
                document_id: document_id
            }, () => {
                console.log(this.state.documentFields);
                console.log(this.state.documentObject);
            });
        });
    }
    handleFormEdit(e, id) {
        return __awaiter(this, void 0, void 0, function* () {
            let documentObject = Object.assign({}, this.state.documentObject);
            let currentForm = documentObject.document_meta[id];
            if (e.target.className === 'document-checkbox') {
                if (currentForm.value != true) {
                    currentForm.value = true;
                }
                else {
                    currentForm.value = false;
                }
            }
            else {
                currentForm.value = e.target.value;
            }
            this.setState({
                documentObject: documentObject
            }, function () {
                return __awaiter(this, void 0, void 0, function* () {
                    // let saveFile = {
                    //     document_meta: this.state.documentObject,
                    //     name: this.state.documentName,
                    //     document_id: this.state.document_id,
                    //     submitted_file_id: ''
                    // }
                    // let saveResult = await $.ajax({
                    //     method: 'POST',
                    //     headers: {
                    //       'Content-Type': 'application/json'
                    //     },
                    //     url: `/DocumentSave/SaveFile`,
                    //     dataType: 'json',
                    //     data: saveFile
                    // })
                    // console.log(saveResult)
                });
            });
        });
    }
    componentDidMount() {
        this.getDocument();
        this.populatePage();
    }
    render() {
        let file = '../../dist/documents/NAVMC10694.pdf';
        return (React.createElement("div", { className: 'DocumentView' },
            React.createElement(react_pdf_js_1.default, { className: 'pdf-image', file: file }),
            React.createElement("div", { id: 'document-form-div' }, this.state.documentFields)));
    }
}
exports.default = DocumentView;
//# sourceMappingURL=DocumentView.js.map