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
        if (this.props.view === 'DocumentPreview') {
            return (React.createElement("textarea", { readOnly: true, id: this.props.id, className: 'TextInput preview-TextInput', style: this.state.style, defaultValue: this.props.value, onClick: this.props.previewOnClickHandler }));
        }
        if (this.props.view === 'PendingDocuments' || this.props.view === 'AccountPage') {
            return (React.createElement("textarea", { id: this.props.id, className: 'TextInput', style: this.state.style, defaultValue: this.props.value, onChange: this.props.onChange }));
        }
    }
}
exports.default = TextInput;
//# sourceMappingURL=TextInput.js.map