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

/***/ "./Source/components/CreateDocument/CreateDocumentViews/DocumentPreview/DocumentPreview.tsx":
/*!**************************************************************************************************!*\
  !*** ./Source/components/CreateDocument/CreateDocumentViews/DocumentPreview/DocumentPreview.tsx ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst React = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nconst DocumentView_1 = __webpack_require__(/*! ../../../DocumentView/DocumentView */ \"./Source/components/DocumentView/DocumentView.tsx\");\nconst DocumentPreviewSidebar_1 = __webpack_require__(/*! ./DocumentPreviewSidebar */ \"./Source/components/CreateDocument/CreateDocumentViews/DocumentPreview/DocumentPreviewSidebar.tsx\");\nclass DocumentPreview extends React.Component {\n    constructor(props) {\n        super(props);\n        this.handleShow = () => {\n            if (!this.props.documentPreviewBoolean) {\n                let style = {\n                    display: 'none'\n                };\n                return style;\n            }\n            else {\n                let style = {\n                    display: 'block'\n                };\n                return style;\n            }\n        };\n        this.previewOnClickHandler = (e) => {\n            let id = e.target.id;\n            //Clearing previously selected field\n            if (this.props.currentSelectedField !== undefined) {\n                document.getElementById(this.props.document_meta.indexOf(this.props.currentSelectedField).toString()).classList.remove('selectedField');\n            }\n            document.getElementById(id).classList.add('selectedField');\n            let currentSelectedFieldValue = this.props.document_meta[id].assigned_to;\n            console.log(currentSelectedFieldValue);\n            this.props.handleSelectedFieldId(id);\n            this.showSidebar();\n        };\n        this.handleDocumentNameChange = (e) => {\n            let documentName = this.state.documentName;\n            documentName = e.target.value;\n            this.setState({\n                documentName: documentName\n            }, () => {\n                this.props.getDocumentName(this.state.documentName);\n            });\n        };\n        this.showSidebar = () => {\n            this.setState({\n                showSidebar: true\n            });\n        };\n        this.getHideSidebar = (showSidebar) => {\n            this.setState({\n                showSidebar: showSidebar\n            });\n        };\n        //State management methods\n        this.getDocumentId = () => {\n            this.setState({\n                document_id: this.props.document_id\n            });\n        };\n        this.giveDocumentPreviewComplete = () => {\n            this.props.getDocumentPreviewComplete(true);\n        };\n        this.state = {\n            documentName: String,\n            currentSelectedField: '',\n            userList: []\n        };\n    }\n    //React lifecycle methods\n    componentDidMount() {\n        this.handleShow();\n        this.getDocumentId();\n    }\n    componentWillMount() {\n    }\n    render() {\n        return (React.createElement(\"div\", { id: 'DocumentPreview', style: this.handleShow() },\n            React.createElement(\"div\", { id: 'document-view-container' },\n                React.createElement(\"div\", { id: 'document-view-header' },\n                    React.createElement(\"input\", { placeholder: 'Document Name', onChange: (e) => { this.handleDocumentNameChange(e); }, id: 'document-name-input', type: \"text\" }),\n                    React.createElement(\"div\", { id: 'save-button' }, \"Save File\")),\n                React.createElement(DocumentView_1.default, { document_id: this.props.document_id, view: 'DocumentPreview', previewOnClickHandler: this.previewOnClickHandler })),\n            React.createElement(\"div\", { id: 'show-sidebar-icon-container', onClick: this.showSidebar },\n                React.createElement(\"img\", { id: 'show-sidebar-icon', src: \"/images/left-arrow-1.png\", alt: \"\" })),\n            React.createElement(DocumentPreviewSidebar_1.default, { currentSelectedFieldId: this.props.currentSelectedFieldId, currentSelectedField: this.props.currentSelectedField, showSidebar: this.state.showSidebar, deleteUser: this.props.deleteUser, assignUserToField: this.props.assignUserToField, userList: this.props.userList, getHideSidebar: this.getHideSidebar })));\n    }\n}\nexports.default = DocumentPreview;\n\n\n//# sourceURL=webpack:///./Source/components/CreateDocument/CreateDocumentViews/DocumentPreview/DocumentPreview.tsx?");

/***/ }),

