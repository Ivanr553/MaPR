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
            username: '',
            hamburgerMenu: '',
            hamburgerMenuShow: false
        };
        this.getCurrentUser = this.getCurrentUser.bind(this);
        this.logOff = this.logOff.bind(this);
        this.handleHamburgerMenuPress = this.handleHamburgerMenuPress.bind(this);
    }
    logOff() {
        return __awaiter(this, void 0, void 0, function* () {
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
    }
    getCurrentUser() {
        return __awaiter(this, void 0, void 0, function* () {
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
    }
    //Hamburger Menu
    handleHamburgerMenuPress(e) {
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
    }
    componentDidMount() {
        this.getCurrentUser();
    }
    render() {
        //Header state if user is NOT logged in
        let accountInnerHtml;
        let accountLink = '/Register';
        let registerTab = (React.createElement(react_router_dom_1.Link, { className: 'Link header-tab register-tab', to: { pathname: '/A/App/Register' } }, "Register"));
        let logInTab = (React.createElement(react_router_dom_1.Link, { className: 'Link header-tab log-in-tab', to: { pathname: '/A/App/' } }, "Log In"));
        let homeTab = React.createElement(react_router_dom_1.Link, { className: 'Link home-header-link', to: { pathname: '/A/App/' } },
            React.createElement("img", { src: '/images/MAPR_logo_edit.png', id: 'header-logo' }));
        let logOff;
        let fullHeader = 'show-full-header';
        //Header state if user IS logged in
        if (this.state.username != '') {
            // accountLink = '/Account'
            // registerTab = <div></div>
            // logInTab = <div></div>
            //     // <div onClick={(e) => {this.handleHamburgerMenuPress(e)}} className='header-tab log-in-tab' id='hamburger-menu-container'>
            //     //     <img id='hamburger-icon' src="/images/hamburger-menu.png" alt=""/>
            //     //     {this.state.hamburgerMenu}
            //     // </div>
            // homeTab =
            //     <Link className='Link home-header-link' to={{pathname: '/A/App/Home'}}>
            //         <img src='/images/MAPR_logo_edit.png' id='header-logo' />
            //     </Link>
            // homeTab = <div></div>
            // logOff = 
            //     <div className='header-tab log-in-tab' onClick={this.logOff}>
            //         <img id='logoff-icon' src="/images/logoff.png" alt=""/>
            //     </div>
            fullHeader = '';
        }
        return (React.createElement("div", { id: 'HomeHeader', className: fullHeader },
            React.createElement("div", { className: 'home-tab' }, homeTab),
            logInTab,
            registerTab));
    }
}
exports.default = Header;
//# sourceMappingURL=Header.js.map