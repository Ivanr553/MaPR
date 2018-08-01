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
//Make Cancellable Promises
let makeCancelable = (promise) => __awaiter(this, void 0, void 0, function* () {
    let hasCanceled_ = false;
    const wrappedPromise = new Promise((resolve, reject) => {
        promise.then((val) => hasCanceled_ ? reject({ isCanceled: true }) : resolve(val));
        promise.catch((error) => hasCanceled_ ? reject({ isCanceled: true }) : reject(error));
    });
    return {
        promise: wrappedPromise,
        cancel() {
            hasCanceled_ = true;
        }
    };
});
let getDocumentPromise = (document_id) => __awaiter(this, void 0, void 0, function* () {
    let promise = fetch(`/DocumentSave/GetSubmittedDocumentMeta?submitted_document_id=${document_id}`, { credentials: 'same-origin' });
    let getDocumentResponse = yield makeCancelable(promise);
    return getDocumentResponse;
});
exports.getDocumentPromise = getDocumentPromise;
let getTemplateDocumentPromise = (document_id) => __awaiter(this, void 0, void 0, function* () {
    let promise = fetch(`/DocumentSave/GetDocumentMeta?document_id=${document_id}`, { credentials: 'same-origin' });
    let getDocumentResponse = yield makeCancelable(promise);
    return getDocumentResponse;
});
exports.getTemplateDocumentPromise = getTemplateDocumentPromise;
let getSaveFilePromise = (saveFile) => __awaiter(this, void 0, void 0, function* () {
    let savePromise = fetch(`/DocumentSave/SaveFile`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        credentials: 'same-origin',
        body: JSON.stringify(saveFile)
    });
    let documentSavePromise = yield makeCancelable(savePromise);
    return documentSavePromise;
});
exports.getSaveFilePromise = getSaveFilePromise;
//User Management
let authenticateUser = () => __awaiter(this, void 0, void 0, function* () {
    let request = yield fetch('/Account/WhoAmI', { credentials: 'same-origin' });
    let response = yield request.json();
    if (!response) {
        window.open('/A/App', '_self');
    }
});
exports.authenticateUser = authenticateUser;
let getUser = () => __awaiter(this, void 0, void 0, function* () {
    let request = yield fetch('/Account/WhoAmI', { credentials: 'same-origin' });
    let response = yield request.json();
    return response;
});
exports.getUser = getUser;
let logOff = () => __awaiter(this, void 0, void 0, function* () {
    let request = yield fetch('/Account/Logout', { credentials: 'same-origin' });
    let response = yield request.json();
    if (!response) {
        alert('There was an error with your request');
    }
    else {
        window.open('/A/App', '_self');
    }
});
exports.logOff = logOff;
//# sourceMappingURL=services.js.map