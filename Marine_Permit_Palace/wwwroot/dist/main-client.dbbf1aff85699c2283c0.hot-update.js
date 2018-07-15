webpackHotUpdate("main-client",{

/***/ "./Source/components/CreateDocument/CreateDocument.tsx":
/*!*************************************************************!*\
  !*** ./Source/components/CreateDocument/CreateDocument.tsx ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst React = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nconst $ = __webpack_require__(/*! jquery */ \"./node_modules/jquery/dist/jquery.js\");\nconst s = __webpack_require__(/*! ./styling/style.sass */ \"./Source/components/CreateDocument/styling/style.sass\");\nconst SelectPermissions_1 = __webpack_require__(/*! ./CreateDocumentViews/SelectPermissions/SelectPermissions */ \"./Source/components/CreateDocument/CreateDocumentViews/SelectPermissions/SelectPermissions.tsx\");\nconst SelectDocument_1 = __webpack_require__(/*! ./CreateDocumentViews/SelectDocument/SelectDocument */ \"./Source/components/CreateDocument/CreateDocumentViews/SelectDocument/SelectDocument.tsx\");\nconst DocumentPreview_1 = __webpack_require__(/*! ./CreateDocumentViews/DocumentPreview/DocumentPreview */ \"./Source/components/CreateDocument/CreateDocumentViews/DocumentPreview/DocumentPreview.tsx\");\nconst CreateDocumentNavButton_1 = __webpack_require__(/*! ./CreateDocumentNavButton/CreateDocumentNavButton */ \"./Source/components/CreateDocument/CreateDocumentNavButton/CreateDocumentNavButton.tsx\");\n//Main Class\nclass CreateDocument extends React.Component {\n    constructor(props) {\n        super(props);\n        //Views\n        this.handleSelectDocumentView = () => {\n            this.setState({\n                selectDocumentBoolean: true,\n                selectPermissionsBoolean: false,\n                documentPreviewBoolean: false\n            });\n        };\n        this.handleSelectPermissionsView = () => {\n            this.setState({\n                selectDocumentBoolean: false,\n                selectPermissionsBoolean: true,\n                documentPreviewBoolean: false\n            });\n        };\n        this.handleSelectPreviewView = () => {\n            this.setState({\n                selectDocumentBoolean: false,\n                selectPermissionsBoolean: false,\n                documentPreviewBoolean: true\n            });\n        };\n        //State Management Functions\n        //UserList Management\n        this.addUser = () => {\n            let userList;\n            userList = this.state.userList;\n            let user = {\n                name: `Example User ${Math.random()}`,\n                id: Math.random(),\n                assigned_to: null\n            };\n            userList.push(user);\n            let input = document.getElementById('user-search-bar');\n            input.value = '';\n            this.setState({\n                userList: userList\n            }, () => {\n                if (this.state.userList.length > 0) {\n                    this.setState({\n                        selectPermissionsComplete: true\n                    });\n                }\n            });\n        };\n        this.deleteUser = (e) => {\n            let id = e.target.parentNode.id;\n            let userList = this.state.userList;\n            let assignedField;\n            userList.forEach(user => {\n                if (user.id.toString() === id.toString()) {\n                    assignedField = user.assigned_to;\n                    userList.splice(userList.indexOf(user), 1);\n                }\n            });\n            this.removeAssignedUser(assignedField);\n            this.setState({\n                userList: userList\n            }, () => {\n                if (this.state.userList.length < 1) {\n                    this.setState({\n                        selectPermissionsComplete: false\n                    });\n                }\n            });\n        };\n        this.removeAssignedUser = (assignedField) => {\n            let document_meta = this.state.document_meta;\n            document_meta[assignedField].assigned_to = null;\n            this.setState({\n                document_meta: document_meta\n            });\n        };\n        this.assignUserToField = (e) => {\n            let id = e.target.id;\n            let userList = this.state.userList;\n            let document_meta = this.state.document_meta;\n            let user = userList.filter(user => user.id.toString() === id.toString())[0];\n            if (this.state.currentSelectedFieldId !== undefined) {\n                document_meta[this.state.currentSelectedFieldId].assigned_to = user;\n                user.assigned = true;\n            }\n            this.setState({\n                userList: userList,\n                document_meta: document_meta\n            });\n        };\n        this.handleSelectedFieldId = (currentSelectedFieldId) => {\n            this.setState({\n                currentSelectedFieldId: currentSelectedFieldId\n            }, () => {\n                console.log('currentSelectedField:', this.state.currentSelectedFieldId);\n            });\n        };\n        //Code excerpt to allow for promises to be cancelled\n        this.makeCancelable = (promise) => __awaiter(this, void 0, void 0, function* () {\n            let hasCanceled_ = false;\n            const wrappedPromise = new Promise((resolve, reject) => {\n                promise.then((val) => hasCanceled_ ? reject({ isCanceled: true }) : resolve(val));\n                promise.catch((error) => hasCanceled_ ? reject({ isCanceled: true }) : reject(error));\n            });\n            return {\n                promise: wrappedPromise,\n                cancel() {\n                    hasCanceled_ = true;\n                },\n            };\n        });\n        this.getDocument = () => __awaiter(this, void 0, void 0, function* () {\n            let promise = $.get(`/DocumentSave/GetDocumentMeta?document_id=${this.state.document_id}`);\n            let getDocumentResponse = yield this.makeCancelable(promise);\n            this.setState({\n                getDocumentResponse: getDocumentResponse\n            });\n            return getDocumentResponse;\n        });\n        this.getDocumentMeta = () => __awaiter(this, void 0, void 0, function* () {\n            let promise = yield this.getDocument();\n            let documentResponse = yield promise.promise;\n            let document_meta = documentResponse.document_meta;\n            this.setState({\n                document_meta: document_meta\n            }, () => {\n                console.log(this.state.document_meta);\n            });\n        });\n        //State Management\n        this.disableDocumentPreview = () => {\n            if (this.state.selectDocumentComplete && this.state.selectPermissionsComplete) {\n                return false;\n            }\n            else {\n                return true;\n            }\n        };\n        this.getDocumentName = (documentName) => {\n            this.setState({\n                documentName: documentName\n            });\n        };\n        this.getDocumentId = (document_id) => {\n            this.setState({\n                document_id: document_id\n            }, () => {\n                this.getDocumentMeta();\n            });\n        };\n        this.giveDocumentId = () => {\n            return this.state.document_id;\n        };\n        this.getSelectDocumentComplete = (selectDocumentComplete) => {\n            this.setState({\n                selectDocumentComplete: selectDocumentComplete\n            });\n        };\n        this.getSelectPermissionsComplete = (selectPermissionsComplete) => {\n            this.setState({\n                selectPermissionsComplete: selectPermissionsComplete\n            });\n        };\n        this.getDocumentPreviewComplete = (documentPreviewComplete) => {\n            this.setState({\n                documentPreviewComplete: documentPreviewComplete\n            });\n        };\n        this.state = {\n            currentView: '',\n            view: '',\n            document_id: '',\n            documentName: '',\n            userList: [],\n            selectDocumentShow: true,\n            documentPreviewShow: false,\n            selectPermissionsBoolean: false,\n            document_meta: Array\n        };\n    }\n    componentDidUpdate() {\n    }\n    componentWillMount() {\n        this.handleSelectDocumentView();\n    }\n    render() {\n        if (this.state.selectDocumentBoolean) {\n            return (React.createElement(\"div\", { id: 'CreateDocument' },\n                React.createElement(\"div\", { id: 'create-document-nav-bar' },\n                    React.createElement(CreateDocumentNavButton_1.default, { complete: this.state.selectDocumentComplete, id: 'create-document-nav-bar-item-document', innerText: 'Select Document', onClickHandler: this.handleSelectDocumentView, disable: false, selected: this.state.selectDocumentBoolean }),\n                    React.createElement(CreateDocumentNavButton_1.default, { complete: this.state.selectPermissionsComplete, id: 'create-permissions-nav-bar-item-document', innerText: 'Create Permissions', onClickHandler: this.handleSelectPermissionsView, disable: false, selected: this.state.selectPermissionsBoolean }),\n                    React.createElement(CreateDocumentNavButton_1.default, { complete: false, id: 'document-preview-nav-bar-item-document', innerText: 'Preview', onClickHandler: this.handleSelectPreviewView, disable: this.disableDocumentPreview(), selected: this.state.documentPreviewBoolean })),\n                React.createElement(\"div\", { className: 'container' },\n                    React.createElement(SelectDocument_1.default, { selectDocumentBoolean: this.state.selectDocumentBoolean, documents: this.props.documentResults, getDocumentId: this.getDocumentId, getSelectDocumentComplete: this.getSelectDocumentComplete }))));\n        }\n        if (this.state.selectPermissionsBoolean) {\n            return (React.createElement(\"div\", { id: 'CreateDocument' },\n                React.createElement(\"div\", { id: 'create-document-nav-bar' },\n                    React.createElement(CreateDocumentNavButton_1.default, { complete: this.state.selectDocumentComplete, id: 'create-document-nav-bar-item-document', innerText: 'Select Document', onClickHandler: this.handleSelectDocumentView, disable: false, selected: this.state.selectDocumentBoolean }),\n                    React.createElement(CreateDocumentNavButton_1.default, { complete: this.state.selectPermissionsComplete, id: 'create-permissions-nav-bar-item-document', innerText: 'Create Permissions', onClickHandler: this.handleSelectPermissionsView, disable: false, selected: this.state.selectPermissionsBoolean }),\n                    React.createElement(CreateDocumentNavButton_1.default, { complete: false, id: 'document-preview-nav-bar-item-document', innerText: 'Preview', onClickHandler: this.handleSelectPreviewView, disable: this.disableDocumentPreview(), selected: this.state.documentPreviewBoolean })),\n                React.createElement(\"div\", { className: 'container' },\n                    React.createElement(SelectPermissions_1.default, { assignUserToField: this.assignUserToField, selectPermissionsBoolean: this.state.selectPermissionsBoolean, addUser: this.addUser, deleteUser: this.deleteUser, userList: this.state.userList, getSelectPermissionsComplete: this.getSelectPermissionsComplete }))));\n        }\n        if (this.state.documentPreviewBoolean) {\n            return (React.createElement(\"div\", { id: 'CreateDocument' },\n                React.createElement(\"div\", { id: 'create-document-nav-bar' },\n                    React.createElement(CreateDocumentNavButton_1.default, { complete: this.state.selectDocumentComplete, id: 'create-document-nav-bar-item-document', innerText: 'Select Document', onClickHandler: this.handleSelectDocumentView, disable: false, selected: this.state.selectDocumentBoolean }),\n                    React.createElement(CreateDocumentNavButton_1.default, { complete: this.state.selectPermissionsComplete, id: 'create-permissions-nav-bar-item-document', innerText: 'Create Permissions', onClickHandler: this.handleSelectPermissionsView, disable: false, selected: this.state.selectPermissionsBoolean }),\n                    React.createElement(CreateDocumentNavButton_1.default, { complete: false, id: 'document-preview-nav-bar-item-document', innerText: 'Preview', onClickHandler: this.handleSelectPreviewView, disable: this.disableDocumentPreview(), selected: this.state.documentPreviewBoolean })),\n                React.createElement(\"div\", { className: 'container' },\n                    React.createElement(DocumentPreview_1.default, { currentSelectedField: this.state.document_meta[this.state.currentSelectedFieldId], handleSelectedFieldId: this.handleSelectedFieldId, currentSelectedFieldId: this.state.currentSelectedFieldId, deleteUser: this.deleteUser, assignUserToField: this.assignUserToField, documentPreviewBoolean: this.state.documentPreviewBoolean, userList: this.state.userList, document_id: this.state.document_id, document_meta: this.state.document_meta, getDocumentName: this.getDocumentName, getDocumentPreviewComplete: this.getDocumentPreviewComplete }))));\n        }\n    }\n}\nexports.default = CreateDocument;\n\n\n//# sourceURL=webpack:///./Source/components/CreateDocument/CreateDocument.tsx?");

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