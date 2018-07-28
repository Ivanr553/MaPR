"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
        this.sign = () => __awaiter(this, void 0, void 0, function* () {
            let request = yield fetch('/Account/GetSignature', { credentials: 'same-origin' });
            let response = yield request.json();
            let data = `data:image/png;base64,${response.signature_base64}`;
            let signature = React.createElement("img", { className: 'user-signature', src: data, alt: "" });
            this.setState({
                signatureContent: signature
            });
        });
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
            return (React.createElement("div", { className: 'SignatureForm', style: this.getPendingDocumentsStyle(), onClick: this.sign }, this.state.signatureContent));
        }
    }
}
exports.default = SignatureForm;
//# sourceMappingURL=SignatureForm.js.map