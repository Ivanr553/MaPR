"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const s = require('./styling/style.sass');
class CheckboxInput extends React.Component {
    constructor(props) {
        super(props);
        this.getStyle = () => {
            let style = {
                width: `${this.props.width}px`,
                height: `${this.props.height}px`,
                top: `${this.props.top}px`,
                left: `${this.props.left}px`,
                cursor: 'pointer'
            };
            return style;
        };
        this.state = {
            style: {}
        };
    }
    render() {
        let checkmark;
        if (this.props.checked) {
            checkmark = 'X';
        }
        if (this.props.view === 'DocumentPreview') {
            return (React.createElement("div", { id: this.props.id, className: 'CheckboxInput', style: this.getStyle(), onClick: (e) => this.props.previewOnClickHandler(e) }));
        }
        if (this.props.view === 'PendingDocuments') {
            return (React.createElement("div", { id: this.props.id, className: 'CheckboxInput', style: this.getStyle(), onClick: (e) => this.props.onChange(e) }, checkmark));
        }
    }
}
exports.default = CheckboxInput;
//# sourceMappingURL=CheckboxInput.js.map