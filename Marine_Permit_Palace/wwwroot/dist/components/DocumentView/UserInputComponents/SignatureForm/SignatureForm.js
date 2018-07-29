"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const s = require('./styling/style.sass');
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
            let style = {
                width: `${this.props.width}px`,
                height: `${this.props.height}px`,
                top: `${this.props.top}px`,
                left: `${this.props.left}px`,
            };
            return style;
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
            return (React.createElement("div", { id: this.props.id, className: 'SignatureForm', style: this.getDocumentPreviewStyle(), onClick: (e) => { this.props.previewOnClickHandler(e); } }, this.documentPreviewContent()));
        }
        if (this.props.view === 'PendingDocuments') {
            return (React.createElement("div", { id: this.props.id, className: 'SignatureForm', style: this.getPendingDocumentsStyle(), onClick: (e) => this.props.signHandler(e) }, this.getSignatureContent()));
        }
    }
}
exports.default = SignatureForm;
//# sourceMappingURL=SignatureForm.js.map