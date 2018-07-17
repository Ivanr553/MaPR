"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
class AddedUser extends React.Component {
    constructor() {
        super(...arguments);
        this.getStyle = () => {
            console.log('receiving:', this.props.fieldAssigned);
            if (this.props.isInSidebar) {
                let style = {
                    cursor: ((this.props.user.assigned_to !== null && this.props.user.assigned_to.indexOf(this.props.currentSelectedFieldId) >= 0) || this.props.fieldAssigned)
                        ? 'default' : 'pointer',
                    backgroundColor: (this.props.user.assigned_to !== null && this.props.user.assigned_to.indexOf(this.props.currentSelectedFieldId) >= 0)
                        ? 'lightgrey' : ''
                };
                return style;
            }
            if (!this.props.isInSidebar) {
                let style = {
                    backgroundColor: (this.props.user.assigned_to !== null && this.props.user.assigned_to.indexOf(this.props.currentSelectedFieldId) >= 0)
                        ? 'lightgrey' : ''
                };
                return style;
            }
        };
    }
    componentDidMount() {
    }
    render() {
        if (this.props.isInSidebar) {
            return (React.createElement("div", { style: this.getStyle(), className: 'added-user', id: this.props.user.id.toString(), onClick: (e) => this.props.assignUserToField(e) }, this.props.user.name));
        }
        if (!this.props.isInSidebar) {
            return (React.createElement("div", { style: this.getStyle(), className: 'added-user', id: this.props.user.id.toString() },
                this.props.user.name,
                React.createElement("div", { className: 'added-user-delete-icon', onClick: (e) => { this.props.deleteUser(e); } }, "x")));
        }
    }
}
exports.default = AddedUser;
//# sourceMappingURL=AddedUser.js.map