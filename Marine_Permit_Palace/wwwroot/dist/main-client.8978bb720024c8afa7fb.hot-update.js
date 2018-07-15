webpackHotUpdate("main-client",{

/***/ "./Source/components/CreateDocument/CreateDocumentViews/DocumentPreview/DocumentPreviewSidebar.tsx":
/*!*********************************************************************************************************!*\
  !*** ./Source/components/CreateDocument/CreateDocumentViews/DocumentPreview/DocumentPreviewSidebar.tsx ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst React = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nconst AddedUserList_1 = __webpack_require__(/*! ../SelectPermissions/AddedUserList */ \"./Source/components/CreateDocument/CreateDocumentViews/SelectPermissions/AddedUserList.tsx\");\nclass DocumentPreviewSidebar extends React.Component {\n    constructor(props) {\n        super(props);\n        //Sidebar Functions\n        this.hideSidebar = () => {\n            let sidebar = document.getElementById('document-view-sidebar');\n            sidebar.classList.add('hide-sidebar');\n            sidebar.classList.remove('show-sidebar');\n            this.giveHideSidebar();\n        };\n        this.showSidebar = () => {\n            let sidebar = document.getElementById('document-view-sidebar');\n            sidebar.classList.add('show-sidebar');\n            sidebar.classList.remove('hide-sidebar');\n        };\n        this.giveHideSidebar = () => {\n            this.props.getHideSidebar(false);\n        };\n        this.state = {};\n    }\n    componentDidUpdate() {\n        if (this.props.showSidebar) {\n            this.showSidebar();\n        }\n    }\n    render() {\n        return (React.createElement(\"div\", { id: 'document-view-sidebar', className: '' },\n            React.createElement(\"div\", { id: 'close-sidebar-icon', onClick: this.hideSidebar }, \"x\"),\n            React.createElement(\"div\", { className: 'documents-header' }, \"Selected Field\"),\n            React.createElement(\"div\", null,\n                \" Currently Selected Field: \",\n                this.props.currentSelectedField),\n            React.createElement(\"div\", { className: 'documents-header' }, \"User List\"),\n            React.createElement(AddedUserList_1.default, { userList: this.props.userList, assignUserToField: this.props.assignUserToField, deleteUser: this.props.deleteUser, isInSidebar: true })));\n    }\n}\nexports.default = DocumentPreviewSidebar;\n\n\n//# sourceURL=webpack:///./Source/components/CreateDocument/CreateDocumentViews/DocumentPreview/DocumentPreviewSidebar.tsx?");

/***/ })

})