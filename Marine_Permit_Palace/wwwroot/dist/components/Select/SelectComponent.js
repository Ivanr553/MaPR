"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
require("./SelectComponentStyle.sass");
require("./SelectComponentStyle.sass");
class SelectComponent extends React.Component {
    constructor(props) {
        super(props);
        this.handleSelectChange = (e) => {
            this.setState({
                value: e.target.value
            });
        };
        this.propsOnChange = (e) => {
            this.props.onChange(e);
            this.setState({
                value: e.target.value
            });
        };
        this.generateOptions = () => {
            let inputOptions = this.props.inputOptions;
            let optionElements = [];
            inputOptions.forEach(option => {
                let newOptionElement = (React.createElement("option", { key: Math.random(), className: 'select-component-option', value: option }, option));
                optionElements.push(newOptionElement);
            });
            return optionElements;
        };
        this.state = {
            value: ''
        };
    }
    render() {
        if (this.props.onChange) {
            return (React.createElement("div", null,
                React.createElement("select", { className: 'SelectComponent', value: this.state.value, onChange: (e) => this.propsOnChange(e) }, this.generateOptions())));
        }
        return (React.createElement("div", null,
            React.createElement("select", { className: 'SelectComponent', defaultValue: this.state.value, onChange: (e) => this.handleSelectChange(e) }, this.generateOptions())));
    }
}
exports.default = SelectComponent;
//# sourceMappingURL=SelectComponent.js.map