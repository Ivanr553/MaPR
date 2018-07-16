webpackHotUpdate("main-client",{

/***/ "./Source/components/CreateDocument/CreateDocumentViews/SelectPermissions/AddedUser.tsx":
/*!**********************************************************************************************!*\
  !*** ./Source/components/CreateDocument/CreateDocumentViews/SelectPermissions/AddedUser.tsx ***!
  \**********************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst React = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nclass AddedUser extends React.Component {\n    constructor() {\n        super(...arguments);\n        this.getStyle = () => {\n            if (this.props.isInSidebar) {\n                let style = {\n                    cursor: 'pointer',\n                    backgroundColor: this.props.user.assigned_to !== null ? 'grey' : ''\n                };\n                return style;\n            }\n            if (!this.props.isInSidebar) {\n                let style = {\n                    cursor: this.props.user.assigned_to === null ? 'pointer' : 'default',\n                    backgroundColor: this.props.user.assigned_to !== null ? 'grey' : ''\n                };\n                return style;\n            }\n        };\n    }\n    componentDidMount() {\n    }\n    render() {\n        if (this.props.isInSidebar) {\n            return (React.createElement(\"div\", { style: this.getStyle(), className: 'added-user', id: this.props.user.id.toString(), onClick: (e) => this.props.assignUserToField(e) }, this.props.user.name));\n        }\n        if (!this.props.isInSidebar) {\n            return (React.createElement(\"div\", { style: this.getStyle(), className: 'added-user', id: this.props.user.id.toString() },\n                this.props.user.name,\n                React.createElement(\"div\", { className: 'added-user-delete-icon', onClick: (e) => { this.props.deleteUser(e); } }, \"x\")));\n        }\n    }\n}\nexports.default = AddedUser;\n\n\n//# sourceURL=webpack:///./Source/components/CreateDocument/CreateDocumentViews/SelectPermissions/AddedUser.tsx?");

/***/ })

})