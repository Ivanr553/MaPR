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
class Account extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                // username: newUser.username,
                rank: 'PVT',
                first_name: 'TRISTAN',
                last_name: 'ABER',
                middle_name: 'JOLYON',
                DOD_ID_number: 1534727026,
                DOB: '1998 Nov 08',
                home_of_record: '19211 JEFFERSON DAVIS HWY, TRIANGLE, VA 22172',
                place_of_birth: 'TUN TAVERN, PA',
                civ_license_state: 'KY',
                class_of_vehicle: 'C',
                civ_license_num: 'MARCORDET 434',
                civ_issued_date: '11/8/1998',
                civ_exp_date: '11/9/2018',
                medical_cert_req: '*MED CERT REQUIRED',
                wears_glasses: false,
                organization: 'MARCOR DET FLW, MTIC',
                age: 27,
                sex: 'M',
                height: 66,
                weight: '140',
                hair_color: 'BLN',
                eye_color: 'BLU',
                authorization: 1,
            },
            currentView: ''
        };
        this.getCurrentUser = this.getCurrentUser.bind(this);
    }
    getAccountInformationView() {
        let currentView = (React.createElement("div", { className: 'account-page-view', id: 'account-information-view' },
            React.createElement("div", { className: 'account-content-column' },
                React.createElement("div", { className: 'account-info-line-item' },
                    React.createElement("strong", null, "DOD Number:"),
                    " ",
                    this.state.user.DOD_ID_number),
                React.createElement("div", { className: 'account-info-line-item' },
                    React.createElement("strong", null, "Rank:"),
                    " ",
                    this.state.user.rank),
                React.createElement("div", { className: 'account-info-line-item' },
                    React.createElement("strong", null, "Organization:"),
                    " ",
                    this.state.user.organization),
                React.createElement("div", { className: 'account-info-line-item' },
                    React.createElement("strong", null, "Class of Vehicle:"),
                    " ",
                    this.state.user.class_of_vehicle)),
            React.createElement("div", { className: 'account-content-column' },
                React.createElement("div", { className: 'account-info-line-item' },
                    React.createElement("strong", null, "Authorization Level:"),
                    " ",
                    this.state.user.authorization),
                React.createElement("div", { className: 'account-info-line-item' },
                    React.createElement("strong", null, "Medical Certification:"),
                    " ",
                    this.state.user.medical_cert_req),
                React.createElement("div", { className: 'account-info-line-item' },
                    React.createElement("strong", null, "Civilian Issued Date:"),
                    " ",
                    this.state.user.civ_issued_date),
                React.createElement("div", { className: 'account-info-line-item' },
                    React.createElement("strong", null, "Civilian Expiration Date:"),
                    " ",
                    this.state.user.civ_exp_date))));
        this.setState({
            currentView: currentView
        });
    }
    getPersonalInformationView() {
        let currentView = (React.createElement("div", { className: 'account-page-view', id: 'personal-information-view' },
            React.createElement("div", { className: 'account-content-column' },
                React.createElement("div", { className: 'account-info-line-item' },
                    React.createElement("strong", null, "First Name:"),
                    " ",
                    this.state.user.first_name),
                React.createElement("div", { className: 'account-info-line-item' },
                    React.createElement("strong", null, "Middle Name:"),
                    " ",
                    this.state.user.middle_name),
                React.createElement("div", { className: 'account-info-line-item' },
                    React.createElement("strong", null, "Last Name:"),
                    " ",
                    this.state.user.last_name),
                React.createElement("div", { className: 'account-info-line-item' },
                    React.createElement("strong", null, "Sex:"),
                    " ",
                    this.state.user.sex),
                React.createElement("div", { className: 'account-info-line-item' },
                    React.createElement("strong", null, "Age:"),
                    " ",
                    this.state.user.age),
                React.createElement("div", { className: 'account-info-line-item' },
                    React.createElement("strong", null, "Wears Glasses:"),
                    " ",
                    this.state.user.wears_glasses)),
            React.createElement("div", { className: 'account-content-column' },
                React.createElement("div", { className: 'account-info-line-item' },
                    React.createElement("strong", null, "Height:"),
                    " ",
                    this.state.user.height),
                React.createElement("div", { className: 'account-info-line-item' },
                    React.createElement("strong", null, "Weight:"),
                    " ",
                    this.state.user.weight),
                React.createElement("div", { className: 'account-info-line-item' },
                    React.createElement("strong", null, "Hair Color:"),
                    " ",
                    this.state.user.hair_color),
                React.createElement("div", { className: 'account-info-line-item' },
                    React.createElement("strong", null, "Eye Color:"),
                    " ",
                    this.state.user.eye_color),
                React.createElement("div", { className: 'account-info-line-item' }))));
        this.setState({
            currentView: currentView
        });
    }
    getCivilianInformationView() {
        let currentView = (React.createElement("div", { className: 'account-page-view', id: 'civilian-information-view' },
            React.createElement("div", { className: 'account-content-column' },
                React.createElement("div", { className: 'account-info-line-item' },
                    React.createElement("strong", null, "Home Address:"),
                    " ",
                    this.state.user.home_of_record),
                React.createElement("div", { className: 'account-info-line-item' },
                    React.createElement("strong", null, "Date of Birth:"),
                    " ",
                    this.state.user.DOB),
                React.createElement("div", { className: 'account-info-line-item' },
                    React.createElement("strong", null, "Place of Birth:"),
                    " ",
                    this.state.user.place_of_birth)),
            React.createElement("div", { className: 'account-content-column' },
                React.createElement("div", { className: 'account-info-line-item' },
                    React.createElement("strong", null, "Civilian Licence Number:"),
                    " ",
                    this.state.user.civ_license_num),
                React.createElement("div", { className: 'account-info-line-item' },
                    React.createElement("strong", null, "State of Licence:"),
                    " ",
                    this.state.user.civ_license_state))));
        this.setState({
            currentView: currentView
        });
    }
    getCurrentUser() {
        return __awaiter(this, void 0, void 0, function* () {
            let user = yield this.props.getCurrentUser();
            this.setState({
                user: user
            });
        });
    }
    handleTabPress(e, content) {
        let tabs = e.target.parentNode.children;
        for (let tab of tabs) {
            if (tab.classList.contains('account-tab-selected')) {
                tab.classList.remove('account-tab-selected');
            }
        }
        e.target.classList.add('account-tab-selected');
        if (content == 'Account') {
            this.getAccountInformationView();
        }
        if (content == 'Personal') {
            this.getPersonalInformationView();
        }
        if (content == 'Civilian') {
            this.getCivilianInformationView();
        }
    }
    componentDidMount() {
        this.getAccountInformationView();
    }
    render() {
        return (React.createElement("div", { id: 'Account' },
            React.createElement("div", { id: 'account-content-container' },
                React.createElement("div", { id: 'account-tabs-container' },
                    React.createElement("div", { id: 'account-info-tab', className: 'account-tab account-tab-selected', onClick: (e) => { this.handleTabPress(e, 'Account'); } }, "Account Information"),
                    React.createElement("div", { id: 'personal-info-tab', className: 'account-tab', onClick: (e) => { this.handleTabPress(e, 'Personal'); } }, "Personal Information"),
                    React.createElement("div", { id: 'civilian-info-tab', className: 'account-tab', onClick: (e) => { this.handleTabPress(e, 'Civilian'); } }, "Civilian Information")),
                this.state.currentView)));
    }
}
exports.default = Account;
//# sourceMappingURL=Account.js.map