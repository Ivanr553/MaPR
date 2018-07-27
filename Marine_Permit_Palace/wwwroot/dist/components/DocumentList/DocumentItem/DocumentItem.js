"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
class DocumentItem extends React.Component {
    constructor(props) {
        super(props);
        this.getStyle = () => {
            if (this.props.document.idDocument === this.props.selectedDocument) {
                return {
                    border: 'solid 2px rgba(38, 107, 168, 0.7)'
                };
            }
            if (this.props.document.idDocument !== this.props.selectedDocument) {
                return {
                    border: 'solid 2px rgba(0, 0, 0, 0)'
                };
            }
        };
        this.state = {};
    }
    render() {
        return (React.createElement("div", { className: 'document-item', style: this.getStyle(), id: this.props.document.idDocument, onClick: (e) => { this.props.selectDocument(e); } },
            React.createElement("div", { className: 'document-item-field' },
                "ID: ",
                this.props.document.idDocument),
            React.createElement("div", { className: 'document-item-field' }, this.props.document.name)));
    }
}
exports.default = DocumentItem;
//# sourceMappingURL=DocumentItem.js.map