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
const jquery_1 = require("jquery");
const s = require('./styling/style.sass');
const Header_1 = require("../Header/Header");
const Footer_1 = require("../Footer/Footer");
class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dodNumber: '',
            password: '',
            confirmPassword: ''
        };
        this.handleUsername = this.handleUsername.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
    }
    handleUsername(e) {
        this.setState({
            dodNumber: e.target.value
        });
    }
    handlePassword(e) {
        this.setState({
            password: e.target.value
        });
    }
    handleConfirmPassword(e) {
        this.setState({
            confirmPassword: e.target.value
        });
    }
    handleRegister() {
        return __awaiter(this, void 0, void 0, function* () {
            // Check if inputs are not properly filled in
            if (!this.state.dodNumber || !this.state.password) {
                alert('Fill in all fields');
                return;
            }
            // Check if password are not correctly equivalent
            if (this.state.password != this.state.confirmPassword) {
                alert('Passwords do not match');
                return;
            }
            let newUser = {
                username: this.state.dodNumber,
                password: this.state.password
            };
            try {
                let response = yield jquery_1.default.post('/registerUser', newUser);
                if (response == 'Success') {
                    let userRes = alert('Registration Complete!');
                    if (userRes) {
                        window.open('/A/App/', '_self');
                    }
                }
                if (response == 'User Exists') {
                    alert('Username Already Exists');
                }
            }
            catch (e) {
                console.log(e);
                alert('There was an error with your registration.');
            }
        });
    }
    render() {
        return (React.createElement("div", { className: 'Register' },
            React.createElement(Header_1.default, null),
            React.createElement("div", { className: 'register-content-container' },
                React.createElement("div", { className: 'register-container-section' },
                    React.createElement("div", { className: 'register-title' }, "Register"),
                    React.createElement("div", { className: 'register-input-container' },
                        "Username",
                        React.createElement("input", { type: "text", className: 'register-input', onChange: (e) => { this.handleUsername(e); } })),
                    React.createElement("div", { className: 'register-input-container', id: 'register-password-container' },
                        "Password",
                        React.createElement("input", { type: "password", className: 'register-input', onChange: (e) => { this.handlePassword(e); } })),
                    React.createElement("div", { className: 'register-input-container' },
                        "Confirm Password",
                        React.createElement("input", { type: "password", className: 'register-input', onChange: (e) => { this.handleConfirmPassword(e); } })),
                    React.createElement("div", null,
                        React.createElement("button", { className: 'register-button' }, "Register"))),
                React.createElement("div", { className: 'register-container-section', id: 'register-container-section-right' },
                    React.createElement("div", { className: 'register-title' }, "For Demo Only"),
                    React.createElement("div", { className: 'register-paragraph' }, "Registration will only occur for the purposes of the demo. In the live site, there will be no need to register as the user will have their account linked to their DOD Number."))),
            React.createElement(Footer_1.default, null)));
    }
}
exports.default = Register;
//# sourceMappingURL=Register.js.map