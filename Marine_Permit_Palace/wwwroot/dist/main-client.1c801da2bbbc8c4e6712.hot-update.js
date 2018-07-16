webpackHotUpdate("main-client",{

/***/ "./Source/components/CreateDocument/CreateDocument.tsx":
/*!*************************************************************!*\
  !*** ./Source/components/CreateDocument/CreateDocument.tsx ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst React = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nconst $ = __webpack_require__(/*! jquery */ \"./node_modules/jquery/dist/jquery.js\");\nconst s = __webpack_require__(/*! ./styling/style.sass */ \"./Source/components/CreateDocument/styling/style.sass\");\nconst SelectPermissions_1 = __webpack_require__(/*! ./CreateDocumentViews/SelectPermissions/SelectPermissions */ \"./Source/components/CreateDocument/CreateDocumentViews/SelectPermissions/SelectPermissions.tsx\");\nconst SelectDocument_1 = __webpack_require__(/*! ./CreateDocumentViews/SelectDocument/SelectDocument */ \"./Source/components/CreateDocument/CreateDocumentViews/SelectDocument/SelectDocument.tsx\");\nconst DocumentPreview_1 = __webpack_require__(/*! ./CreateDocumentViews/DocumentPreview/DocumentPreview */ \"./Source/components/CreateDocument/CreateDocumentViews/DocumentPreview/DocumentPreview.tsx\");\nconst CreateDocumentNavButton_1 = __webpack_require__(/*! ./CreateDocumentNavButton/CreateDocumentNavButton */ \"./Source/components/CreateDocument/CreateDocumentNavButton/CreateDocumentNavButton.tsx\");\n//Main Class\nclass CreateDocument extends React.Component {\n    constructor(props) {\n        super(props);\n        //Views\n        this.handleSelectDocumentView = () => {\n            this.setState({\n                selectDocumentBoolean: true,\n                selectPermissionsBoolean: false,\n                documentPreviewBoolean: false\n            });\n        };\n        this.handleSelectPermissionsView = () => {\n            this.setState({\n                selectDocumentBoolean: false,\n                selectPermissionsBoolean: true,\n                documentPreviewBoolean: false\n            });\n        };\n        this.handleSelectPreviewView = () => {\n            this.setState({\n                selectDocumentBoolean: false,\n                selectPermissionsBoolean: false,\n                documentPreviewBoolean: true\n            });\n        };\n        //State Management Functions\n        //UserList Management\n        this.addUser = () => {\n            let userList;\n            userList = this.state.userList;\n            let user = {\n                name: `Example User ${Math.random()}`,\n                id: Math.random(),\n                assigned_to: null\n            };\n            userList.push(user);\n            let input = document.getElementById('user-search-bar');\n            input.value = '';\n            this.setState({\n                userList: userList\n            }, () => {\n                if (this.state.userList.length > 0) {\n                    this.setState({\n                        selectPermissionsComplete: true\n                    });\n                }\n            });\n        };\n        this.deleteUser = (e) => {\n            let id = e.target.parentNode.id;\n            let userList = this.state.userList;\n            let assignedField;\n            userList.forEach(user => {\n                if (user.id.toString() === id.toString()) {\n                    assignedField = user.assigned_to;\n                    userList.splice(userList.indexOf(user), 1);\n                }\n            });\n            this.removeAssignedUser(assignedField);\n            this.setState({\n                userList: userList\n            }, () => {\n                if (this.state.userList.length < 1) {\n                    this.setState({\n                        selectPermissionsComplete: false\n                    });\n                }\n            });\n        };\n        this.removeAssignedUser = (assignedField) => {\n            let document_meta = this.state.document_meta;\n            document_meta[assignedField].assigned_to = null;\n            this.setState({\n                document_meta: document_meta\n            });\n        };\n        this.assignUserToField = (e) => {\n            let id = e.target.id;\n            let userList = this.state.userList;\n            let document_meta = this.state.document_meta;\n            let user = userList.filter(user => user.id.toString() === id.toString())[0];\n            if (user.assigned_to === null) {\n                user.assigned_to = [];\n            }\n            if (!this.assignUserToFieldChecks(id)) {\n                return;\n            }\n            user.assigned_to.push(this.state.currentSelectedFieldId);\n            document_meta[this.state.currentSelectedFieldId].assigned_to = user;\n            this.setState({\n                userList: userList,\n                document_meta: document_meta\n            });\n        };\n        this.assignUserToFieldChecks = (id) => {\n            let userList = this.state.userList;\n            let document_meta = this.state.document_meta;\n            let user = userList.filter(user => user.id.toString() === id.toString())[0];\n            if (this.state.currentSelectedFieldId === undefined) {\n                alert('Select field before assigning user');\n                return false;\n            }\n            //Checking if user has already been assigned this field\n            if (user.assigned_to.indexOf(this.state.currentSelectedFieldId) >= 0) {\n                return false;\n            }\n            //Checking if a user has already been assigned to a field\n            if (document_meta[this.state.currentSelectedFieldId].assigned_to !== null) {\n                return false;\n            }\n            return true;\n        };\n        this.handleSelectedFieldId = (currentSelectedFieldId) => {\n            this.setState({\n                currentSelectedFieldId: currentSelectedFieldId\n            });\n        };\n        //Code excerpt to allow for promises to be cancelled\n        this.makeCancelable = (promise) => __awaiter(this, void 0, void 0, function* () {\n            let hasCanceled_ = false;\n            const wrappedPromise = new Promise((resolve, reject) => {\n                promise.then((val) => hasCanceled_ ? reject({ isCanceled: true }) : resolve(val));\n                promise.catch((error) => hasCanceled_ ? reject({ isCanceled: true }) : reject(error));\n            });\n            return {\n                promise: wrappedPromise,\n                cancel() {\n                    hasCanceled_ = true;\n                },\n            };\n        });\n        this.getDocument = () => __awaiter(this, void 0, void 0, function* () {\n            let promise = $.get(`/DocumentSave/GetDocumentMeta?document_id=${this.state.document_id}`);\n            let getDocumentResponse = yield this.makeCancelable(promise);\n            this.setState({\n                getDocumentResponse: getDocumentResponse\n            });\n            return getDocumentResponse;\n        });\n        this.getDocumentMeta = () => __awaiter(this, void 0, void 0, function* () {\n            let promise = yield this.getDocument();\n            let documentResponse = yield promise.promise;\n            let document_meta = documentResponse.document_meta;\n            this.setState({\n                document_meta: document_meta\n            });\n        });\n        //State Management\n        this.disableDocumentPreview = () => {\n            if (this.state.selectDocumentComplete && this.state.selectPermissionsComplete) {\n                return false;\n            }\n            else {\n                return true;\n            }\n        };\n        this.getDocumentName = (documentName) => {\n            this.setState({\n                documentName: documentName\n            });\n        };\n        this.getDocumentId = (document_id) => {\n            this.setState({\n                document_id: document_id\n            }, () => {\n                this.getDocumentMeta();\n            });\n        };\n        this.giveDocumentId = () => {\n            return this.state.document_id;\n        };\n        this.getSelectDocumentComplete = (selectDocumentComplete) => {\n            this.setState({\n                selectDocumentComplete: selectDocumentComplete\n            });\n        };\n        this.getSelectPermissionsComplete = (selectPermissionsComplete) => {\n            this.setState({\n                selectPermissionsComplete: selectPermissionsComplete\n            });\n        };\n        this.getDocumentPreviewComplete = (documentPreviewComplete) => {\n            this.setState({\n                documentPreviewComplete: documentPreviewComplete\n            });\n        };\n        this.state = {\n            currentView: '',\n            view: '',\n            document_id: '',\n            documentName: '',\n            userList: [],\n            selectDocumentShow: true,\n            documentPreviewShow: false,\n            selectPermissionsBoolean: false,\n            document_meta: Array\n        };\n    }\n    componentDidUpdate() {\n    }\n    componentWillMount() {\n        this.handleSelectDocumentView();\n    }\n    render() {\n        if (this.state.selectDocumentBoolean) {\n            return (React.createElement(\"div\", { id: 'CreateDocument' },\n                React.createElement(\"div\", { id: 'create-document-nav-bar' },\n                    React.createElement(CreateDocumentNavButton_1.default, { complete: this.state.selectDocumentComplete, id: 'create-document-nav-bar-item-document', innerText: 'Select Document', onClickHandler: this.handleSelectDocumentView, disable: false, selected: this.state.selectDocumentBoolean }),\n                    React.createElement(CreateDocumentNavButton_1.default, { complete: this.state.selectPermissionsComplete, id: 'create-permissions-nav-bar-item-document', innerText: 'Create Permissions', onClickHandler: this.handleSelectPermissionsView, disable: false, selected: this.state.selectPermissionsBoolean }),\n                    React.createElement(CreateDocumentNavButton_1.default, { complete: false, id: 'document-preview-nav-bar-item-document', innerText: 'Preview', onClickHandler: this.handleSelectPreviewView, disable: this.disableDocumentPreview(), selected: this.state.documentPreviewBoolean })),\n                React.createElement(\"div\", { className: 'container' },\n                    React.createElement(SelectDocument_1.default, { selectDocumentBoolean: this.state.selectDocumentBoolean, documents: this.props.documentResults, getDocumentId: this.getDocumentId, getSelectDocumentComplete: this.getSelectDocumentComplete }))));\n        }\n        if (this.state.selectPermissionsBoolean) {\n            return (React.createElement(\"div\", { id: 'CreateDocument' },\n                React.createElement(\"div\", { id: 'create-document-nav-bar' },\n                    React.createElement(CreateDocumentNavButton_1.default, { complete: this.state.selectDocumentComplete, id: 'create-document-nav-bar-item-document', innerText: 'Select Document', onClickHandler: this.handleSelectDocumentView, disable: false, selected: this.state.selectDocumentBoolean }),\n                    React.createElement(CreateDocumentNavButton_1.default, { complete: this.state.selectPermissionsComplete, id: 'create-permissions-nav-bar-item-document', innerText: 'Create Permissions', onClickHandler: this.handleSelectPermissionsView, disable: false, selected: this.state.selectPermissionsBoolean }),\n                    React.createElement(CreateDocumentNavButton_1.default, { complete: false, id: 'document-preview-nav-bar-item-document', innerText: 'Preview', onClickHandler: this.handleSelectPreviewView, disable: this.disableDocumentPreview(), selected: this.state.documentPreviewBoolean })),\n                React.createElement(\"div\", { className: 'container' },\n                    React.createElement(SelectPermissions_1.default, { currentSelectedFieldId: this.state.currentSelectedFieldId, assignUserToField: this.assignUserToField, selectPermissionsBoolean: this.state.selectPermissionsBoolean, addUser: this.addUser, deleteUser: this.deleteUser, userList: this.state.userList, getSelectPermissionsComplete: this.getSelectPermissionsComplete }))));\n        }\n        if (this.state.documentPreviewBoolean) {\n            return (React.createElement(\"div\", { id: 'CreateDocument' },\n                React.createElement(\"div\", { id: 'create-document-nav-bar' },\n                    React.createElement(CreateDocumentNavButton_1.default, { complete: this.state.selectDocumentComplete, id: 'create-document-nav-bar-item-document', innerText: 'Select Document', onClickHandler: this.handleSelectDocumentView, disable: false, selected: this.state.selectDocumentBoolean }),\n                    React.createElement(CreateDocumentNavButton_1.default, { complete: this.state.selectPermissionsComplete, id: 'create-permissions-nav-bar-item-document', innerText: 'Create Permissions', onClickHandler: this.handleSelectPermissionsView, disable: false, selected: this.state.selectPermissionsBoolean }),\n                    React.createElement(CreateDocumentNavButton_1.default, { complete: false, id: 'document-preview-nav-bar-item-document', innerText: 'Preview', onClickHandler: this.handleSelectPreviewView, disable: this.disableDocumentPreview(), selected: this.state.documentPreviewBoolean })),\n                React.createElement(\"div\", { className: 'container' },\n                    React.createElement(DocumentPreview_1.default, { currentSelectedField: this.state.document_meta[this.state.currentSelectedFieldId], handleSelectedFieldId: this.handleSelectedFieldId, currentSelectedFieldId: this.state.currentSelectedFieldId, deleteUser: this.deleteUser, assignUserToField: this.assignUserToField, documentPreviewBoolean: this.state.documentPreviewBoolean, userList: this.state.userList, document_id: this.state.document_id, document_meta: this.state.document_meta, getDocumentName: this.getDocumentName, getDocumentPreviewComplete: this.getDocumentPreviewComplete }))));\n        }\n    }\n}\nexports.default = CreateDocument;\n\n\n//# sourceURL=webpack:///./Source/components/CreateDocument/CreateDocument.tsx?");

/***/ }),

