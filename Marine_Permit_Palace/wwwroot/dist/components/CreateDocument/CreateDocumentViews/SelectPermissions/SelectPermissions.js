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
class SelectPermissions extends React.Component {
    constructor(props) {
        super(props);
        //Finding and displaying added users
        this.handleFindUser = (e) => __awaiter(this, void 0, void 0, function* () {
            let query = e.target.value;
            if (query === '') {
                this.clearUsersFromSearch();
                return;
            }
            try {
                // let result = $.ajax({
                // })
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
                let userSearchResult = (React.createElement("li", { className: 'user-search-result', onClick: this.addUser }, userArray[i]));
                userSearchResultsArray.push(userSearchResult);
            }
            let userSearchResults = (React.createElement("ul", { id: 'user-search-results-list' }, userSearchResultsArray));
            this.setState({
                userSearchResults: userSearchResults
            });
        };
        this.addUser = () => {
            let userObjects = this.state.userObjects.slice();
            let userList = this.state.userList.slice();
            let user = {
                name: 'Example User',
                id: Math.random()
            };
            userObjects.push(user);
            let addedUser = React.createElement("div", { className: 'added-user', id: user.id.toString() },
                user.name,
                React.createElement("div", { className: 'added-user-delete-icon', onClick: (e) => { this.deleteUser(e); } }, "x"));
            userList.push(addedUser);
            let input = document.getElementById('user-search-bar');
            input.value = '';
            this.setState({
                userList: userList,
                userObjects: userObjects
            }, () => {
                this.giveUserList();
            });
        };
        this.deleteUser = (e) => {
            let id = e.target.parentNode.id;
            let userList = this.state.userList.slice();
            let userObjects = this.state.userObjects.slice();
            userList.forEach(element => {
                if (element.props.id === id) {
                    userList.pop(element);
                }
            });
            userObjects.forEach(user => {
                if (user.id === parseFloat(id)) {
                    userObjects.pop(user);
                }
            });
            this.setState({
                userList: userList,
                userObjects: userObjects
            }, () => {
                this.giveUserList();
            });
        };
        //State Management
        this.giveSelectPermissionsComplete = selectPermissionsComplete => {
            this.props.getSelectPermissionsComplete(selectPermissionsComplete);
        };
        this.giveUserList = () => {
            this.props.getUserList(this.state.userList);
            if (this.state.userList.length > 0) {
                this.giveSelectPermissionsComplete(true);
            }
        };
        this.state = {
            userObjects: [],
            userList: []
        };
    }
    componentDidUpdate() {
        if (this.state.userList.length < 1) {
            this.giveSelectPermissionsComplete(false);
        }
    }
    render() {
        return (React.createElement("div", { id: 'SelectPermissions' },
            React.createElement("div", { id: 'select-users-header', className: 'documents-header' }, "Select Users"),
            React.createElement("div", { className: 'document-list-container' },
                React.createElement("div", { id: 'user-search-main-container' },
                    React.createElement("div", { id: 'user-search-bar-container' },
                        React.createElement("div", { id: 'search-bar-magnifying-glass' }),
                        React.createElement("input", { onBlur: this.clearUsersFromSearch, onFocus: (e) => { this.handleFindUser(e); }, onChange: (e) => { this.handleFindUser(e); }, id: 'user-search-bar', placeholder: 'Find Users', type: "text" }),
                        this.state.userSearchResults),
                    React.createElement("div", { id: 'added-users-title' }, "Selected Users"),
                    React.createElement("div", { className: 'added-users-container' }, this.state.userList)))));
    }
}
exports.default = SelectPermissions;
//# sourceMappingURL=SelectPermissions.js.map