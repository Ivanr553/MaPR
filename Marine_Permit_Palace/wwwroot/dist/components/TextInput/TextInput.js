"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const s = require('./styling/style.sass');
class TextInput extends React.Component {
    constructor(props) {
        super(props);
        //Getting style from props
        this.setStyle = () => {
            let style = this.state.style;
            style.position = this.props.position;
            style.border = this.props.border;
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
    //React lifecycle methods
    componentWillMount() {
        this.setStyle();
    }
    componentDidMount() {
    }
    render() {
        return (React.createElement("textarea", { id: 'TextInput', style: this.state.style, defaultValue: this.props.value, onChange: this.props.onChange }));
    }
}
exports.default = TextInput;
//# sourceMappingURL=TextInput.js.map