webpackHotUpdate("main-client",{

/***/ "./Source/components/CreateDocument/CreateDocumentViews/DocumentPreview/DocumentPreview.tsx":
/*!**************************************************************************************************!*\
  !*** ./Source/components/CreateDocument/CreateDocumentViews/DocumentPreview/DocumentPreview.tsx ***!
  \**************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst React = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nconst DocumentView_1 = __webpack_require__(/*! ../../../DocumentView/DocumentView */ \"./Source/components/DocumentView/DocumentView.tsx\");\nconst DocumentPreviewSidebar_1 = __webpack_require__(/*! ./DocumentPreviewSidebar */ \"./Source/components/CreateDocument/CreateDocumentViews/DocumentPreview/DocumentPreviewSidebar.tsx\");\nclass DocumentPreview extends React.Component {\n    constructor(props) {\n        super(props);\n        this.handleShow = () => {\n            if (!this.props.documentPreviewBoolean) {\n                let style = {\n                    display: 'none'\n                };\n                return style;\n            }\n            else {\n                let style = {\n                    display: 'block'\n                };\n                return style;\n            }\n        };\n        this.previewOnClickHandler = (e) => {\n            let id = e.target.id;\n            //Clearing previously selected field\n            if (this.props.currentSelectedField !== undefined) {\n                document.getElementById(this.props.document_meta.indexOf(this.props.currentSelectedField).toString()).classList.remove('selectedField');\n            }\n            document.getElementById(id).classList.add('selectedField');\n            let currentSelectedFieldValue = this.props.document_meta[id].assigned_to;\n            console.log(currentSelectedFieldValue);\n            this.props.handleSelectedFieldId(id);\n        };\n        this.handleDocumentNameChange = (e) => {\n            let documentName = this.state.documentName;\n            documentName = e.target.value;\n            this.setState({\n                documentName: documentName\n            }, () => {\n                this.props.getDocumentName(this.state.documentName);\n            });\n        };\n        this.showSidebar = () => {\n            this.setState({\n                showSidebar: true\n            });\n        };\n        this.getHideSidebar = (showSidebar) => {\n            this.setState({\n                showSidebar: showSidebar\n            });\n        };\n        //State management methods\n        this.getDocumentId = () => {\n            this.setState({\n                document_id: this.props.document_id\n            });\n        };\n        this.giveDocumentPreviewComplete = () => {\n            this.props.getDocumentPreviewComplete(true);\n        };\n        this.state = {\n            documentName: String,\n            currentSelectedField: '',\n            userList: []\n        };\n    }\n    //React lifecycle methods\n    componentDidMount() {\n        this.handleShow();\n        this.getDocumentId();\n    }\n    componentWillMount() {\n        if (this.state.getDocumentResponse) {\n            this.state.getDocumentResponse.cancel();\n        }\n    }\n    render() {\n        return (React.createElement(\"div\", { id: 'DocumentPreview', style: this.handleShow() },\n            React.createElement(\"div\", { id: 'document-view-container' },\n                React.createElement(\"div\", { id: 'document-view-header' },\n                    React.createElement(\"input\", { placeholder: 'Document Name', onChange: (e) => { this.handleDocumentNameChange(e); }, id: 'document-name-input', type: \"text\" }),\n                    React.createElement(\"div\", { id: 'save-button' }, \"Save File\")),\n                React.createElement(DocumentView_1.default, { document_id: this.props.document_id, view: 'DocumentPreview', previewOnClickHandler: this.previewOnClickHandler })),\n            React.createElement(\"div\", { id: 'show-sidebar-icon-container', onClick: this.showSidebar },\n                React.createElement(\"img\", { id: 'show-sidebar-icon', src: \"/images/left-arrow-1.png\", alt: \"\" })),\n            React.createElement(DocumentPreviewSidebar_1.default, { currentSelectedField: this.props.currentSelectedField, showSidebar: this.state.showSidebar, deleteUser: this.props.deleteUser, assignUserToField: this.props.assignUserToField, userList: this.props.userList, getHideSidebar: this.getHideSidebar })));\n    }\n}\nexports.default = DocumentPreview;\n\n\n//# sourceURL=webpack:///./Source/components/CreateDocument/CreateDocumentViews/DocumentPreview/DocumentPreview.tsx?");

/***/ }),

/***/ "./Source/components/CreateDocument/CreateDocumentViews/DocumentPreview/DocumentPreviewSidebar.tsx":
/*!*********************************************************************************************************!*\
  !*** ./Source/components/CreateDocument/CreateDocumentViews/DocumentPreview/DocumentPreviewSidebar.tsx ***!
  \*********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst React = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nconst AddedUserList_1 = __webpack_require__(/*! ../SelectPermissions/AddedUserList */ \"./Source/components/CreateDocument/CreateDocumentViews/SelectPermissions/AddedUserList.tsx\");\nclass DocumentPreviewSidebar extends React.Component {\n    constructor(props) {\n        super(props);\n        this.showSelectedField = () => {\n            if (this.props.currentSelectedField === undefined) {\n                return;\n            }\n            else {\n                return (React.createElement(\"div\", null,\n                    React.createElement(\"div\", { className: 'selected-field-content' },\n                        React.createElement(\"div\", { className: 'selected-field-name' }, this.props.currentSelectedField.field_name),\n                        React.createElement(\"div\", { className: 'selected-field-assigned-user' }, this.props.currentSelectedField.assigned_to.name))));\n            }\n        };\n        //Sidebar Functions\n        this.hideSidebar = () => {\n            let sidebar = document.getElementById('document-view-sidebar');\n            sidebar.classList.add('hide-sidebar');\n            sidebar.classList.remove('show-sidebar');\n            this.giveHideSidebar();\n        };\n        this.showSidebar = () => {\n            let sidebar = document.getElementById('document-view-sidebar');\n            sidebar.classList.add('show-sidebar');\n            sidebar.classList.remove('hide-sidebar');\n        };\n        this.giveHideSidebar = () => {\n            this.props.getHideSidebar(false);\n        };\n        this.state = {};\n    }\n    componentDidUpdate() {\n        if (this.props.showSidebar) {\n            this.showSidebar();\n        }\n    }\n    render() {\n        return (React.createElement(\"div\", { id: 'document-view-sidebar', className: '' },\n            React.createElement(\"div\", { id: 'close-sidebar-icon', onClick: this.hideSidebar }, \"x\"),\n            React.createElement(\"div\", { className: 'preview-documents-header' }, \"Selected Field\"),\n            React.createElement(\"div\", { className: 'selected-field-display-container' }, this.showSelectedField()),\n            React.createElement(\"div\", { className: 'preview-documents-header' }, \"User List\"),\n            React.createElement(\"div\", { id: 'added-users-container-preview' },\n                React.createElement(AddedUserList_1.default, { userList: this.props.userList, assignUserToField: this.props.assignUserToField, deleteUser: this.props.deleteUser, isInSidebar: true }))));\n    }\n}\nexports.default = DocumentPreviewSidebar;\n\n\n//# sourceURL=webpack:///./Source/components/CreateDocument/CreateDocumentViews/DocumentPreview/DocumentPreviewSidebar.tsx?");

/***/ })

})