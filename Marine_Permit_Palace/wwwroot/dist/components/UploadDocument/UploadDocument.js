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
class UploadDocument extends React.Component {
    //@ts-ignore
    constructor(props) {
        super(props);
        this.uploadDroppedFile = (e) => __awaiter(this, void 0, void 0, function* () {
            e.preventDefault();
            e.stopPropagation();
            try {
                let file = e.dataTransfer.files[0];
                let url = '/DocumentUpload/Upload';
                let response = yield $.ajax({
                    method: 'POST',
                    url: url,
                    contentType: 'application-pdf',
                    body: file
                });
                console.log(response);
            }
            catch (e) {
                Error(e);
            }
        });
        this.handleFormSubmit = (e) => __awaiter(this, void 0, void 0, function* () {
            e.preventDefault();
            try {
                // @ts-ignore
                let file = this.files.current.files[0];
                let url = '/DocumentUpload/Upload';
                let response = yield $.ajax({
                    method: 'POST',
                    url: url,
                    contentType: 'application-pdf',
                    body: file
                });
                console.log(response);
            }
            catch (e) {
                Error(e);
            }
        });
        this.state = {};
        //@ts-ignore
        this.files = React.createRef();
    }
    render() {
        return (React.createElement("div", { id: 'UploadDocument', onDragOver: (e) => {
                e.preventDefault();
            } },
            React.createElement("div", { className: 'documents-header' }, "Upload Document"),
            React.createElement("div", { id: 'dropzone', onDrop: (e) => {
                    this.uploadDroppedFile(e);
                } }, "Drop Files Here"),
            React.createElement("form", { id: 'file-submition-form', action: "", method: 'post', onSubmit: (e) => this.handleFormSubmit(e) },
                React.createElement("input", { id: 'uploadedFile', type: "file", 
                    //@ts-ignore
                    name: 'file[]', multiple: true, ref: this.files }),
                React.createElement("input", { type: "submit", value: 'Upload' }))));
    }
}
exports.default = UploadDocument;
//# sourceMappingURL=UploadDocument.js.map