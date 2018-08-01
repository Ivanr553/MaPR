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
                let request = yield fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/pdf; charset=UTF-8'
                    },
                    body: file
                });
                let response = yield request.json();
                console.log(response);
                if (response.status_code === 200) {
                    alert('Upload Successful!');
                }
                else {
                    alert('Error With Upload');
                }
            }
            catch (e) {
                throw new Error(e);
            }
        });
        this.state = {};
    }
    // handleFormSubmit = async (e) => {
    //     e.preventDefault()
    //     try {
    //         let file = this.files.current.files[0]
    //         let url = '/DocumentUpload/Upload'
    //         let request = await fetch(url, {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json; charset=UTF-8'
    //             },
    //             body: file
    //         })
    //         let response = await request.json()
    //     } catch(e) {
    //         Error(e)
    //     }
    // }
    render() {
        return (React.createElement("div", { id: 'UploadDocument', onDragOver: (e) => {
                e.preventDefault();
            } },
            React.createElement("div", { className: 'documents-header' }, "Upload Document"),
            React.createElement("div", { id: 'dropzone', onDrop: (e) => {
                    this.uploadDroppedFile(e);
                } }, "Drop Files Here")));
    }
}
exports.default = UploadDocument;
//# sourceMappingURL=UploadDocument.js.map