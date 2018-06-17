"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_router_dom_1 = require("react-router-dom");
const $ = require("jquery");
const s = require('./styling/style.sass');
class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: ''
        };
        this.getCurrentUser = this.getCurrentUser.bind(this);
        this.logOff = this.logOff.bind(this);
    }
    logOff() {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield $.get('/Account/Logout');
            console.log(response);
            if (!response) {
                alert('There was an error with your request');
            }
            else {
                this.setState({
                    username: ''
                }, () => {
                    window.open('/A/App', '_self');
                });
            }
        });
    }
    getCurrentUser() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.props.getCurrentUser) {
                return;
            }
            let user = yield this.props.getCurrentUser();
            console.log('header user:', user);
            if (user.username) {
                this.setState({
                    username: user.username
                });
            }
        });
    }
    componentDidMount() {
        this.getCurrentUser();
    }
    render() {
        let accountInnerHtml;
        let accountLink = '/Register';
        let registerTab = (React.createElement("div", { className: 'header-tab register-tab' },
            React.createElement(react_router_dom_1.Link, { className: 'Link header-link', to: { pathname: '/A/App/Register' } }, " Register ")));
        let logInTab = (React.createElement("div", { className: 'header-tab log-in-tab' },
            React.createElement(react_router_dom_1.Link, { className: 'Link header-link', to: { pathname: '/A/App/' } }, " Log In ")));
        let homeTab = React.createElement(react_router_dom_1.Link, { className: 'Link home-header-link', to: { pathname: '/A/App/' } },
            " ",
            React.createElement("img", { src: '/images/MAPR_logo_edit.png', id: 'header-logo' }),
            " ");
        let logOff;
        let fullHeader = 'show-full-header';
        if (this.state.username != '') {
            accountInnerHtml = 'User: ' + this.state.username;
            accountLink = '/Account';
            registerTab = React.createElement("div", null);
            logInTab =
                React.createElement("div", { className: 'header-tab log-in-tab' }, accountInnerHtml);
            homeTab = React.createElement(react_router_dom_1.Link, { className: 'Link home-header-link', to: { pathname: '/A/App/Home' } },
                " ",
                React.createElement("img", { src: '/images/MAPR_logo_edit.png', id: 'header-logo' }),
                " ");
            homeTab = React.createElement("div", null);
            logOff =
                React.createElement("div", { className: 'header-tab log-in-tab', onClick: this.logOff },
                    React.createElement("div", { className: 'Link header-link' }, " Log Off "));
            fullHeader = '';
        }
        return (React.createElement("div", { id: 'HomeHeader', className: fullHeader },
            React.createElement("div", { className: 'home-tab' }, homeTab),
            logOff,
            logInTab,
            registerTab));
    }
}
exports.default = Header;
//# sourceMappingURL=Header.js.map