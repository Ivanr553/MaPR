"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const ReactDOM = require("react-dom");
const react_router_dom_1 = require("react-router-dom");
const Home_1 = require("./components/Home/Home");
const Account_1 = require("./components/Account/Account");
// import Studio from './components/studio/Studio'
const Register_1 = require("./components/Register/Register");
const Login_1 = require("./components/Login/Login");
const DocumentView_1 = require("./components/DocumentView/DocumentView");
const s = require('./style.sass');
class App extends React.Component {
    render() {
        return (React.createElement("div", { id: 'App' },
            React.createElement(react_router_dom_1.BrowserRouter, null,
                React.createElement(react_router_dom_1.Switch, null,
                    React.createElement(react_router_dom_1.Route, { path: '/A/App', exact: true, component: Login_1.default }),
                    React.createElement(react_router_dom_1.Route, { path: '/A/App/Account', exact: true, component: Account_1.default }),
                    React.createElement(react_router_dom_1.Route, { path: '/A/App/Register', exact: true, component: Register_1.default }),
                    React.createElement(react_router_dom_1.Route, { path: '/A/App/Home', exact: true, component: Home_1.default }),
                    React.createElement(react_router_dom_1.Route, { path: '/A/App/DocumentView', exact: true, component: DocumentView_1.default })))));
    }
}
exports.default = App;
ReactDOM.render(React.createElement(App, null), document.getElementById('react-app'));
//# sourceMappingURL=App.js.map