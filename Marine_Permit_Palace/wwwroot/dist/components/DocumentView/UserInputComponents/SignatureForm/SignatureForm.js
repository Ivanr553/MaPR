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
        //Getting style from props
        this.setStyle = () => {
            let style = this.state.style;
            style.width = this.props.width + 'px';
            style.height = this.props.height + 'px';
            style.top = this.props.top + 'px';
            style.left = this.props.left + 'px';
            this.setState({
                style: style
            });
        };
        //Takes signature png and embeds it into component
        this.sign = () => __awaiter(this, void 0, void 0, function* () {
            let signatureSource;
            let signature = React.createElement("img", { className: 'user-signature', src: signatureSource, alt: "" });
            this.setState({
                signatureContent: signature
            });
        });
        this.state = {
            style: {},
            signatureContent: 'Click to Sign',
            assignedSignatureContent: 'Click to Assign Signature'
        };
    }
    //React lifecycle methods
    componentWillMount() {
        this.setStyle();
    }
    componentDidMount() {
    }
    render() {
        if (this.props.view === 'DocumentPreview') {
            return (React.createElement("div", { id: this.props.id, className: 'SignatureForm', style: this.state.style, onClick: (e) => this.props.previewOnClickHandler(e) }, this.state.assignedSignatureContent));
        }
        if (this.props.view === 'PendingDocuments') {
            return (React.createElement("div", { className: 'SignatureForm', style: this.state.style, onClick: this.sign }, this.state.signatureContent));
        }
    }
}
exports.default = SignatureForm;
//# sourceMappingURL=SignatureForm.js.map