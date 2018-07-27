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
const ToolBar_1 = require("./ToolBar/ToolBar");
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
            let request;
            if (this.props.view === 'PendingDocuments') {
                request = services_1.getDocumentPromise(this.props.document_id);
            }
            if (this.props.view === 'DocumentPreview') {
                request = services_1.getTemplateDocumentPromise(this.props.document_id);
            }
            let documentPromise = yield request;
            this.setState({
                documentPromise: yield documentPromise
            });
            let response = yield documentPromise.promise;
            let documentObject = yield response.json();
            this.setState({
                documentObject: documentObject,
                document_id: this.props.document_id
            });
        });
        this.documentFields = () => {
            let documentObject = this.state.documentObject;
            if (!!!this.state.documentObject) {
                return;
            }
            if (!!this.props.document_meta && !!documentObject) {
                documentObject.document_meta = this.props.document_meta;
            }
            let documentFields = [];
            for (let form in documentObject.document_meta) {
                let document_meta_field = documentObject.document_meta[form];
                let dimensions = this.getDocumentSize(documentObject, document_meta_field.field_position.position.left, document_meta_field.field_position.position.top, document_meta_field.field_position.position.height, document_meta_field.field_position.position.width);
                if (document_meta_field.field_type === 'Checkbox') {
                    if (document_meta_field.value === '') {
                        document_meta_field.value = false;
                    }
                    let newForm = React.createElement(CheckboxInput_1.default, { key: form, id: form, width: dimensions.width, height: dimensions.height, top: dimensions.top, left: dimensions.left, checked: document_meta_field.value, onChange: (e) => { this.handleFormEdit(e, form); }, view: this.props.view, previewOnClickHandler: this.props.previewOnClickHandler });
                    documentFields.push(newForm);
                }
                else if (document_meta_field.field_type === 'Text') {
                    let newForm = React.createElement("div", { key: form, className: 'form-wrapper' },
                        React.createElement(TextInput_1.default, { key: form, id: form, position: 'absolute', border: 'none', width: dimensions.width, height: dimensions.height, top: dimensions.top, left: dimensions.left, value: document_meta_field.value, onChange: (e) => { this.handleFormEdit(e, form); }, view: this.props.view, previewOnClickHandler: this.props.previewOnClickHandler }));
                    documentFields.push(newForm);
                }
                else if (document_meta_field.field_type === 'Signature') {
                    let newForm = React.createElement(SignatureForm_1.default, { key: form, id: form, width: dimensions.width, height: dimensions.height, top: dimensions.top, left: dimensions.left, view: this.props.view, previewOnClickHandler: this.props.previewOnClickHandler, assigned_to: document_meta_field.assigned_to });
                    documentFields.push(newForm);
                }
            }
            return documentFields;
        };
        this.saveFile = () => __awaiter(this, void 0, void 0, function* () {
            let payload_document_meta = [];
            this.state.documentObject.document_meta.forEach(document_meta_field => {
                payload_document_meta.push(Object.assign({}, document_meta_field));
            });
            payload_document_meta.map(document_meta_field => {
                if (!!document_meta_field.field_position) {
                    delete document_meta_field.field_position;
                }
                return document_meta_field;
            });
            let newFile = {
                document_meta: payload_document_meta,
                name: !!this.state.name ? this.state.name : 'New Document',
                submitted_file_id: this.props.document_id
            };
            let request = services_1.getSaveFilePromise(newFile);
            let newFilePromise = yield request;
            this.setState({
                newFilePromise: yield newFilePromise
            });
            let response = yield newFilePromise.promise;
            let saveResult = yield response.json();
            console.log(saveResult);
            if (!this.state.submitted_file_id || this.state.submitted_file_id === null) {
                this.setState({
                    submitted_file_id: saveResult.reason
                });
            }
        });
        //Toolbar functionality
        this.handleApprove = () => {
            alert('Document Approved');
        };
        this.handleSubmit = () => {
            alert('Document Submitted');
        };
        this.state = {
            documentObject: undefined,
            submitted_file_id: '',
            noDocument: false
        };
    }
    handleFormEdit(e, id) {
        return __awaiter(this, void 0, void 0, function* () {
            let documentObject = Object.assign({}, this.state.documentObject);
            let document_meta_field = documentObject.document_meta[id];
            if (e.target.className === 'CheckboxInput') {
                document_meta_field.value = !document_meta_field.value;
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
    //Form Validation
    validateCanSubmit() {
        if (this.props.document_id)
            return false;
    }
    //React Lifecycle Methods
    componentDidMount() {
        if (!!!this.props.document_meta && this.props.view === 'PendingDocuments') {
            services_1.getDocumentPromise(this.props.document_id);
            this.populatePage();
        }
        else {
            this.setState({
                document_meta: this.props.document_meta
            }, () => {
                this.populatePage();
            });
        }
    }
    componentWillUnmount() {
        if (!!this.state.documentPromise) {
            this.state.documentPromise.cancel();
        }
        if (!!this.state.newFilePromise) {
            this.state.newFilePromise.cancel();
        }
    }
    render() {
        let document_id = '../../dist/documents/NAVMC10694.pdf';
        let noDocumentWarning = React.createElement("div", null);
        let toolbar = React.createElement("div", null);
        if (this.state.noDocument) {
            noDocumentWarning = (React.createElement("div", { id: 'document-view-no-document-warning' }, "There is no document selected"));
        }
        if (this.props.view === 'PendingDocuments') {
            toolbar = React.createElement(ToolBar_1.default, { handleApprove: this.handleApprove, handleSubmit: this.handleSubmit, canSubmit: this.validateCanSubmit() });
        }
        return (React.createElement("div", { className: 'DocumentView' },
            noDocumentWarning,
            React.createElement(react_pdf_js_1.default, { className: 'pdf-image', file: document_id }),
            React.createElement("div", { id: 'document-form-div' }, this.documentFields()),
            toolbar));
    }
}
exports.default = DocumentView;
//# sourceMappingURL=DocumentView.js.map