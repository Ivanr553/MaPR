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
const services_1 = require("../../services/services");
require("./styling/style.sass");
const Header_1 = require("../Header/Header");
const MetaBar_1 = require("../MetaBar/MetaBar");
const Account_1 = require("../Account/Account");
const HamburgerMenu_1 = require("../HamburgerMenu/HamburgerMenu");
class Home extends React.Component {
    constructor(props) {
        super(props);
        //View Handling
        this.handleAccountPress = () => {
            this.setState({
                currentView: React.createElement(Account_1.default, null)
            });
        };
        this.getCurrentView = (currentView) => {
            this.setState({
                currentView: currentView
            }, () => {
                if (this.state.currentView.type.name === 'CreateDocument') {
                    this.setState({
                        hamburgerSource: '/images/hamburger-menu-edit.png'
                    });
                }
                else {
                    this.setState({
                        hamburgerSource: '/images/hamburger-menu.png'
                    });
                }
            });
        };
        this.getHamburgerState = (hamburgerState) => {
            this.setState({
                hamburgerState: hamburgerState
            });
        };
        this.getHamburgerMenuBrightness = (hamburgerSource) => __awaiter(this, void 0, void 0, function* () {
            this.setState({
                hamburgerSource: hamburgerSource
            });
        });
        //Will check to see if hamburgermenu was not clicked, if true then it will tell hamburger menu to close
        this.handleHomeClick = (e) => {
            if (e.target.classList.contains('hamburger-menu-element')) {
                return;
            }
            this.setState({
                closeHamburgerMenu: true
            }, () => {
                setTimeout(() => {
                    this.setState({
                        closeHamburgerMenu: false
                    });
                }, 500);
            });
        };
        this.state = {
            username: '',
            currentView: '',
            documentResults: [],
            documentList: [],
            hamburgerMenu: '',
            hamburgerMenuShow: false,
            hamburgerSource: '/images/hamburger-menu.png',
            closeHamburgerMenu: false
        };
    }
    //Hamburger Menu
    handleHamburgerMenuPress(e) {
        if (!this.state.hamburgerMenuShow) {
            let hamburgerMenu = React.createElement("div", { id: 'hamburger-menu', className: 'hamburger-menu-element', style: { animation: 'show-hamburger-menu 1.5s forwards' } },
                React.createElement("div", { className: 'hamburger-menu-item hamburger-menu-element', id: 'account-hamburger-menu-item', onClick: this.handleAccountPress }, "Account"),
                React.createElement("div", { className: 'hamburger-menu-item hamburger-menu-element', id: 'settings-hamburger-menu-item' }, "Help"),
                React.createElement("div", { className: 'hamburger-menu-item hamburger-menu-element', id: 'log-out-hamburger-menu-item', onClick: services_1.logOff }, "Log Out"));
            this.setState({
                hamburgerMenu: hamburgerMenu,
                hamburgerMenuShow: true
            });
        }
        if (this.state.hamburgerMenuShow) {
            let hamburgerMenu = React.createElement("div", { id: 'hamburger-menu', style: { animation: 'hide-hamburger-menu 0.75s forwards' } },
                React.createElement("div", { className: 'hamburger-menu-item' }, "Account"),
                React.createElement("div", { className: 'hamburger-menu-item' }, "Help"),
                React.createElement("div", { className: 'hamburger-menu-item' }, "Log Out"));
            this.setState({
                hamburgerMenu: hamburgerMenu,
                hamburgerMenuShow: false
            });
        }
    }
    componentDidMount() {
        services_1.authenticateUser();
    }
    render() {
        return (React.createElement("div", { className: "Home", onClick: (e) => { this.handleHomeClick(e); } },
            React.createElement(Header_1.default, null),
            React.createElement(MetaBar_1.default, { getCurrentView: this.getCurrentView }),
            React.createElement(HamburgerMenu_1.default, { handleAccountPress: () => this.getCurrentView(React.createElement(Account_1.default, null)), logOff: services_1.logOff, getHamburgerState: this.getHamburgerState, closeHamburgerMenuBool: this.state.closeHamburgerMenu, hamburgerSource: this.state.hamburgerSource }),
            React.createElement("div", { id: 'documents-container', className: this.state.animate }, this.state.currentView)));
    }
}
exports.default = Home;
//# sourceMappingURL=Home.js.map