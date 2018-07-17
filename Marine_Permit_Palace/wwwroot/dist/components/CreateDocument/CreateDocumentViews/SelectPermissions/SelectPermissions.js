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
const AddedUserList_1 = require("./AddedUserList");
const $ = require("jquery");
class SelectPermissions extends React.Component {
    constructor(props) {
        super(props);
        this.handleShow = () => {
            if (!this.props.selectPermissionsBoolean) {
                let style = {
                    display: 'none'
                };
                return style;
            }
            else {
                let style = {
                    display: 'block'
                };
                return style;
            }
        };
        //Finding and displaying added users
        this.handleFindUser = (e) => __awaiter(this, void 0, void 0, function* () {
            let query = e.target.value;
            if (query === '') {
                this.clearUsersFromSearch();
                return;
            }
            try {
                let result = yield $.get(`/Account/FindUsers?search=${query}`);
                //No users yet, will just use fake ones for now  
                let userArray = ['user1', 'user2', 'user3'];
                this.displayUsersFromSearch(userArray);
            }
            catch (e) {
                console.log(e);
            }
        });
        this.clearUsersFromSearch = () => {
            setTimeout(() => {
                this.setState({
                    userSearchResults: ''
                });
            }, 150);
        };
        this.displayUsersFromSearch = (userArray) => {
            let userSearchResultsArray = [];
            for (let i = 0; i < userArray.length; i++) {
                let userSearchResult = (React.createElement("li", { key: i, className: 'user-search-result', onClick: this.props.addUser }, userArray[i]));
                userSearchResultsArray.push(userSearchResult);
            }
            let userSearchResults = (React.createElement("ul", { id: 'user-search-results-list' }, userSearchResultsArray));
            this.setState({
                userSearchResults: userSearchResults
            });
        };
        //State Management
        this.giveSelectPermissionsComplete = selectPermissionsComplete => {
            this.props.getSelectPermissionsComplete(selectPermissionsComplete);
        };
        this.state = {
            userObjects: [],
            userList: []
        };
    }
    componentDidMount() {
        this.handleShow();
    }
    render() {
        return (React.createElement("div", { id: 'SelectPermissions', style: this.handleShow() },
            React.createElement("div", { id: 'select-users-header', className: 'documents-header' }, "Select Users"),
            React.createElement("div", { className: 'document-list-container' },
                React.createElement("div", { id: 'user-search-main-container' },
                    React.createElement("div", { id: 'user-search-bar-container' },
                        React.createElement("div", { id: 'search-bar-magnifying-glass' }),
                        React.createElement("input", { onBlur: this.clearUsersFromSearch, onFocus: (e) => { this.handleFindUser(e); }, onChange: (e) => { this.handleFindUser(e); }, id: 'user-search-bar', placeholder: 'Find Users', type: "text" }),
                        this.state.userSearchResults),
                    React.createElement("div", { id: 'added-users-title' }, "Selected Users"),
                    React.createElement(AddedUserList_1.default, { currentSelectedFieldId: this.props.currentSelectedFieldId, userList: this.props.userList, assignUserToField: this.props.assignUserToField, deleteUser: this.props.deleteUser, isInSidebar: false })))));
    }
}
exports.default = SelectPermissions;
//# sourceMappingURL=SelectPermissions.js.map