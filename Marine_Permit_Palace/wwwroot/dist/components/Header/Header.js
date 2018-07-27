"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_router_dom_1 = require("react-router-dom");
const s = require('./styling/style.sass');
class Header extends React.Component {
    constructor(props) {
        super(props);
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
            hamburgerMenu: '',
            hamburgerMenuShow: false,
            currentView: '',
            page: ''
        };
    }
    render() {
        let headerLink;
        let fullHeader = 'show-full-header';
        if (location.pathname === '/A/App/Home') {
            fullHeader = '';
        }
        if (location.pathname === '/A/App/Register') {
            headerLink = (React.createElement(react_router_dom_1.Link, { className: 'Link header-tab log-in-tab', to: { pathname: '/A/App/' } }, "Log In"));
        }
        if (location.pathname === '/A/App' || location.pathname === '/A/App/') {
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