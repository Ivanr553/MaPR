"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
require("./styling/SignatureFormStyle.sass");
class SignatureForm extends React.Component {
    constructor(props) {
        super(props);
        this.getDocumentPreviewStyle = () => {
            if (!!this.props.assigned_to) {
                let style = {
                    width: `${this.props.width}px`,
                    height: `${this.props.height}px`,
                    top: `${this.props.top}px`,
                    left: `${this.props.left}px`,
                    backgroundColor: 'rgb(189, 255, 181)'
                };
                return style;
            }
            else {
                let style = {
                    width: `${this.props.width}px`,
                    height: `${this.props.height}px`,
                    top: `${this.props.top}px`,
                    left: `${this.props.left}px`,
                    backgroundColor: 'rgb(255, 180, 180)'
                };
                return style;
            }
        };
        //Getting style from props
        this.getPendingDocumentsStyle = () => {
            if (this.props.is_disabled) {
                let style = {
                    width: `${this.props.width}px`,
                    height: `${this.props.height}px`,
                    top: `${this.props.top}px`,
                    left: `${this.props.left}px`,
                    backgroundColor: 'rgba(0, 0, 0, 0.1)',
                    cursor: 'default'
                };
                return style;
            }
            else {
                let style = {
                    width: `${this.props.width}px`,
                    height: `${this.props.height}px`,
                    top: `${this.props.top}px`,
                    left: `${this.props.left}px`,
                    backgroundColor: 'rgba(255, 242, 0, 0.1)'
                };
                return style;
            }
        };
        //Takes signature png and embeds it into component
        this.getSignatureContent = () => {
            if (!!!this.props.signature_base64) {
                return React.createElement("img", { src: "", alt: "" });
            }
            return React.createElement("img", { className: 'user-signature', src: `data:image/png;base64,${this.props.signature_base64}`, alt: "" });
        };
        this.documentPreviewContent = () => {
            return !!this.props.assigned_to ? `Assigned to: ${this.props.assigned_to.dod_id}` : `Click to Assign Signature`;
        };
        this.state = {
            style: {},
            signatureContent: 'Click to Sign'
        };
    }
    render() {
        if (this.props.view === 'DocumentPreview') {
            if (this.props.is_disabled) {
                React.createElement("div", { id: this.props.id, className: 'SignatureForm', style: this.getDocumentPreviewStyle() }, this.documentPreviewContent());
            }
            return (React.createElement("div", { id: this.props.id, className: 'SignatureForm', style: this.getDocumentPreviewStyle(), onClick: (e) => { this.props.previewOnClickHandler(e); } }, this.documentPreviewContent()));
        }
        if (this.props.view === 'PendingDocuments') {
            if (this.props.is_disabled) {
                return (React.createElement("div", { id: this.props.id, className: 'SignatureForm', style: this.getPendingDocumentsStyle() }, this.getSignatureContent()));
            }
            return (React.createElement("div", { id: this.props.id, className: 'SignatureForm', style: this.getPendingDocumentsStyle(), onClick: (e) => this.props.signHandler(e) }, this.getSignatureContent()));
        }
    }
}
exports.default = SignatureForm;
//# sourceMappingURL=SignatureForm.js.map