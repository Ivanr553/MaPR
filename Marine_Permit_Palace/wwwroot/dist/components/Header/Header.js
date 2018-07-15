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
        this.logOff = () => __awaiter(this, void 0, void 0, function* () {
            let response = yield $.get('/Account/Logout');
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
        this.getCurrentUser = () => __awaiter(this, void 0, void 0, function* () {
            if (!this.props.getCurrentUser) {
                return;
            }
            let user = yield this.props.getCurrentUser();
            if (user.username) {
                this.setState({
                    username: user.username
                });
            }
        });
        //Hamburger Menu
        this.handleHamburgerMenuPress = (e) => {
            if (!this.state.hamburgerMenuShow) {
                let hamburgerMenu = React.createElement("div", { className: 'hamburger-menu-element', id: 'hamburger-menu', style: { animation: 'show-hamburger-menu 1.5s forwards' } },
                    React.createElement("div", { className: 'hamburger-menu-item hamburger-menu-element', id: 'account-hamburger-menu-item' }, "Account"),
                    React.createElement("div", { className: 'hamburger-menu-item hamburger-menu-element', id: 'settings-hamburger-menu-item' }, "Settings"),
                    React.createElement("div", { className: 'hamburger-menu-item hamburger-menu-element', id: 'log-out-hamburger-menu-item' }, "Log Out"));
                this.setState({
                    hamburgerMenu: hamburgerMenu,
                    hamburgerMenuShow: true
                });
            }
            if (this.state.hamburgerMenuShow) {
                let hamburgerMenu = React.createElement("div", { id: 'hamburger-menu', style: { animation: 'hide-hamburger-menu 0.75s forwards' } },
                    React.createElement("div", { className: 'hamburger-menu-item' }, "Account"),
                    React.createElement("div", { className: 'hamburger-menu-item' }, "Settings"),
                    React.createElement("div", { className: 'hamburger-menu-item' }, "Log Out"));
                this.setState({
                    hamburgerMenu: hamburgerMenu,
                    hamburgerMenuShow: false
                });
            }
        };
        this.state = {
            username: '',
            hamburgerMenu: '',
            hamburgerMenuShow: false,
            currentView: '',
            page: ''
        };
    }
    componentWillMount() {
        this.setState({
            page: this.props.page
        });
    }
    componentDidMount() {
        this.getCurrentUser();
    }
    render() {
        let headerLink;
        let fullHeader = 'show-full-header';
        if (this.state.page === 'Home') {
            fullHeader = '';
        }
        if (this.state.page === 'Register') {
            headerLink = (React.createElement(react_router_dom_1.Link, { className: 'Link header-tab log-in-tab', to: { pathname: '/A/App/' } }, "Log In"));
        }
        if (this.state.page === 'Login') {
            headerLink = (React.createElement(react_router_dom_1.Link, { id: 'register-tab', className: 'Link header-tab register-tab', to: { pathname: '/A/App/Register' } }, "Register"));
        }
        return (React.createElement("div", { id: 'HomeHeader', className: fullHeader },
            React.createElement("div", { className: 'home-tab' },
                React.createElement(react_router_dom_1.Link, { id: 'header-logo-container', className: 'Link home-header-link', to: { pathname: '/A/App/' } },
                    React.createElement("img", { src: '/images/MAPR_logo_edit.png', id: 'header-logo' }))),
            headerLink));
    }
}
exports.default = Header;
//# sourceMappingURL=Header.js.map