/***/ "./Source/components/CreateDocument/CreateDocumentViews/SelectPermissions/AddedUserList.tsx":
/*!**************************************************************************************************!*\
  !*** ./Source/components/CreateDocument/CreateDocumentViews/SelectPermissions/AddedUserList.tsx ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst React = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nconst AddedUser_1 = __webpack_require__(/*! ./AddedUser */ \"./Source/components/CreateDocument/CreateDocumentViews/SelectPermissions/AddedUser.tsx\");\nclass AddedUserList extends React.Component {\n    renderAddedUsers() {\n        let userList = this.props.userList;\n        let userElementList = [];\n        userList.forEach(user => {\n            userElementList.push(React.createElement(AddedUser_1.default, { key: Math.random(), currentSelectedFieldId: this.props.currentSelectedFieldId, user: user, assignUserToField: e => this.props.assignUserToField(e), deleteUser: this.props.deleteUser, isInSidebar: this.props.isInSidebar }));\n        });\n        return userElementList;\n    }\n    render() {\n        return (React.createElement(\"div\", { className: 'AddedUserList added-users-container' }, this.renderAddedUsers()));\n    }\n}\nexports.default = AddedUserList;\n\n\n//# sourceURL=webpack:///./Source/components/CreateDocument/CreateDocumentViews/SelectPermissions/AddedUserList.tsx?");

