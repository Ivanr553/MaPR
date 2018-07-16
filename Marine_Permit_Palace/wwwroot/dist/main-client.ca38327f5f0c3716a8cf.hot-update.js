webpackHotUpdate("main-client",{

/***/ "./Source/App.tsx":
/*!************************!*\
  !*** ./Source/App.tsx ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\nObject.defineProperty(exports, \"__esModule\", { value: true });\nconst React = __webpack_require__(/*! react */ \"./node_modules/react/index.js\");\nconst ReactDOM = __webpack_require__(/*! react-dom */ \"./node_modules/react-dom/index.js\");\nconst react_router_dom_1 = __webpack_require__(/*! react-router-dom */ \"./node_modules/react-router-dom/es/index.js\");\nconst Home_1 = __webpack_require__(/*! ./components/Home/Home */ \"./Source/components/Home/Home.tsx\");\nconst Account_1 = __webpack_require__(/*! ./components/Account/Account */ \"./Source/components/Account/Account.tsx\");\nconst Register_1 = __webpack_require__(/*! ./components/Register/Register */ \"./Source/components/Register/Register.tsx\");\nconst Login_1 = __webpack_require__(/*! ./components/Login/Login */ \"./Source/components/Login/Login.tsx\");\nconst DocumentView_1 = __webpack_require__(/*! ./components/DocumentView/DocumentView */ \"./Source/components/DocumentView/DocumentView.tsx\");\nconst s = __webpack_require__(/*! ./style.sass */ \"./Source/style.sass\");\nclass App extends React.Component {\n    render() {\n        if (true) {\n            module['hot'].accept();\n        }\n        return (React.createElement(\"div\", { id: 'App' },\n            React.createElement(react_router_dom_1.BrowserRouter, null,\n                React.createElement(react_router_dom_1.Switch, null,\n                    React.createElement(react_router_dom_1.Route, { path: '/A/App', exact: true, component: Login_1.default }),\n                    React.createElement(react_router_dom_1.Route, { path: '/A/App/Account', exact: true, component: Account_1.default }),\n                    React.createElement(react_router_dom_1.Route, { path: '/A/App/Register', exact: true, component: Register_1.default }),\n                    React.createElement(react_router_dom_1.Route, { path: '/A/App/Home', exact: true, component: Home_1.default }),\n                    React.createElement(react_router_dom_1.Route, { path: '/A/App/DocumentView', exact: true, component: DocumentView_1.default })))));\n    }\n}\nexports.default = App;\nReactDOM.render(React.createElement(App, null), document.getElementById('react-app'));\n\n\n//# sourceURL=webpack:///./Source/App.tsx?");

/***/ })

})