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
const SignatureForm_1 = require("./UserInputComponents/SignatureForm/SignatureForm");
const CheckboxInput_1 = require("./UserInputComponents/CheckboxInput/CheckboxInput");
const TextInput_1 = require("./UserInputComponents/TextInput/TextInput");
class DocumentView extends React.Component {
    constructor(props) {
        super(props);
        //Code excerpt to allow for promises to be cancelled
        this.makeCancelable = (promise) => __awaiter(this, void 0, void 0, function* () {
            let hasCanceled_ = false;
            const wrappedPromise = new Promise((resolve, reject) => {
                promise.then((val) => hasCanceled_ ? reject({ isCanceled: true }) : resolve(val));
                promise.catch((error) => hasCanceled_ ? reject({ isCanceled: true }) : reject(error));
            });
            return {
                promise: wrappedPromise,
                cancel() {
                    hasCanceled_ = true;
                },
            };
        });
        this.getDocument = (document_id) => __awaiter(this, void 0, void 0, function* () {
            let promise = $.get(`/DocumentSave/GetDocumentMeta?document_id=${this.props.document_id}`);
            let getDocumentResponse = yield this.makeCancelable(promise);
            this.setState({
                getDocumentResponse: getDocumentResponse
            });
            return getDocumentResponse;
        });
        this.saveFileResponse = (saveFile) => __awaiter(this, void 0, void 0, function* () {
            try {
                let saveResult = $.ajax({
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8'
                    },
                    url: `/DocumentSave/SaveFile`,
                    dataType: 'json',
                    data: JSON.stringify(saveFile)
                });
                let saveFileResponse = yield this.makeCancelable(saveResult);
                this.setState({
                    saveFileResponse: saveFileResponse
                });
                return saveFileResponse;
            }
            catch (e) {
                console.log('Error saving:', e);
            }
        });
        this.populatePage = () => __awaiter(this, void 0, void 0, function* () {
            if (this.props.document_id === '') {
                this.setState({
                    noDocument: true
                });
                return;
            }
            else {
                this.setState({
                    noDocument: false
                });
            }
            let promise = yield this.getDocument(this.props.document_id);
            let documentObject = yield promise.promise;
            console.log(documentObject);
            let documentFields = [];
            let pdfWidth = documentObject.document_size.right;
            let pdfHeight = documentObject.document_size.height;
            let pdfRatio = pdfHeight / pdfWidth;
            let webWidth = 612; //in px
            let webHeigth = 792; // in px
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
                if (currentForm.field_type === 'Checkbox') {
                    currentForm.value = false;
                    let newForm = React.createElement(CheckboxInput_1.default, { key: form, id: form, width: width, height: height, top: top, left: left, checked: currentForm.value, onChange: (e) => { this.handleFormEdit(e, form); }, view: this.props.view, previewOnClickHandler: this.props.previewOnClickHandler });
                    documentFields.push(newForm);
                }
                else if (currentForm.field_type === 'Text') {
                    let newForm = React.createElement("div", { key: form, className: 'form-wrapper' },
                        React.createElement(TextInput_1.default, { key: form, id: form, position: 'absolute', border: 'none', width: width, height: height, top: top, left: left, value: currentForm.value, onChange: (e) => { this.handleFormEdit(e, form); }, view: this.props.view, previewOnClickHandler: this.props.previewOnClickHandler }));
                    documentFields.push(newForm);
                }
                else if (currentForm.field_type === 'Signature') {
                    let newForm = React.createElement(SignatureForm_1.default, { key: form, id: form, width: width, height: height, top: top, left: left, view: this.props.view, previewOnClickHandler: this.props.previewOnClickHandler });
                    documentFields.push(newForm);
                }
                delete currentForm.field_position;
            }
            this.setState({
                documentFields: documentFields,
                documentObject: documentObject,
                document_id: this.props.document_id
            }, () => {
                this.saveFile();
            });
        });
        this.state = {
            numPages: 1,
            pageNumber: 1,
            document: [],
            url: '',
            documentObject: {},
            documentName: 'document',
            submitted_file_id: '',
            noDocument: false,
            mounted: null
        };
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
            }, () => {
                this.saveFile();
            });
        });
    }
    saveFile() {
        return __awaiter(this, void 0, void 0, function* () {
            let saveFile = {
                document_meta: this.state.documentObject.document_meta,
                name: this.state.documentName,
                document_id: this.state.document_id,
                submitted_file_id: this.state.submitted_file_id
            };
            let promise = yield this.saveFileResponse(saveFile);
            let saveResult = yield promise.promise;
            if (!this.state.submitted_file_id || this.state.submitted_file_id === null) {
                this.setState({
                    submitted_file_id: saveResult.reason
                }, () => {
                    console.log(this.state.submitted_file_id);
                });
            }
        });
    }
    componentWillMount() {
        this.populatePage();
    }
    componentWillUnmount() {
        if (this.state.getDocumentResponse) {
            this.state.getDocumentResponse.cancel();
        }
        if (this.state.saveFileResponse) {
            this.state.saveFileResponse.cancel();
        }
    }
    render() {
        let document_id = '../../dist/documents/NAVMC10694.pdf';
        let noDocumentWarning = React.createElement("div", null);
        if (this.state.noDocument) {
            noDocumentWarning = (React.createElement("div", { id: 'document-view-no-document-warning' }, "There is no document selected"));
        }
        return (React.createElement("div", { className: 'DocumentView' },
            noDocumentWarning,
            React.createElement(react_pdf_js_1.default, { className: 'pdf-image', file: document_id }),
            React.createElement("div", { id: 'document-form-div' }, this.state.documentFields)));
    }
}
exports.default = DocumentView;
//# sourceMappingURL=DocumentView.js.map