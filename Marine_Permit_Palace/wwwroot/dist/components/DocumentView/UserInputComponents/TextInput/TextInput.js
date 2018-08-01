"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const s = require('./styling/style.sass');
class TextInput extends React.Component {
    constructor(props) {
        super(props);
        //Getting style from props
        this.getStyle = () => {
            let style = {
                position: this.props.position,
                border: this.props.border,
                width: `${this.props.width}px`,
                height: `${this.props.height}px`,
                top: `${this.props.top}px`,
                left: `${this.props.left}px`,
            };
            return style;
        };
        this.getDisabledStyle = () => {
            let style = {
                position: this.props.position,
                border: this.props.border,
                width: `${this.props.width}px`,
                height: `${this.props.height}px`,
                top: `${this.props.top}px`,
                left: `${this.props.left}px`,
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                cursor: 'default'
            };
            return style;
        };
        this.state = {
            style: {}
        };
    }
    render() {
        if (this.props.view === 'DocumentPreview') {
            return (React.createElement("textarea", { readOnly: true, id: this.props.id, className: 'TextInput preview-TextInput', style: this.getStyle(), defaultValue: this.props.value, onClick: this.props.previewOnClickHandler }));
        }
        if (this.props.view === 'PendingDocuments' || this.props.view === 'AccountPage') {
            if (this.props.is_disabled) {
                return (React.createElement("textarea", { readOnly: true, id: this.props.id, className: 'TextInput', style: this.getDisabledStyle(), defaultValue: this.props.value }));
            }
            return (React.createElement("textarea", { id: this.props.id, className: 'TextInput', style: this.getStyle(), defaultValue: this.props.value, onChange: this.props.onChange }));
        }
    }
}
exports.default = TextInput;
//# sourceMappingURL=TextInput.js.map