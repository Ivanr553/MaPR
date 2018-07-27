"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const AddedUser_1 = require("./AddedUser");
class AddedUserList extends React.Component {
    constructor(props) {
        super(props);
        this.checkForAssignedField = () => {
            let userList = this.props.userList;
            let currentSelectedFieldId = this.props.currentSelectedFieldId;
            let result = false;
            userList.forEach(user => {
                if (!!user.assigned_to) {
                    if (user.assigned_to.indexOf(currentSelectedFieldId) >= 0) {
                        result = true;
                    }
                }
            });
            return result;
        };
        this.state = {
            fieldAssigned: false
        };
    }
    renderAddedUsers() {
        let userList = this.props.userList;
        let userElementList = [];
        if (this.props.isInSidebar) {
            userList = userList.filter(user => {
                return user.assigned_to.indexOf(this.props.currentSelectedFieldId) < 0;
            });
        }
        userList.forEach(user => {
            userElementList.push(React.createElement(AddedUser_1.default, { removeAssignedUser: this.props.removeAssignedUser, key: Math.random(), fieldAssigned: this.checkForAssignedField(), currentSelectedFieldId: this.props.currentSelectedFieldId, selectedUser: this.props.selectedUser, user: user, handleAddedUserPress: e => this.props.handleAddedUserPress(e), deleteUser: this.props.deleteUser, isInSidebar: this.props.isInSidebar }));
        });
        return userElementList;
    }
    componentDidMount() {
    }
    render() {
        return (React.createElement("div", { className: this.props.className }, this.renderAddedUsers()));
    }
}
exports.default = AddedUserList;
//# sourceMappingURL=AddedUserList.js.map