/***/ "./Source/components/MetaBar/MetaBar.tsx":
/*!***********************************************!*\
  !*** ./Source/components/MetaBar/MetaBar.tsx ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst React = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nconst $ = __webpack_require__(/*! jquery */ \"./node_modules/jquery/dist/jquery.js\");\nconst s = __webpack_require__(/*! ./styling/style.sass */ \"./Source/components/MetaBar/styling/style.sass\");\nconst DocumentList_1 = __webpack_require__(/*! ../DocumentList/DocumentList */ \"./Source/components/DocumentList/DocumentList.tsx\");\nconst DocumentView_1 = __webpack_require__(/*! ../DocumentView/DocumentView */ \"./Source/components/DocumentView/DocumentView.tsx\");\nconst About_1 = __webpack_require__(/*! ../About/About */ \"./Source/components/About/About.tsx\");\nconst CreateDocument_1 = __webpack_require__(/*! ../CreateDocument/CreateDocument */ \"./Source/components/CreateDocument/CreateDocument.tsx\");\nconst UploadDocument_1 = __webpack_require__(/*! ../UploadDocument/UploadDocument */ \"./Source/components/UploadDocument/UploadDocument.tsx\");\nconst SignatureView_1 = __webpack_require__(/*! ../SignatureView/SignatureView */ \"./Source/components/SignatureView/SignatureView.tsx\");\nclass MetaBar extends React.Component {\n    constructor(props) {\n        super(props);\n        //========================== Sending/Retrieving Data ==========================\n        this.getCurrentUser = () => __awaiter(this, void 0, void 0, function* () {\n            let user = yield this.props.getCurrentUser();\n            this.setState({\n                user: user\n            });\n        });\n        this.getDocuments = () => __awaiter(this, void 0, void 0, function* () {\n            try {\n                let documentList = yield $.get('/DocumentSave/GetAllDocuments');\n                this.setState({\n                    documentResults: documentList\n                }, () => {\n                    this.populateDocumentLinks();\n                });\n            }\n            catch (e) {\n                Error(e);\n            }\n        });\n        this.getCurrentView = (currentView) => {\n            this.setState({\n                currentView: currentView\n            }, () => {\n                this.props.getCurrentView(this.state.currentView);\n            });\n        };\n        //==================== Handle Notifications ======================\n        this.getNotifications = () => __awaiter(this, void 0, void 0, function* () {\n            try {\n                let response = yield $.get('/Notification');\n                let notificationCount = response.notification_count;\n                this.setState({\n                    notificationCount: notificationCount\n                });\n            }\n            catch (e) {\n                Error(e);\n            }\n        });\n        this.renderNotification = () => {\n            if (this.state.notificationCount <= 0) {\n                return React.createElement(\"img\", { id: 'pending-document-notification', src: \"/images/notification-undefined.png\", alt: \"\", onClick: this.handleDocumentListPress });\n            }\n        };\n        //================= Populating Content on Page ==================\n        this.populateDocumentLinks = () => {\n            let documents = this.state.documentResults.slice();\n            let documentLinks = [];\n            for (let i = 0; i < documents.length; i++) {\n                let documentLink = React.createElement(\"div\", { className: 'document-link', id: documents[i].idDocument, key: i, \"data-params\": { id: documents[i].id, document: documents[i] }, onClick: (e) => { this.handleLinkPress(e); } }, documents[i].name);\n                documentLinks.push(documentLink);\n            }\n            this.setState({\n                documentLinks: documentLinks\n            }, () => {\n                this.handleDocumentListPress();\n            });\n        };\n        //================== OnClick/Button Handlers =================\n        this.handleLinkPress = (e) => __awaiter(this, void 0, void 0, function* () {\n            let document_id = e.target.id;\n            let setFile = yield this.setState({\n                document_id: document_id\n            });\n            let setCurrentView = yield this.setState({\n                currentView: React.createElement(DocumentView_1.default, { document_id: this.state.document_id, view: 'PendingDocuments' })\n            });\n            let getCurrentView = yield this.props.getCurrentView(this.state.currentView);\n        });\n        this.handleDocumentLinkPress = (e) => __awaiter(this, void 0, void 0, function* () {\n            let target = e.target;\n            while (!target.classList.contains('viewable-document')) {\n                target = target.parentNode;\n            }\n            let document_id = target.id;\n            let setFile = yield this.setState({\n                document_id: document_id\n            });\n            let setCurrentView = yield this.setState({\n                currentView: React.createElement(DocumentView_1.default, { document_id: this.state.document_id, view: 'PendingDocuments' })\n            });\n            let getCurrentView = yield this.props.getCurrentView(this.state.currentView);\n        });\n        this.handleMetabarSelectionStyling = (selectedMetabarView, selectedMetabarViewButton) => {\n            //Removing classes from buttons\n            document.getElementById('document-list-metabar-button').classList.remove('metabar-link-selected');\n            document.getElementById('create-document-metabar-button').classList.remove('metabar-link-selected');\n            document.getElementById('upload-document-metabar-button').classList.remove('metabar-link-selected');\n            document.getElementById('signature-page-metabar-button').classList.remove('metabar-link-selected');\n            //Removing classes from triangles\n            document.getElementById('document-list-metabar-triangle').classList.remove('metabar-triangle-selected');\n            document.getElementById('create-document-metabar-triangle').classList.remove('metabar-triangle-selected');\n            document.getElementById('upload-document-metabar-triangle').classList.remove('metabar-triangle-selected');\n            document.getElementById('signature-page-metabar-triangle').classList.remove('metabar-triangle-selected');\n            //Adding class to button and triangle\n            document.getElementById(selectedMetabarView).classList.add('metabar-link-selected');\n            document.getElementById(selectedMetabarViewButton).classList.add('metabar-triangle-selected');\n        };\n        this.handleNewDocumentPress = () => {\n            this.setState({\n                currentView: React.createElement(CreateDocument_1.default, { getCurrentView: this.getCurrentView, documentResults: this.state.documentResults, viewDocument: this.handleDocumentLinkPress })\n            }, () => {\n                this.props.getCurrentView(this.state.currentView);\n                this.handleMetabarSelectionStyling('create-document-metabar-button', 'create-document-metabar-triangle');\n            });\n        };\n        this.handleDocumentListPress = () => {\n            this.setState({\n                currentView: React.createElement(DocumentList_1.default, { documentResults: this.state.documentResults, viewDocument: this.handleDocumentLinkPress })\n            }, () => {\n                this.props.getCurrentView(this.state.currentView);\n                this.handleMetabarSelectionStyling('document-list-metabar-button', 'document-list-metabar-triangle');\n            });\n        };\n        this.handleSignaturePress = () => {\n            this.setState({\n                currentView: React.createElement(SignatureView_1.default, null)\n            }, () => {\n                this.props.getCurrentView(this.state.currentView);\n                this.handleMetabarSelectionStyling('signature-page-metabar-button', 'signature-page-metabar-triangle');\n            });\n        };\n        this.handleUploadDocumentPress = () => {\n            this.setState({\n                currentView: React.createElement(UploadDocument_1.default, null)\n            }, () => {\n                this.props.getCurrentView(this.state.currentView);\n                this.handleMetabarSelectionStyling('upload-document-metabar-button', 'upload-document-metabar-triangle');\n            });\n        };\n        this.handleAboutPress = () => {\n            this.setState({\n                currentView: React.createElement(About_1.default, null)\n            }, () => {\n                this.props.getCurrentView(this.state.currentView);\n            });\n        };\n        this.state = {\n            user: {},\n            currentView: '',\n            documentResults: [],\n            currentDocuments: []\n        };\n    }\n    //==================== React Lifecycle Methods ====================\n    componentDidMount() {\n        this.getDocuments();\n        this.getCurrentUser();\n        this.getNotifications();\n    }\n    componentDidCatch() {\n    }\n    render() {\n        return (React.createElement(\"div\", { id: 'MetaBar' },\n            React.createElement(\"div\", { id: 'logo-container' },\n                React.createElement(\"img\", { id: 'logo', src: '/images/MAPR_logo_edit.png' })),\n            React.createElement(\"div\", { title: 'Pending Documents', className: 'metabar-button-abbr' },\n                this.renderNotification(),\n                React.createElement(\"img\", { id: 'document-list-metabar-button', src: '/images/doc_icon.png', onClick: this.handleDocumentListPress }),\n                React.createElement(\"div\", { id: 'document-list-metabar-triangle', className: 'metabar-triangle' })),\n            React.createElement(\"abbr\", { title: 'Create New Document', className: 'metabar-button-abbr' },\n                React.createElement(\"img\", { id: 'create-document-metabar-button', className: 'metabar-link', src: '/images/new_document-white.png', onClick: this.handleNewDocumentPress }),\n                React.createElement(\"div\", { id: 'create-document-metabar-triangle', className: 'metabar-triangle' })),\n            React.createElement(\"abbr\", { title: 'Upload Document', className: 'metabar-button-abbr' },\n                React.createElement(\"img\", { id: 'upload-document-metabar-button', className: 'metabar-link', src: '/images/upload-document.png', onClick: this.handleUploadDocumentPress }),\n                React.createElement(\"div\", { id: 'upload-document-metabar-triangle', className: 'metabar-triangle' })),\n            React.createElement(\"abbr\", { title: 'Signature Page', className: 'metabar-button-abbr' },\n                React.createElement(\"img\", { id: 'signature-page-metabar-button', className: 'metabar-link', src: '/images/pencil.png', onClick: this.handleSignaturePress }),\n                React.createElement(\"div\", { id: 'signature-page-metabar-triangle', className: 'metabar-triangle' }))));\n    }\n}\nexports.default = MetaBar;\n\n\n//# sourceURL=webpack:///./Source/components/MetaBar/MetaBar.tsx?");

/***/ })

})