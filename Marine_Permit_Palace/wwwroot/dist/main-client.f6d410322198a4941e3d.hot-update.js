webpackHotUpdate("main-client",{

/***/ "./Source/components/CreateDocument/CreateDocumentViews/SelectPermissions/AddedUserList.tsx":
/*!**************************************************************************************************!*\
  !*** ./Source/components/CreateDocument/CreateDocumentViews/SelectPermissions/AddedUserList.tsx ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst React = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nconst AddedUser_1 = __webpack_require__(/*! ./AddedUser */ \"./Source/components/CreateDocument/CreateDocumentViews/SelectPermissions/AddedUser.tsx\");\nclass AddedUserList extends React.Component {\n    constructor(props) {\n        super(props);\n        this.checkForAssignedField = () => {\n            let userList = this.props.userList;\n            let currentSelectedFieldId = this.props.currentSelectedFieldId;\n            userList.forEach(user => {\n                if (user.assigned_to !== null) {\n                    if (user.assigned_to.indexOf(currentSelectedFieldId) >= 0) {\n                        this.setState({\n                            fieldAssigned: true\n                        }, () => {\n                            console.log('set:', this.state.fieldAssigned);\n                        });\n                        return;\n                    }\n                }\n            });\n        };\n        this.state = {\n            fieldAssigned: false\n        };\n    }\n    renderAddedUsers() {\n        let userList = this.props.userList;\n        let userElementList = [];\n        userList.forEach(user => {\n            userElementList.push(React.createElement(AddedUser_1.default, { key: Math.random(), fieldAssigned: this.state.fieldAssigned, currentSelectedFieldId: this.props.currentSelectedFieldId, user: user, assignUserToField: e => this.props.assignUserToField(e), deleteUser: this.props.deleteUser, isInSidebar: this.props.isInSidebar }));\n        });\n        return userElementList;\n    }\n    componentDidMount() {\n        this.checkForAssignedField();\n    }\n    render() {\n        return (React.createElement(\"div\", { className: 'AddedUserList added-users-container' }, this.renderAddedUsers()));\n    }\n}\nexports.default = AddedUserList;\n\n\n//# sourceURL=webpack:///./Source/components/CreateDocument/CreateDocumentViews/SelectPermissions/AddedUserList.tsx?");

/***/ })

})