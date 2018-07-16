webpackHotUpdate("main-client",{

/***/ "./Source/components/CreateDocument/CreateDocumentViews/DocumentPreview/DocumentPreviewSidebar.tsx":
/*!*********************************************************************************************************!*\
  !*** ./Source/components/CreateDocument/CreateDocumentViews/DocumentPreview/DocumentPreviewSidebar.tsx ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst React = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nconst AddedUserList_1 = __webpack_require__(/*! ../SelectPermissions/AddedUserList */ \"./Source/components/CreateDocument/CreateDocumentViews/SelectPermissions/AddedUserList.tsx\");\nclass DocumentPreviewSidebar extends React.Component {\n    constructor(props) {\n        super(props);\n        this.showSelectedField = () => {\n            if (this.props.currentSelectedField === undefined) {\n                return;\n            }\n            else {\n                return (React.createElement(\"div\", null,\n                    React.createElement(\"div\", { className: 'selected-field-content' },\n                        React.createElement(\"div\", { className: 'selected-field-name' }, this.props.currentSelectedField.field_name),\n                        React.createElement(\"div\", { className: 'selected-field-assigned-user' }, this.props.currentSelectedField.assigned_to !== null ? this.props.currentSelectedField.assigned_to.name : null))));\n            }\n        };\n        //Sidebar Functions\n        this.hideSidebar = () => {\n            let sidebar = document.getElementById('document-view-sidebar');\n            sidebar.classList.add('hide-sidebar');\n            sidebar.classList.remove('show-sidebar');\n            this.giveHideSidebar();\n        };\n        this.showSidebar = () => {\n            let sidebar = document.getElementById('document-view-sidebar');\n            sidebar.classList.add('show-sidebar');\n            sidebar.classList.remove('hide-sidebar');\n        };\n        this.giveHideSidebar = () => {\n            this.props.getHideSidebar(false);\n        };\n        this.state = {};\n    }\n    componentDidUpdate() {\n        if (this.props.showSidebar) {\n            this.showSidebar();\n        }\n    }\n    render() {\n        return (React.createElement(\"div\", { id: 'document-view-sidebar', className: '' },\n            React.createElement(\"div\", { id: 'close-sidebar-icon', onClick: this.hideSidebar }, \"x\"),\n            React.createElement(\"div\", { className: 'preview-documents-header' }, \"Selected Field\"),\n            React.createElement(\"div\", { className: 'selected-field-display-container' }, this.showSelectedField()),\n            React.createElement(\"div\", { className: 'preview-documents-header' }, \"User List\"),\n            React.createElement(\"div\", { id: 'added-users-container-preview' },\n                React.createElement(AddedUserList_1.default, { currentSelectedFieldId: this.props.currentSelectedFieldId, userList: this.props.userList, assignUserToField: this.props.assignUserToField, deleteUser: this.props.deleteUser, isInSidebar: true }))));\n    }\n}\nexports.default = DocumentPreviewSidebar;\n\n\n//# sourceURL=webpack:///./Source/components/CreateDocument/CreateDocumentViews/DocumentPreview/DocumentPreviewSidebar.tsx?");

/***/ }),

/***/ "./Source/components/CreateDocument/CreateDocumentViews/SelectPermissions/AddedUserList.tsx":
/*!**************************************************************************************************!*\
  !*** ./Source/components/CreateDocument/CreateDocumentViews/SelectPermissions/AddedUserList.tsx ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst React = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nconst AddedUser_1 = __webpack_require__(/*! ./AddedUser */ \"./Source/components/CreateDocument/CreateDocumentViews/SelectPermissions/AddedUser.tsx\");\nclass AddedUserList extends React.Component {\n    constructor() {\n        super(...arguments);\n        this.checkForAssignedField = () => {\n            let userList = this.props.userList;\n            let currentSelectedFieldId = this.props.currentSelectedFieldId;\n            userList.forEach(user => {\n                if (user.assigned_to !== null) {\n                    if (user.assigned_to.indexOf(currentSelectedFieldId) >= 0) {\n                        this.setState({\n                            fieldAssigned: true\n                        });\n                    }\n                }\n            });\n        };\n    }\n    renderAddedUsers() {\n        let userList = this.props.userList;\n        let userElementList = [];\n        userList.forEach(user => {\n            userElementList.push(React.createElement(AddedUser_1.default, { key: Math.random(), currentSelectedFieldId: this.props.currentSelectedFieldId, user: user, assignUserToField: e => this.props.assignUserToField(e), deleteUser: this.props.deleteUser, isInSidebar: this.props.isInSidebar }));\n        });\n        return userElementList;\n    }\n    componentDidUpdate() {\n        this.checkForAssignedField();\n    }\n    render() {\n        return (React.createElement(\"div\", { className: 'AddedUserList added-users-container' }, this.renderAddedUsers()));\n    }\n}\nexports.default = AddedUserList;\n\n\n//# sourceURL=webpack:///./Source/components/CreateDocument/CreateDocumentViews/SelectPermissions/AddedUserList.tsx?");

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