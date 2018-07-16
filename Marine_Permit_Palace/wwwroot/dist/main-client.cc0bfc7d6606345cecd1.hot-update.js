webpackHotUpdate("main-client",{

/***/ "./Source/App.tsx":
/*!************************!*\
  !*** ./Source/App.tsx ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst React = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nconst ReactDOM = __webpack_require__(/*! react-dom */ \"./node_modules/react-dom/index.js\");\nconst react_router_dom_1 = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/es/index.js\");\nconst Home_1 = __webpack_require__(/*! ./components/Home/Home */ \"./Source/components/Home/Home.tsx\");\nconst Account_1 = __webpack_require__(/*! ./components/Account/Account */ \"./Source/components/Account/Account.tsx\");\nconst Register_1 = __webpack_require__(/*! ./components/Register/Register */ \"./Source/components/Register/Register.tsx\");\nconst Login_1 = __webpack_require__(/*! ./components/Login/Login */ \"./Source/components/Login/Login.tsx\");\nconst DocumentView_1 = __webpack_require__(/*! ./components/DocumentView/DocumentView */ \"./Source/components/DocumentView/DocumentView.tsx\");\nconst s = __webpack_require__(/*! ./style.sass */ \"./Source/style.sass\");\nclass App extends React.Component {\n    render() {\n        if (true) {\n            module['hot'].accept();\n        }\n        return (React.createElement(\"div\", { id: 'App' },\n            React.createElement(react_router_dom_1.BrowserRouter, null,\n                React.createElement(react_router_dom_1.Switch, null,\n                    React.createElement(react_router_dom_1.Route, { path: '/A/App', exact: true, component: Login_1.default }),\n                    React.createElement(react_router_dom_1.Route, { path: '/A/App/Account', exact: true, component: Account_1.default }),\n                    React.createElement(react_router_dom_1.Route, { path: '/A/App/Register', exact: true, component: Register_1.default }),\n                    React.createElement(react_router_dom_1.Route, { path: '/A/App/Home', exact: true, component: Home_1.default }),\n                    React.createElement(react_router_dom_1.Route, { path: '/A/App/DocumentView', exact: true, component: DocumentView_1.default })))));\n    }\n}\nexports.default = App;\nReactDOM.render(React.createElement(App, null), document.getElementById('react-app'));\n\n\n//# sourceURL=webpack:///./Source/App.tsx?");

/***/ }),