/***/ }),

/***/ "./Source/components/CreateDocument/CreateDocumentViews/SelectPermissions/SelectPermissions.tsx":
/*!******************************************************************************************************!*\
  !*** ./Source/components/CreateDocument/CreateDocumentViews/SelectPermissions/SelectPermissions.tsx ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nvar __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst React = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nconst AddedUserList_1 = __webpack_require__(/*! ./AddedUserList */ \"./Source/components/CreateDocument/CreateDocumentViews/SelectPermissions/AddedUserList.tsx\");\nconst $ = __webpack_require__(/*! jquery */ \"./node_modules/jquery/dist/jquery.js\");\nclass SelectPermissions extends React.Component {\n    constructor(props) {\n        super(props);\n        this.handleShow = () => {\n            if (!this.props.selectPermissionsBoolean) {\n                let style = {\n                    display: 'none'\n                };\n                return style;\n            }\n            else {\n                let style = {\n                    display: 'block'\n                };\n                return style;\n            }\n        };\n        //Finding and displaying added users\n        this.handleFindUser = (e) => __awaiter(this, void 0, void 0, function* () {\n            let query = e.target.value;\n            if (query === '') {\n                this.clearUsersFromSearch();\n                return;\n            }\n            try {\n                let result = yield $.get(`/Account/FindUsers?search=${query}`);\n                //No users yet, will just use fake ones for now  \n                let userArray = ['user1', 'user2', 'user3'];\n                this.displayUsersFromSearch(userArray);\n            }\n            catch (e) {\n                console.log(e);\n            }\n        });\n        this.clearUsersFromSearch = () => {\n            setTimeout(() => {\n                this.setState({\n                    userSearchResults: ''\n                });\n            }, 150);\n        };\n        this.displayUsersFromSearch = (userArray) => {\n            let userSearchResultsArray = [];\n            for (let i = 0; i < userArray.length; i++) {\n                let userSearchResult = (React.createElement(\"li\", { key: i, className: 'user-search-result', onClick: this.props.addUser }, userArray[i]));\n                userSearchResultsArray.push(userSearchResult);\n            }\n            let userSearchResults = (React.createElement(\"ul\", { id: 'user-search-results-list' }, userSearchResultsArray));\n            this.setState({\n                userSearchResults: userSearchResults\n            });\n        };\n        //State Management\n        this.giveSelectPermissionsComplete = selectPermissionsComplete => {\n            this.props.getSelectPermissionsComplete(selectPermissionsComplete);\n        };\n        this.state = {\n            userObjects: [],\n            userList: []\n        };\n    }\n    componentDidMount() {\n        this.handleShow();\n    }\n    render() {\n        return (React.createElement(\"div\", { id: 'SelectPermissions', style: this.handleShow() },\n            React.createElement(\"div\", { id: 'select-users-header', className: 'documents-header' }, \"Select Users\"),\n            React.createElement(\"div\", { className: 'document-list-container' },\n                React.createElement(\"div\", { id: 'user-search-main-container' },\n                    React.createElement(\"div\", { id: 'user-search-bar-container' },\n                        React.createElement(\"div\", { id: 'search-bar-magnifying-glass' }),\n                        React.createElement(\"input\", { onBlur: this.clearUsersFromSearch, onFocus: (e) => { this.handleFindUser(e); }, onChange: (e) => { this.handleFindUser(e); }, id: 'user-search-bar', placeholder: 'Find Users', type: \"text\" }),\n                        this.state.userSearchResults),\n                    React.createElement(\"div\", { id: 'added-users-title' }, \"Selected Users\"),\n                    React.createElement(AddedUserList_1.default, { currentSelectedFieldId: this.props.currentSelectedFieldId, userList: this.props.userList, assignUserToField: this.props.assignUserToField, deleteUser: this.props.deleteUser, isInSidebar: false })))));\n    }\n}\nexports.default = SelectPermissions;\n\n\n//# sourceURL=webpack:///./Source/components/CreateDocument/CreateDocumentViews/SelectPermissions/SelectPermissions.tsx?");

/***/ })

})