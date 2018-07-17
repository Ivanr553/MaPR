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
const $ = require("jquery");
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
    let promise = $.get(`/DocumentSave/GetDocumentMeta?document_id=${document_id}`);
    let getDocumentResponse = yield makeCancelable(promise);
    return getDocumentResponse;
});
exports.getDocumentPromise = getDocumentPromise;
let getSaveFilePromise = (saveFile) => __awaiter(this, void 0, void 0, function* () {
    let savePromise = $.ajax({
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=UTF-8'
        },
        url: `/DocumentSave/SaveFile`,
        dataType: 'json',
        data: JSON.stringify(saveFile)
    });
    let documentSavePromise = yield makeCancelable(savePromise);
    return documentSavePromise;
});
exports.getSaveFilePromise = getSaveFilePromise;
//# sourceMappingURL=services.js.map