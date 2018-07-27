"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
class AddedUser extends React.Component {
    constructor() {
        super(...arguments);
        this.getStyle = () => {
            if (this.props.isInSidebar) {
                let style = {
                    cursor: ((!!this.props.user.assigned_to && this.props.user.assigned_to.indexOf(this.props.currentSelectedFieldId) >= 0) || this.props.fieldAssigned)
                        ? 'default' : 'pointer',
                    backgroundColor: (!!this.props.user.assigned_to && this.props.user.assigned_to.indexOf(this.props.currentSelectedFieldId) >= 0)
                        ? 'lightgrey' : ''
                };
                return style;
            }
            if (!this.props.isInSidebar) {
                let cursor = 'pointer';
                let backgroundColor = '';
                if (!!this.props.selectedUser) {
                    cursor = this.props.user === this.props.selectedUser ? 'default' : 'pointer';
                    backgroundColor = this.props.user === this.props.selectedUser ? 'lightgrey' : '';
                }
                let style = {
                    backgroundColor: backgroundColor,
                    cursor: cursor
                };
                return style;
            }
        };
    }
    render() {
        if (this.props.isInSidebar) {
            return (React.createElement("div", { style: this.getStyle(), className: 'added-user', id: this.props.user.dod_id.toString() },
                React.createElement("div", { onClick: (e) => this.props.handleAddedUserPress(e) }, this.props.user.dod_id),
                React.createElement("div", { onClick: (e) => this.props.handleAddedUserPress(e) }, this.props.user.name)));
        }
        if (!this.props.isInSidebar) {
            return (React.createElement("div", { style: this.getStyle(), className: 'added-user', id: this.props.user.dod_id.toString(), onClick: e => this.props.handleAddedUserPress(e) },
                React.createElement("div", null, this.props.user.dod_id),
                React.createElement("div", null, this.props.user.name !== null ? this.props.user.name : ' '),
                React.createElement("div", { className: 'added-user-delete-icon', onClick: (e) => { this.props.deleteUser(e); } }, "x")));
        }
    }
}
exports.default = AddedUser;
//# sourceMappingURL=AddedUser.js.map