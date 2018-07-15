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
const $ = require("jquery");
const s = require('./styling/style.sass');
const Header_1 = require("../Header/Header");
const Footer_1 = require("../Footer/Footer");
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.handleUsername = (e) => {
            let user = this.state.user;
            user.dod_id = e.target.value;
            this.setState({
                user: user
            });
        };
        this.handlePassword = (e) => {
            let user = this.state.user;
            user.password = e.target.value;
            this.setState({
                user: user
            });
        };
        this.handleSubmit = (e) => {
            if (e.key === 'Enter') {
                this.handleLogin();
            }
        };
        this.handleLogin = () => __awaiter(this, void 0, void 0, function* () {
            try {
                let user = this.state.user;
                let loginAttempt = yield $.ajax({
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json; charset=UTF-8'
                    },
                    url: `/Account/Login`,
                    dataType: 'json',
                    data: JSON.stringify(user)
                });
                if (loginAttempt.result === 'NotRegistered') {
                    let sendToRegister = confirm('User not registered');
                    if (sendToRegister) {
                        window.open('/A/App/Register', '_self');
                    }
                }
                if (loginAttempt.result === 'Failure') {
                    alert('Invalid login attempt');
                }
                if (loginAttempt.result === 'Success') {
                    let date = new Date();
                    date.setDate(date.getDate() + 365);
                    document.cookie = `dod_id=${this.state.user.dod_id};expires=${date.getUTCMilliseconds}`;
                    window.open('/A/App/Home', '_self');
                }
            }
            catch (e) {
                console.log(e);
            }
        });
        this.state = {
            user: {
                dod_id: '',
                password: '',
                remember_me: true
            }
        };
    }
    componentDidMount() {
    }
    render() {
        return (React.createElement("div", { className: 'Login' },
            React.createElement(Header_1.default, { page: 'Login' }),
            React.createElement("div", { className: 'login-content-container' },
                React.createElement("div", { className: 'login-container-section' },
                    React.createElement("div", { className: 'login-title' }, "Log In"),
                    React.createElement("div", { className: 'login-input-container' },
                        "Dod Id",
                        React.createElement("input", { type: "text", className: 'login-input', onKeyPress: (e) => { this.handleSubmit(e); }, onChange: (e) => { this.handleUsername(e); } })),
                    React.createElement("div", { className: 'login-input-container', id: 'login-password-container' },
                        "Password",
                        React.createElement("input", { type: "password", className: 'login-input', onKeyPress: (e) => { this.handleSubmit(e); }, onChange: (e) => { this.handlePassword(e); } })),
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