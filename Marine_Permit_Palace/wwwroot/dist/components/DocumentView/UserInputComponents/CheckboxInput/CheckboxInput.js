"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const s = require('./styling/style.sass');
class CheckboxInput extends React.Component {
    constructor(props) {
        super(props);
        this.getStyle = () => {
            if (this.props.is_disabled) {
                let style = {
                    width: `${this.props.width - 1}px`,
                    height: `${this.props.height - 1}px`,
                    top: `${this.props.top + 1}px`,
                    left: `${this.props.left + 1}px`,
                    cursor: 'default',
                    backgroundColor: 'rgba(0, 0, 0, 0.1)'
                };
                return style;
            }
            else {
                let style = {
                    width: `${this.props.width}px`,
                    height: `${this.props.height}px`,
                    top: `${this.props.top}px`,
                    left: `${this.props.left}px`,
                    cursor: 'pointer'
                };
                return style;
            }
        };
        this.state = {
            style: {}
        };
    }
    render() {
        let checkmark;
        if (this.props.checked === 'On') {
            checkmark = 'X';
        }
        if (this.props.view === 'DocumentPreview') {
            return (React.createElement("div", { id: this.props.id, className: 'CheckboxInput', style: this.getStyle(), onClick: (e) => this.props.previewOnClickHandler(e) }));
        }
        if (this.props.view === 'PendingDocuments') {
            if (this.props.is_disabled) {
                React.createElement("div", { id: this.props.id, className: 'CheckboxInput', style: this.getStyle() }, checkmark);
            }
            return (React.createElement("div", { id: this.props.id, className: 'CheckboxInput', style: this.getStyle(), onClick: (e) => this.props.onChange(e) }, checkmark));
        }
    }
}
exports.default = CheckboxInput;
//# sourceMappingURL=CheckboxInput.js.map