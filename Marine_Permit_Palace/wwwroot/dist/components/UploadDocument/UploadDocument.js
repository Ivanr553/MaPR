"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const s = require('./styling/style.sass');
class UploadDocument extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }
    render() {
        return (React.createElement("div", { id: 'UploadDocument', onDragOver: (e) => {
                e.preventDefault();
            } },
            React.createElement("div", { id: 'dropzone', onDrop: (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log(e.dataTransfer.files);
                } }, "Drop Files Here"),
            React.createElement("form", { action: "", method: 'post', onSubmit: (e) => {
                    e.preventDefault();
                    // console.log(document.getElementById('uploadedFile').value)
                    console.log(e);
                } },
                React.createElement("input", { id: 'uploadedFile', type: "file", name: 'file[]', multiple: true }),
                React.createElement("input", { type: "submit", value: 'Upload' }))));
    }
}
exports.default = UploadDocument;
//# sourceMappingURL=UploadDocument.js.map