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
const AddedUserPermissions_1 = require("./AddedUserPermissions");
const s = require('./styling/style.sass');
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
        this.handleAddedUserPress = (e) => {
            let target = e.target;
            if (target.classList.contains('added-user-delete-icon')) {
                return;
            }
            while (target.id === '') {
                target = target.parentNode;
            }
            let id = parseInt(target.id);
            let user = this.props.userList.filter(user => {
                return user.dod_id === id;
            })[0];
            this.setState({
                selectedUser: user
            });
        };
        this.handleSwitchToggle = (field) => {
            const selectedUser = this.state.selectedUser;
            selectedUser[field] = !selectedUser[field];
            this.setState({
                selectedUser: selectedUser
            });
        };
        //Finding and displaying added users
        this.handleFindUser = (e) => __awaiter(this, void 0, void 0, function* () {
            let query = e.target.value;
            if (query === '') {
                this.clearUsersFromSearch();
                return;
            }
            try {
                let request = yield fetch(`/Account/FindUsers?search=${query}`, { credentials: 'same-origin' });
                let userArray = yield request.json();
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
                let user = userArray[i];
                let userSearchResult = (React.createElement("li", { key: user.dod_id, className: 'user-search-result', onClick: () => this.props.addUser(user) },
                    user.dod_id,
                    ", ",
                    user.first_name));
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
            userSearchResults: '',
            selectedUser: undefined
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
                        React.createElement("input", { autoComplete: 'off', onBlur: this.clearUsersFromSearch, onFocus: (e) => { this.handleFindUser(e); }, onChange: (e) => { this.handleFindUser(e); }, id: 'user-search-bar', placeholder: 'Find Users', type: "text" }),
                        this.state.userSearchResults),
                    React.createElement("div", { className: 'added-users-components-grid' },
                        React.createElement("div", { id: 'added-users-title' }, "Selected Users"),
                        React.createElement(AddedUserList_1.default, { selectedUser: this.state.selectedUser, handleAddedUserPress: this.handleAddedUserPress, removeAssignedUser: this.props.removeAssignedUser, className: 'added-users-container', currentSelectedFieldId: this.props.currentSelectedFieldId, userList: this.props.userList, deleteUser: this.props.deleteUser, isInSidebar: false }),
                        React.createElement(AddedUserPermissions_1.default, { assigned_user: this.props.assigned_user, selectedUser: this.state.selectedUser, handleSwitchToggle: this.handleSwitchToggle, handleAssignedUserToggle: this.props.handleToggleAssignedUser }))))));
    }
}
exports.default = SelectPermissions;
//# sourceMappingURL=SelectPermissions.js.map