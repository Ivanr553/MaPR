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
const MetaBar_1 = require("../MetaBar/MetaBar");
class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            username: '',
            currentView: '',
            documentResults: [],
            documentList: []
        };
        this.getUser = this.getUser.bind(this);
        this.getCurrentUser = this.getCurrentUser.bind(this);
        this.getCurrentView = this.getCurrentView.bind(this);
    }
    getUser() {
        return __awaiter(this, void 0, void 0, function* () {
            let response = yield $.get('/Account/WhoAmI');
            if (!response) {
                window.open('/A/App', '_self');
            }
            let user = {
                first_name: 'John',
                last_name: 'Smith',
                middle_name: 'Doe',
                username: response.username,
                street_address: '1234 United Way',
                state: 'CA',
                country: 'US',
                zip: 93021,
                authorization: 1
            };
            this.setState({
                user: user
            });
            return user;
        });
    }
    getCurrentUser() {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield this.getUser();
            return user;
        });
    }
    getCurrentView(currentView) {
        this.setState({
            currentView: currentView
        });
    }
    componentDidMount() {
        return __awaiter(this, void 0, void 0, function* () {
            this.getUser();
        });
    }
    render() {
        return (React.createElement("div", { className: "Home" },
            React.createElement(Header_1.default, { getCurrentUser: this.getCurrentUser }),
            React.createElement(MetaBar_1.default, { getCurrentView: this.getCurrentView, getCurrentUser: this.getCurrentUser }),
            React.createElement("div", { className: 'documents-container' }, this.state.currentView)));
    }
}
exports.default = Home;
//# sourceMappingURL=Home.js.map