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
const s = require('./styling/style.sass');
const Header_1 = require("../Header/Header");
const Footer_1 = require("../Footer/Footer");
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                username: '',
                password: ''
            }
        };
        this.handleLogin = this.handleLogin.bind(this);
    }
    handleUsername(e) {
        let user = this.state.user;
        user.username = e.target.value;
        this.setState({
            user: user
        });
    }
    handlePassword(e) {
        let user = this.state.user;
        user.password = e.target.value;
        this.setState({
            user: user
        });
    }
    handleLogin() {
        return __awaiter(this, void 0, void 0, function* () {
            // let user = this.state.user
            // let response = await $.post('/loginUser', user)
            // if(response) {
            window.open('/A/App/Home', '_self');
            // } else {
            //     alert('Incorrect username or password')
            // }
        });
    }
    componentDidMount() {
        // this.giveUserID()
        // this.test()
    }
    render() {
        return (React.createElement("div", { className: 'Login' },
            React.createElement(Header_1.default, null),
            React.createElement("div", { className: 'login-content-container' },
                React.createElement("div", { className: 'login-container-section' },
                    React.createElement("div", { className: 'login-title' }, "Log In"),
                    React.createElement("div", { className: 'login-input-container' },
                        "Username",
                        React.createElement("input", { type: "text", className: 'login-input', onChange: (e) => { this.handleUsername(e); } })),
                    React.createElement("div", { className: 'login-input-container', id: 'login-password-container' },
                        "Password",
                        React.createElement("input", { type: "password", className: 'login-input', onChange: (e) => { this.handlePassword(e); } })),
                    React.createElement("div", null,
                        React.createElement("button", { id: 'login-button', onClick: this.handleLogin }, "Log In"))),
                React.createElement("div", { className: 'login-container-section' },
                    React.createElement("div", { className: 'login-title' }, "First Time Users"),
                    React.createElement("div", { className: 'login-paragraph' }, "During the course of the demo, register an account with a username and password and then login. Each user will be generic and have their content auto generated."))),
            React.createElement(Footer_1.default, null)));
    }
}
exports.default = Login;
//# sourceMappingURL=Login.js.map