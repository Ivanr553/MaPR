"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const AddedUserList_1 = require("../SelectPermissions/AddedUserList");
class DocumentPreviewSidebar extends React.Component {
    constructor(props) {
        super(props);
        this.showSelectedField = () => {
            if (this.props.currentSelectedField === undefined) {
                return;
            }
            else {
                return (React.createElement("div", null,
                    React.createElement("div", { className: 'selected-field-content' },
                        React.createElement("div", { className: 'selected-field-name' }, this.props.currentSelectedField.field_name),
                        React.createElement("div", { className: 'selected-field-assigned-user' }, this.props.currentSelectedField.assigned_to !== null ? this.props.currentSelectedField.assigned_to.name : null))));
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
            React.createElement("div", { className: 'preview-documents-header' }, "Selected Field"),
            React.createElement("div", { className: 'selected-field-display-container' }, this.showSelectedField()),
            React.createElement("div", { className: 'preview-documents-header' }, "User List"),
            React.createElement("div", { id: 'added-users-container-preview' },
                React.createElement(AddedUserList_1.default, { currentSelectedFieldId: this.props.currentSelectedFieldId, userList: this.props.userList, assignUserToField: this.props.assignUserToField, deleteUser: this.props.deleteUser, isInSidebar: true }))));
    }
}
exports.default = DocumentPreviewSidebar;
//# sourceMappingURL=DocumentPreviewSidebar.js.map