/***/ "./Source/components/DocumentView/DocumentView.tsx":
/*!*********************************************************!*\
  !*** ./Source/components/DocumentView/DocumentView.tsx ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst React = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nconst react_pdf_js_1 = __webpack_require__(/*! react-pdf-js */ \"./node_modules/react-pdf-js/lib/index.js\");\nconst s = __webpack_require__(/*! ./styling/style.sass */ \"./Source/components/DocumentView/styling/style.sass\");\nconst SignatureForm_1 = __webpack_require__(/*! ./UserInputComponents/SignatureForm/SignatureForm */ \"./Source/components/DocumentView/UserInputComponents/SignatureForm/SignatureForm.tsx\");\nconst CheckboxInput_1 = __webpack_require__(/*! ./UserInputComponents/CheckboxInput/CheckboxInput */ \"./Source/components/DocumentView/UserInputComponents/CheckboxInput/CheckboxInput.tsx\");\nconst TextInput_1 = __webpack_require__(/*! ./UserInputComponents/TextInput/TextInput */ \"./Source/components/DocumentView/UserInputComponents/TextInput/TextInput.tsx\");\nconst services_1 = __webpack_require__(/*! ../../services/services */ \"./Source/services/services.ts\");\nclass DocumentView extends React.Component {\n    constructor(props) {\n        super(props);\n        this.checkForDocument = () => {\n            if (this.props.document_id === '') {\n                this.setState({\n                    noDocument: true\n                });\n                return false;\n            }\n            else {\n                this.setState({\n                    noDocument: false\n                });\n                return true;\n            }\n        };\n        this.getDocumentSize = (documentObject) => {\n            let pdfWidth = documentObject.document_size.right;\n            let pdfHeight = documentObject.document_size.height;\n            // let pdfRatio = pdfHeight/pdfWidth\n            let webWidth = 612; //in px\n            let webHeight = 792; // in px\n            return {\n                pdfHeight: pdfHeight,\n                pdfWidth: pdfWidth,\n                webHeight: webHeight,\n                webWidth: webWidth\n            };\n        };\n        this.populatePage = () => __awaiter(this, void 0, void 0, function* () {\n            if (!this.checkForDocument()) {\n                return;\n            }\n            let documentPromise = services_1.getDocumentPromise(this.props.document_id);\n            this.setState({\n                documentPromise: yield documentPromise\n            });\n            let response = yield documentPromise;\n            let documentObject = yield response.promise;\n            let documentFields = [];\n            let dimensions = this.getDocumentSize(documentObject);\n            for (let form in documentObject.document_meta) {\n                let document_meta_field = documentObject.document_meta[form];\n                let name = document_meta_field.field_name;\n                while (name.indexOf('_') > -1) {\n                    name = name.replace('_', ' ');\n                }\n                let left = ((document_meta_field.field_position.position.left) * dimensions.webWidth) / dimensions.pdfWidth;\n                let top = ((dimensions.pdfHeight - document_meta_field.field_position.position.top) * dimensions.webHeight) / dimensions.pdfHeight;\n                let height = (document_meta_field.field_position.position.height * dimensions.webHeight) / dimensions.pdfHeight;\n                let width = (document_meta_field.field_position.position.width * dimensions.webWidth) / dimensions.pdfWidth;\n                if (document_meta_field.field_type === 'Checkbox') {\n                    document_meta_field.value = false;\n                    let newForm = React.createElement(CheckboxInput_1.default, { key: form, id: form, width: width, height: height, top: top, left: left, checked: document_meta_field.value, onChange: (e) => { this.handleFormEdit(e, form); }, view: this.props.view, previewOnClickHandler: this.props.previewOnClickHandler });\n                    documentFields.push(newForm);\n                }\n                else if (document_meta_field.field_type === 'Text') {\n                    let newForm = React.createElement(\"div\", { key: form, className: 'form-wrapper' },\n                        React.createElement(TextInput_1.default, { key: form, id: form, position: 'absolute', border: 'none', width: width, height: height, top: top, left: left, value: document_meta_field.value, onChange: (e) => { this.handleFormEdit(e, form); }, view: this.props.view, previewOnClickHandler: this.props.previewOnClickHandler }));\n                    documentFields.push(newForm);\n                }\n                else if (document_meta_field.field_type === 'Signature') {\n                    let newForm = React.createElement(SignatureForm_1.default, { key: form, id: form, width: width, height: height, top: top, left: left, view: this.props.view, previewOnClickHandler: this.props.previewOnClickHandler });\n                    documentFields.push(newForm);\n                }\n                delete document_meta_field.field_position;\n            }\n            this.setState({\n                documentFields: documentFields,\n                documentObject: documentObject,\n                document_id: this.props.document_id\n            }, () => {\n                this.saveFile();\n            });\n        });\n        this.saveFile = () => __awaiter(this, void 0, void 0, function* () {\n            let saveFile = {\n                document_meta: this.state.documentObject.document_meta,\n                name: (this.state.name !== '' ? this.state.name : 'New Document'),\n                document_id: this.state.document_id,\n                submitted_file_id: this.state.submitted_file_id\n            };\n            let saveFilePromise = services_1.getSaveFilePromise(saveFile);\n            this.setState({\n                saveFilePromise: yield saveFilePromise\n            });\n            let response = yield saveFilePromise;\n            let saveResult = yield response.promise;\n            if (!this.state.submitted_file_id || this.state.submitted_file_id === null) {\n                this.setState({\n                    submitted_file_id: saveResult.reason\n                });\n            }\n        });\n        this.state = {\n            documentObject: {},\n            submitted_file_id: '',\n            noDocument: false\n        };\n    }\n    handleFormEdit(e, id) {\n        return __awaiter(this, void 0, void 0, function* () {\n            let documentObject = Object.assign({}, this.state.documentObject);\n            let document_meta_field = documentObject.document_meta[id];\n            if (e.target.className === 'document-checkbox') {\n                if (document_meta_field.value != true) {\n                    document_meta_field.value = true;\n                }\n                else {\n                    document_meta_field.value = false;\n                }\n            }\n            else {\n                document_meta_field.value = e.target.value;\n            }\n            this.setState({\n                documentObject: documentObject\n            }, () => {\n                this.saveFile();\n            });\n        });\n    }\n    componentDidMount() {\n        services_1.getDocumentPromise(this.props.document_id);\n        this.populatePage();\n    }\n    componentWillUnmount() {\n        if (this.state.documentPromise) {\n            this.state.documentPromise.cancel();\n        }\n        if (this.state.saveFilePromise) {\n            this.state.saveFilePromise.cancel();\n        }\n    }\n    render() {\n        let document_id = '../../dist/documents/NAVMC10694.pdf';\n        let noDocumentWarning = React.createElement(\"div\", null);\n        if (this.state.noDocument) {\n            noDocumentWarning = (React.createElement(\"div\", { id: 'document-view-no-document-warning' }, \"There is no document selected\"));\n        }\n        return (React.createElement(\"div\", { className: 'DocumentView' },\n            noDocumentWarning,\n            React.createElement(react_pdf_js_1.default, { className: 'pdf-image', file: document_id }),\n            React.createElement(\"div\", { id: 'document-form-div' }, this.state.documentFields)));\n    }\n}\nexports.default = DocumentView;\n\n\n//# sourceURL=webpack:///./Source/components/DocumentView/DocumentView.tsx?");

/***/ })

})