"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const Switch_1 = require("../../../Switch/Switch");
class AddedUserPermissions extends React.Component {
    constructor() {
        super(...arguments);
        this.checkIfAssignedUser = () => {
            return this.props.assigned_user === this.props.selectedUser;
        };
    }
    render() {
        if (!!!this.props.selectedUser) {
            return React.createElement("div", { className: 'AddedUserPermissions' });
        }
        return (React.createElement("div", { className: 'AddedUserPermissions' },
            React.createElement("div", { className: 'user-permissions-title' }, "Can Edit"),
            React.createElement(Switch_1.default, { offInnerText: 'Cannot Edit', onInnerText: 'Can Edit', field: 'is_allowed_edit', handleSwitchToggle: this.props.handleSwitchToggle, initialToggle: this.props.selectedUser.is_allowed_edit }),
            React.createElement("div", { className: 'user-permissions-title' }, "Can Approve"),
            React.createElement(Switch_1.default, { offInnerText: 'Cannot Approve', onInnerText: 'Can Approve', field: 'is_allowed_approve', handleSwitchToggle: this.props.handleSwitchToggle, initialToggle: this.props.selectedUser.is_allowed_approve }),
            React.createElement("div", { className: 'user-permissions-title' }, "Can Submit"),
            React.createElement(Switch_1.default, { offInnerText: 'Cannot Submit', onInnerText: 'Can Submit', field: 'is_allowed_submit', handleSwitchToggle: this.props.handleSwitchToggle, initialToggle: this.props.selectedUser.is_allowed_submit }),
            React.createElement("div", { className: 'user-permissions-title' }, "Can Submit"),
            React.createElement(Switch_1.default, { offInnerText: 'Cannot Assign', onInnerText: 'Can Assign', field: 'is_allowed_assign', handleSwitchToggle: this.props.handleSwitchToggle, initialToggle: this.props.selectedUser.is_allowed_assign }),
            React.createElement("div", { className: 'user-permissions-title' }, "Assigned To"),
            React.createElement(Switch_1.default, { offInnerText: 'Not Assigned', onInnerText: 'Assigned', field: null, user: this.props.selectedUser, handleSwitchToggle: this.props.handleAssignedUserToggle, initialToggle: this.checkIfAssignedUser() })));
    }
}
exports.default = AddedUserPermissions;
//# sourceMappingURL=AddedUserPermissions.js.map