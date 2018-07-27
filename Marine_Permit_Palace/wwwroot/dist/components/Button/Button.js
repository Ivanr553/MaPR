"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const s = require('./style.sass');
class Button extends React.Component {
    constructor(props) {
        super(props);
        this.getStyle = () => {
            if (this.state.hover) {
                let style = {
                    backgroundColor: this.props.color ? this.props.color : '$main-color',
                    color: 'black',
                    borderColor: this.props.color ? this.props.color : '$main-color'
                };
                return style;
            }
            if (!this.state.hover) {
                let style = {
                    backgroundColor: 'rgba(0, 0, 0, 0)',
                    color: this.props.color ? this.props.color : '$main-color',
                    borderColor: this.props.color ? this.props.color : '$main-color'
                };
                return style;
            }
        };
        this.handleMouseOver = () => {
            this.setState({
                hover: true
            });
        };
        this.handleMouseLeave = () => {
            this.setState({
                hover: false
            });
        };
        this.state = {
            hover: false
        };
    }
    render() {
        return (React.createElement("div", { className: 'app-button', style: this.getStyle(), onClick: e => this.props.onClickHandler(e), onMouseOver: this.handleMouseOver, onMouseLeave: this.handleMouseLeave }, this.props.innerText));
    }
}
exports.default = Button;
//# sourceMappingURL=Button.js.map