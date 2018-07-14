"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const s = require('./styling/style.sass');
class CheckboxInput extends React.Component {
    constructor(props) {
        super(props);
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
        this.state = {
            style: {}
        };
    }
    componentWillMount() {
        this.setStyle();
    }
    componentDidMount() {
    }
    render() {
        let checkmark;
        if (this.state.checked) {
            checkmark = 'X';
        }
        return (React.createElement("div", { id: 'CheckboxInput', style: this.state.style, onClick: (e) => this.props.onChange(e) }, checkmark));
    }
}
exports.default = CheckboxInput;
//# sourceMappingURL=CheckboxInput.js.map