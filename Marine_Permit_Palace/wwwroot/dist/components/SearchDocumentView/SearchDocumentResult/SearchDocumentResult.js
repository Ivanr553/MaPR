"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
require("./SearchDocumentResultStyle.sass");
class SearchDocumentResult extends React.Component {
    constructor(props) {
        super(props);
        this.handleOnClick = (e) => {
            if (e.target.className === 'search-document-content-line' || e.target.className === '') {
                return;
            }
            if (e.target.className === 'search-document-link') {
                this.props.handleSearchDocument(this.props.searchDocument.submitted_document_id, this.props.searchDocument.document_name);
                return;
            }
            this.setState({
                arrowClassName: this.handleArrowStyle(),
                searchBodyClassName: this.handleSearchBodyClassName()
            });
        };
        this.handleSearchBodyClassName = () => {
            if (this.state.searchBodyClassName === 'search-content-body') {
                return 'search-content-body-open';
            }
            if (this.state.searchBodyClassName === 'search-content-body-open') {
                return 'search-content-body';
            }
        };
        this.handleArrowStyle = () => {
            if (this.state.arrowClassName === 'search-document-title-arrow') {
                return 'search-document-title-arrow-open';
            }
            if (this.state.arrowClassName === 'search-document-title-arrow-open') {
                return 'search-document-title-arrow';
            }
        };
        this.getStyle = () => {
            // if(false) {
            //     return {
            //         border: 'solid 2px rgba(38, 107, 168, 0.7)'
            //     }
            // }
            // if(true) {
            //     return {
            //         border: 'solid 2px rgba(0, 0, 0, 0)'
            //     }
            // }
        };
        this.getAssignedTo = () => {
            let assigned_to = this.props.searchDocument.assigned_to;
            let assigned_to_elements = [];
            assigned_to.forEach(user => {
                let newElement = (React.createElement("div", { key: Math.random() }, user));
                assigned_to_elements.push(newElement);
            });
            return assigned_to_elements;
        };
        this.state = {
            arrowClassName: 'search-document-title-arrow',
            searchBodyClassName: 'search-content-body'
        };
    }
    render() {
        return (React.createElement("div", { className: 'SearchDocumentResult', id: Math.random().toString(), onClick: (e) => {
                // this.props.selectDocument(e)
                this.handleOnClick(e);
            } },
            React.createElement("div", { className: 'search-document-field search-document-field-title' },
                React.createElement("img", { className: 'search-document-link', src: "/images/doc_icon.png", alt: "" }),
                React.createElement("div", { className: 'search-document-field' },
                    "Document Name: ",
                    this.props.searchDocument.document_name),
                React.createElement("div", { className: 'search-document-field' },
                    "Date Created: ",
                    this.props.searchDocument.date_created),
                React.createElement("img", { className: this.state.arrowClassName, src: "/images/down-arrow-1.png", alt: "" })),
            React.createElement("div", { className: this.state.searchBodyClassName },
                React.createElement("div", { className: 'search-document-content-line' },
                    React.createElement("div", null, "Date Last Edited:"),
                    React.createElement("div", null, this.props.searchDocument.date_last_edited)),
                React.createElement("div", { className: 'search-document-content-line' },
                    React.createElement("div", null, "Assigned By:"),
                    React.createElement("div", null, this.props.searchDocument.assigned_by)),
                React.createElement("div", { className: 'search-document-content-line' },
                    React.createElement("div", null, "Assigned To:"),
                    React.createElement("div", { className: 'search-document-assigned-to-container' }, this.getAssignedTo())),
                React.createElement("div", { className: 'search-document-content-line' },
                    React.createElement("div", null, "Is Completed:"),
                    React.createElement("div", null, this.props.searchDocument.is_completed)),
                React.createElement("div", { className: 'search-document-content-line' },
                    React.createElement("div", null, "Document Template Name:"),
                    React.createElement("div", null, this.props.searchDocument.document_template_name)),
                React.createElement("div", { className: 'search-document-content-line' },
                    React.createElement("div", null, "User Organization:"),
                    React.createElement("div", null, this.props.searchDocument.user_organization)),
                React.createElement("div", { className: 'search-document-content-line' },
                    React.createElement("div", null, "Date Completed:"),
                    React.createElement("div", null, this.props.searchDocument.date_completed)))));
    }
}
exports.default = SearchDocumentResult;
//# sourceMappingURL=SearchDocumentResult.js.map