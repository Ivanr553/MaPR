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
const s = require('./styling/style.sass');
const SignatureForm_1 = require("./UserInputComponents/SignatureForm/SignatureForm");
const CheckboxInput_1 = require("./UserInputComponents/CheckboxInput/CheckboxInput");
const TextInput_1 = require("./UserInputComponents/TextInput/TextInput");
const services_1 = require("../../services/services");
class DocumentView extends React.Component {
    constructor(props) {
        super(props);
        this.checkForDocument = () => {
            if (this.props.document_id === '') {
                this.setState({
                    noDocument: true
                });
                return false;
            }
            else {
                this.setState({
                    noDocument: false
                });
                return true;
            }
        };
        this.getDocumentSize = (documentObject, fieldLeft, fieldTop, fieldHeight, fieldWidth) => {
            let pdfWidth = documentObject.document_size.right;
            let pdfHeight = documentObject.document_size.height;
            let webWidth = 612; //in px
            let webHeight = 792; // in px
            let measurements = {
                pdfHeight: pdfHeight,
                pdfWidth: pdfWidth,
                webHeight: webHeight,
                webWidth: webWidth
            };
            let left = ((fieldLeft) * measurements.webWidth) / measurements.pdfWidth;
            let top = ((measurements.pdfHeight - fieldTop) * measurements.webHeight) / measurements.pdfHeight;
            let height = (fieldHeight * measurements.webHeight) / measurements.pdfHeight;
            let width = (fieldWidth * measurements.webWidth) / measurements.pdfWidth;
            return {
                left: left,
                top: top,
                height: height,
                width: width
            };
        };
        this.cleanUpFieldName = (name) => {
            while (name.indexOf('_') > -1) {
                name = name.replace('_', ' ');
            }
            return name;
        };
        this.populatePage = () => __awaiter(this, void 0, void 0, function* () {
            if (!this.checkForDocument()) {
                return;
            }
            let documentPromise = services_1.getDocumentPromise(this.props.document_id);
            this.setState({
                documentPromise: yield documentPromise
            });
            let response = yield documentPromise;
            let documentObject = yield response.promise;
            let documentFields = [];
            for (let form in documentObject.document_meta) {
                let document_meta_field = documentObject.document_meta[form];
                let name = this.cleanUpFieldName(document_meta_field.field_name);
                let dimensions = this.getDocumentSize(documentObject, document_meta_field.field_position.position.left, document_meta_field.field_position.position.top, document_meta_field.field_position.position.height, document_meta_field.field_position.position.width);
                if (document_meta_field.field_type === 'Checkbox') {
                    document_meta_field.value = false;
                    let newForm = React.createElement(CheckboxInput_1.default, { key: form, id: form, width: dimensions.width, height: dimensions.height, top: dimensions.top, left: dimensions.left, checked: document_meta_field.value, onChange: (e) => { this.handleFormEdit(e, form); }, view: this.props.view, previewOnClickHandler: this.props.previewOnClickHandler });
                    documentFields.push(newForm);
                }
                else if (document_meta_field.field_type === 'Text') {
                    let newForm = React.createElement("div", { key: form, className: 'form-wrapper' },
                        React.createElement(TextInput_1.default, { key: form, id: form, position: 'absolute', border: 'none', width: dimensions.width, height: dimensions.height, top: dimensions.top, left: dimensions.left, value: document_meta_field.value, onChange: (e) => { this.handleFormEdit(e, form); }, view: this.props.view, previewOnClickHandler: this.props.previewOnClickHandler }));
                    documentFields.push(newForm);
                }
                else if (document_meta_field.field_type === 'Signature') {
                    let newForm = React.createElement(SignatureForm_1.default, { key: form, id: form, width: dimensions.width, height: dimensions.height, top: dimensions.top, left: dimensions.left, view: this.props.view, previewOnClickHandler: this.props.previewOnClickHandler });
                    documentFields.push(newForm);
                }
                delete document_meta_field.field_position;
            }
            this.setState({
                documentFields: documentFields,
                documentObject: documentObject,
                document_id: this.props.document_id
            }, () => {
                this.saveFile();
            });
        });
        this.saveFile = () => __awaiter(this, void 0, void 0, function* () {
            let saveFile = {
                document_meta: this.state.documentObject.document_meta,
                name: (this.state.name !== '' ? this.state.name : 'New Document'),
                document_id: this.state.document_id,
                submitted_file_id: this.state.submitted_file_id
            };
            let saveFilePromise = services_1.getSaveFilePromise(saveFile);
            this.setState({
                saveFilePromise: yield saveFilePromise
            });
            let response = yield saveFilePromise;
            let saveResult = yield response.promise;
            if (!this.state.submitted_file_id || this.state.submitted_file_id === null) {
                this.setState({
                    submitted_file_id: saveResult.reason
                });
            }
        });
        this.state = {
            documentObject: {},
            submitted_file_id: '',
            noDocument: false
        };
    }
    handleFormEdit(e, id) {
        return __awaiter(this, void 0, void 0, function* () {
            let documentObject = Object.assign({}, this.state.documentObject);
            let document_meta_field = documentObject.document_meta[id];
            if (e.target.className === 'document-checkbox') {
                if (document_meta_field.value != true) {
                    document_meta_field.value = true;
                }
                else {
                    document_meta_field.value = false;
                }
            }
            else {
                document_meta_field.value = e.target.value;
            }
            this.setState({
                documentObject: documentObject
            }, () => {
                this.saveFile();
            });
        });
    }
    componentDidMount() {
        services_1.getDocumentPromise(this.props.document_id);
        this.populatePage();
    }
    componentWillUnmount() {
        if (this.state.documentPromise) {
            this.state.documentPromise.cancel();
        }
        if (this.state.saveFilePromise) {
            this.state.saveFilePromise.cancel();
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