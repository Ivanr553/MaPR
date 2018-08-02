"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
require("./style.sass");
class Switch extends React.Component {
    constructor(props) {
        super(props);
        this.getLeftStyle = () => {
            if (this.props.initialToggle) {
                let style = {
                    animation: 'animateSelectedLeft 0.2s forwards'
                };
                return style;
            }
            if (!this.props.initialToggle) {
                let style = {
                    animation: 'animateDeselectedLeft 0.2s forwards'
                };
                return style;
            }
        };
        this.getRightStyle = () => {
            if (this.props.initialToggle) {
                let style = {
                    animation: 'animateSelectedRight 0.2s forwards'
                };
                return style;
            }
            if (!this.props.initialToggle) {
                let style = {
                    animation: 'animateDeselectedRight 0.2s forwards'
                };
                return style;
            }
        };
        this.handleClick = () => {
            this.setState({
                toggle: !this.state.toggle
            }, () => {
                this.props.handleSwitchToggle(this.props.field ? this.props.field : this.props.user);
            });
        };
        this.state = {
            toggle: false
        };
    }
    render() {
        return (React.createElement("div", { className: 'Switch', onClick: this.handleClick },
            React.createElement("div", { className: 'switch-item switch-item-left', style: this.getLeftStyle() }, this.props.offInnerText),
            React.createElement("div", { className: 'switch-item switch-item-right', style: this.getRightStyle() }, this.props.onInnerText)));
    }
}
exports.default = Switch;
//# sourceMappingURL=Switch.js.map