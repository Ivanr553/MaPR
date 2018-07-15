"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
class CreateDocumentNavButton extends React.Component {
    constructor(props) {
        super(props);
        this.getCheckmark = () => {
            let style;
            if (this.props.complete) {
                style = {
                    width: '3vh',
                    height: 'auto',
                    marginLeft: '2vw'
                };
                let checkmark = (React.createElement("img", { style: style, src: "../../images/check.png", alt: "" }));
                return checkmark;
            }
            else {
                style = {
                    width: '2vh',
                    height: 'auto',
                    marginLeft: '2vw',
                    padding: '0.5vh 0 0.5vh 0'
                };
                return React.createElement("img", { style: style, src: "../../images/circle.png", alt: "" });
            }
        };
        this.getStyle = () => {
            let style;
            if (this.props.disable) {
                style = {
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    cursor: 'default',
                    color: 'lightgrey'
                };
                return style;
            }
            if (this.props.complete) {
                style = {
                    backgroundColor: (this.props.selected ? 'rgba(131, 198, 134, 0.3)' : 'rgba(131, 198, 134, 0.1)'),
                };
                return style;
            }
            if (!this.props.complete) {
                style = {
                    backgroundColor: (this.props.selected ? 'rgb(50, 50, 50)' : '')
                };
                return style;
            }
        };
        this.manageOnClickHandler = () => {
            if (this.props.disable) {
                return;
            }
            return this.props.onClickHandler;
        };
        this.state = {};
    }
    componentDidMount() {
    }
    render() {
        return (React.createElement("div", { id: this.props.id, className: 'create-document-nav-bar-item', style: this.getStyle(), onClick: this.manageOnClickHandler() },
            this.props.innerText,
            this.getCheckmark()));
    }
}
exports.default = CreateDocumentNavButton;
//# sourceMappingURL=CreateDocumentNavButton.js.map