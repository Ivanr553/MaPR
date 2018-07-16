webpackHotUpdate("main-client",{

/***/ "./Source/services/services.ts":
/*!*************************************!*\
  !*** ./Source/services/services.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\n//Make Cancellable Promises\nlet makeCancelable = (promise) => __awaiter(this, void 0, void 0, function* () {\n    let hasCanceled_ = false;\n    const wrappedPromise = new Promise((resolve, reject) => {\n        promise.then((val) => hasCanceled_ ? reject({ isCanceled: true }) : resolve(val));\n        promise.catch((error) => hasCanceled_ ? reject({ isCanceled: true }) : reject(error));\n    });\n    return {\n        promise: wrappedPromise,\n        cancel() {\n            hasCanceled_ = true;\n        }\n    };\n});\nexports.makeCancelable = makeCancelable;\nlet getDocument = () => __awaiter(this, void 0, void 0, function* () {\n    let promise = $.get(`/DocumentSave/GetDocumentMeta?document_id=${this.props.document_id}`);\n    let getDocumentResponse = yield makeCancelable(promise);\n    this.setState({\n        getDocumentResponse: getDocumentResponse\n    });\n    return getDocumentResponse;\n});\nexports.getDocument = getDocument;\n\n\n//# sourceURL=webpack:///./Source/services/services.ts?");

/***/ })

})