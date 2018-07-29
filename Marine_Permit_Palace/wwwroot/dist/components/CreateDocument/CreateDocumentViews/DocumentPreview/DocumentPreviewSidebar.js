"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const AddedUser_1 = require("../SelectPermissions/AddedUser");
const AddedUserList_1 = require("../SelectPermissions/AddedUserList");
class DocumentPreviewSidebar extends React.Component {
    constructor(props) {
        super(props);
        this.cleanUpFieldName = (field_name) => {
            while (field_name.indexOf('_') > -1) {
                field_name = field_name.replace('_', ' ');
            }
            return field_name.charAt(0).toUpperCase() + field_name.slice(1);
        };
        this.showSelectedField = () => {
            if (this.props.currentSelectedField === undefined) {
                return;
            }
            else {
                let field_name = this.cleanUpFieldName(this.props.currentSelectedField.field_name);
                return (React.createElement("div", null,
                    React.createElement("div", { className: 'preview-documents-header' }, field_name),
                    React.createElement("div", { className: 'selected-field-display-container' }, this.showSelectedFieldContent())));
            }
        };
        this.showSelectedFieldContent = () => {
            if (this.props.currentSelectedField.assigned_to !== null) {
                return React.createElement(AddedUser_1.default, { removeAssignedUser: this.props.removeAssignedUser, key: Math.random(), fieldAssigned: true, currentSelectedFieldId: this.props.currentSelectedFieldId, user: this.props.currentSelectedField.assigned_to, handleAddedUserPress: e => this.props.handleAddedUserPress(e), deleteUser: this.props.deleteUser, isInSidebar: true });
            }
            else {
                return React.createElement("div", { className: 'added-user', style: { cursor: 'default' } }, "Select User");
            }
        };
        //Sidebar Functions
        this.hideSidebar = () => {
            let sidebar = document.getElementById('document-view-sidebar');
            sidebar.classList.add('hide-sidebar');
            sidebar.classList.remove('show-sidebar');
            this.giveHideSidebar();
        };
        this.showSidebar = () => {
            let sidebar = document.getElementById('document-view-sidebar');
            sidebar.classList.add('show-sidebar');
            sidebar.classList.remove('hide-sidebar');
        };
        this.giveHideSidebar = () => {
            this.props.getHideSidebar(false);
        };
        this.state = {};
    }
    componentDidUpdate() {
        if (this.props.showSidebar) {
            this.showSidebar();
        }
    }
    render() {
        return (React.createElement("div", { id: 'document-view-sidebar', className: '' },
            React.createElement("div", { id: 'close-sidebar-icon', onClick: this.hideSidebar }, "x"),
            this.showSelectedField(),
            React.createElement("div", { className: 'preview-documents-header' }, "User List"),
            React.createElement(AddedUserList_1.default, { removeAssignedUser: this.props.removeAssignedUser, className: 'added-users-container-preview', currentSelectedFieldId: this.props.currentSelectedFieldId, userList: this.props.userList, handleAddedUserPress: this.props.handleAddedUserPress, deleteUser: this.props.deleteUser, isInSidebar: true })));
    }
}
exports.default = DocumentPreviewSidebar;
//# sourceMappingURL=DocumentPreviewSidebar.js.map