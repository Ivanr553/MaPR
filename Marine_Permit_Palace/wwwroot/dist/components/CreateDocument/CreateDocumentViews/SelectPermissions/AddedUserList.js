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
                if (user.assigned_to !== null) {
                    if (user.assigned_to.indexOf(currentSelectedFieldId) >= 0) {
                        console.log('sending:', true);
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
        userList.forEach(user => {
            userElementList.push(React.createElement(AddedUser_1.default, { key: Math.random(), fieldAssigned: this.checkForAssignedField(), currentSelectedFieldId: this.props.currentSelectedFieldId, user: user, assignUserToField: e => this.props.assignUserToField(e), deleteUser: this.props.deleteUser, isInSidebar: this.props.isInSidebar }));
        });
        return userElementList;
    }
    componentDidMount() {
    }
    render() {
        return (React.createElement("div", { className: 'AddedUserList added-users-container' }, this.renderAddedUsers()));
    }
}
exports.default = AddedUserList;
//# sourceMappingURL=AddedUserList.js.map