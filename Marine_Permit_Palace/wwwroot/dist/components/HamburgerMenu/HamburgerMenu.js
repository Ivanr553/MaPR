"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const s = require('./styling/style.sass');
class HamburgerMenu extends React.Component {
    constructor(props) {
        super(props);
        this.toggleHamburgerMenu = (toggle) => {
            this.setState({
                hamburgerState: toggle
            });
        };
        //State Management
        this.giveHamburgerState = (hamburgerState) => {
            this.props.getHamburgerState(hamburgerState);
        };
        this.handleAccountPress = () => {
            this.props.handleAccountPress();
        };
        this.logOff = () => {
            this.props.logOff();
        };
        //Is checking to see if hamburger menu should be closed by home click
        this.handleCloseHamburgerMenuBool = () => {
            if (this.props.closeHamburgerMenuBool) {
                if (this.state.hamburgerState === 'open') {
                    this.toggleHamburgerMenu('closed');
                }
            }
        };
        this.state = {
            closeHamburgerMenuBool: this.props.closeHamburgerMenuBool,
            hamburgerState: 'new',
            hamburgerSource: ''
        };
    }
    //React Lifecycle
    componentDidUpdate() {
        this.handleCloseHamburgerMenuBool();
    }
    componentDidMount() {
    }
    render() {
        if (this.state.hamburgerState === 'new') {
            return (React.createElement("div", { onClick: (e) => { this.toggleHamburgerMenu('open'); }, id: 'hamburger-menu-container', className: 'hamburger-menu-element' },
                React.createElement("img", { className: 'hamburger-menu-element', id: 'hamburger-icon', src: this.props.hamburgerSource, alt: "" })));
        }
        if (this.state.hamburgerState === 'closed') {
            return (React.createElement("div", { onClick: (e) => { this.toggleHamburgerMenu('open'); }, id: 'hamburger-menu-container', className: 'hamburger-menu-element' },
                React.createElement("img", { className: 'hamburger-menu-element', id: 'hamburger-icon', src: this.props.hamburgerSource, alt: "" }),
                React.createElement("div", { id: 'hamburger-menu', style: { animation: 'hide-hamburger-menu 0.75s forwards' } },
                    React.createElement("div", { className: 'hamburger-menu-item' }, "Account"),
                    React.createElement("div", { className: 'hamburger-menu-item' }, "Log Out"))));
        }
        if (this.state.hamburgerState === 'open') {
            return (React.createElement("div", { onClick: (e) => { this.toggleHamburgerMenu('closed'); }, id: 'hamburger-menu-container', className: 'hamburger-menu-element' },
                React.createElement("img", { className: 'hamburger-menu-element', id: 'hamburger-icon', src: this.props.hamburgerSource, alt: "" }),
                React.createElement("div", { id: 'hamburger-menu', className: 'hamburger-menu-element', style: { animation: 'show-hamburger-menu 1.5s forwards' } },
                    React.createElement("div", { className: 'hamburger-menu-item hamburger-menu-element', id: 'account-hamburger-menu-item', onClick: this.handleAccountPress }, "Account"),
                    React.createElement("div", { className: 'hamburger-menu-item hamburger-menu-element', id: 'log-out-hamburger-menu-item', onClick: this.logOff }, "Log Out"))));
        }
        return React.createElement("div", null, "Something Broke!");
    }
}
exports.default = HamburgerMenu;
//# sourceMappingURL=HamburgerMenu.js.map