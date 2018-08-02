"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
require("./styling/style.sass");
const TextInput_1 = require("../DocumentView/UserInputComponents/TextInput/TextInput");
class Account extends React.Component {
    constructor(props) {
        super(props);
        this.generateInfo = (userArray, displayArrayName) => {
            let elementArray = [];
            for (let item in userArray) {
                let itemDescription = item;
                //Replacing _ with ' '
                while (itemDescription.includes('_')) {
                    itemDescription = itemDescription.replace('_', ' ');
                }
                //Capitalizing the first word
                itemDescription = itemDescription.charAt(0).toUpperCase() + itemDescription.slice(1);
                let component = (React.createElement("div", { key: item, className: 'account-content-line' },
                    React.createElement("div", { className: 'account-info-description' },
                        itemDescription,
                        ":"),
                    React.createElement(TextInput_1.default, { id: item, position: 'block', width: 'auto', border: 'solid 1px rgb(0, 0, 0, 0.1)', height: null, left: null, top: null, value: userArray[item], onChange: (e) => this.handleInputChange(e, item, 'personalInfo'), view: 'AccountPage' })));
                elementArray.push(component);
            }
            this.setState({
                [`${displayArrayName}`]: elementArray
            });
        };
        this.handleInputChange = (e, id, array) => {
            let user = this.state.user;
            user[array][id] = e.target.value;
            this.setState({
                user: user
            });
        };
        this.handleAccountTabPress = (e, tab, title, list, arrow) => {
            //Making sure code is executed only when selecting tab/title
            if (!(e.target.id == tab || e.target.id == title || e.target.id == arrow)) {
                return;
            }
            if (this.state[tab]) {
                document.getElementById(tab).classList.remove('account-tab-open');
                document.getElementById(title).classList.remove('account-tab-title-open');
                document.getElementById(list).classList.remove('account-content-list-open');
                document.getElementById(arrow).classList.remove('account-tab-title-arrow-open');
                this.setState({
                    [tab]: false
                });
            }
            else {
                document.getElementById(tab).classList.add('account-tab-open');
                document.getElementById(title).classList.add('account-tab-title-open');
                document.getElementById(list).classList.add('account-content-list-open');
                document.getElementById(arrow).classList.add('account-tab-title-arrow-open');
                this.setState({
                    [tab]: true
                });
            }
        };
        this.state = {
            user: {
                personalInfo: {
                    first_name: 'TRISTAN',
                    last_name: 'ABER',
                    middle_name: 'JOLYON',
                    DOB: '1998 Nov 08',
                    home_of_record: '19211 JEFFERSON DAVIS HWY, TRIANGLE, VA 22172',
                    place_of_birth: 'TUN TAVERN, PA',
                    age: 27,
                    sex: 'M',
                    height: 66,
                    weight: '140',
                    hair_color: 'BLN',
                    eye_color: 'BLU',
                    wears_glasses: false,
                },
                accountInfo: {
                    dod_id: '',
                    rank: 'PVT',
                    civ_license_state: 'KY',
                    class_of_vehicle: 'C',
                    civ_license_num: 'MARCORDET 434',
                    civ_issued_date: '11/8/1998',
                    civ_exp_date: '11/9/2018',
                    medical_cert_req: '*MED CERT REQUIRED',
                    organization: 'MARCOR DET FLW, MTIC',
                    authorization: 1,
                },
                additionalInfo: {}
            },
            currentView: '',
            personalInfoArray: [],
            accountInfoArray: [],
            additionalInfoArray: [],
            error: false,
            'personal-tab': false,
            'account-tab': false,
            'additional-tab': false
        };
    }
    componentDidMount() {
        this.generateInfo(this.state.user.personalInfo, 'personalInfoArray');
        this.generateInfo(this.state.user.accountInfo, 'accountInfoArray');
        this.generateInfo(this.state.user.additionalInfo, 'additionalInfoArray');
    }
    render() {
        return (React.createElement("div", { id: 'Account' },
            React.createElement("div", { className: 'documents-header' }, "Account Information"),
            React.createElement("div", { id: 'main-account-content-container' },
                React.createElement("div", { id: 'personal-tab', className: 'account-tab', onClick: (e) => this.handleAccountTabPress(e, 'personal-tab', 'personal-tab-title', 'personal-tab-list', 'personal-tab-arrow') },
                    React.createElement("div", { id: 'personal-tab-title', className: 'account-tab-title' },
                        "Personal Information",
                        React.createElement("img", { id: 'personal-tab-arrow', className: 'account-tab-title-arrow', src: "/images/down-arrow-1.png", alt: "" })),
                    React.createElement("div", { id: 'personal-tab-list', className: 'account-content-list' }, this.state.personalInfoArray)),
                React.createElement("div", { id: 'account-tab', className: 'account-tab', onClick: (e) => this.handleAccountTabPress(e, 'account-tab', 'account-tab-title', 'account-tab-list', 'account-tab-arrow') },
                    React.createElement("div", { id: 'account-tab-title', className: 'account-tab-title' },
                        "Account Information",
                        React.createElement("img", { id: 'account-tab-arrow', className: 'account-tab-title-arrow', src: "/images/down-arrow-1.png", alt: "" })),
                    React.createElement("div", { id: 'account-tab-list', className: 'account-content-list' }, this.state.accountInfoArray)))));
    }
}
exports.default = Account;
//# sourceMappingURL=Account.js.map