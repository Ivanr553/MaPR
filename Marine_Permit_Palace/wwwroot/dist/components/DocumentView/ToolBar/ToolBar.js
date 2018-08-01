"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const s = require('./ToolBarStyle.sass');
class ToolBar extends React.Component {
    constructor(props) {
        super(props);
        this.handleOnClick = () => {
            this.setState({
                open: !this.state.open
            });
        };
        this.getLeftArrowStyle = () => {
            if (this.state.open) {
                let style = {
                    animation: 'animate-toolbar-left-arrow-opening 0.2s forwards'
                };
                return style;
            }
            if (!this.state.open) {
                let style = {
                    animation: 'animate-toolbar-left-arrow-closing 0.2s forwards'
                };
                return style;
            }
        };
        this.getRightArrowStyle = () => {
            if (this.state.open) {
                let style = {
                    animation: 'animate-toolbar-right-arrow-opening 0.2s forwards'
                };
                return style;
            }
            if (!this.state.open) {
                let style = {
                    animation: 'animate-toolbar-right-arrow-closing 0.2s forwards'
                };
                return style;
            }
        };
        this.getSubmitStyle = () => {
            if (this.props.canSubmit) {
                let style = {
                    cursor: 'pointer',
                    backgroundColor: 'rgb(221, 244, 255)'
                };
                return style;
            }
            if (!this.props.canSubmit) {
                let style = {
                    cursor: 'default',
                    backgroundColor: 'rgb(255, 216, 216)'
                };
                return style;
            }
        };
        this.getToolbarStyle = () => {
            if (this.state.open) {
                let style = {
                    display: 'flex',
                    animation: 'toolbar-container-opening 0.7s forwards'
                };
                return style;
            }
            if (!this.state.open) {
                let style = {
                    display: 'flex',
                    animation: 'toolbar-container-closing 0.7s forwards'
                };
                return style;
            }
        };
        this.state = {
            timerDone: false
        };
    }
    componentDidMount() {
    }
    componentWillUnmount() {
        if (!!this.state.timeout) {
            clearTimeout(this.state.timeout);
        }
    }
    render() {
        return (React.createElement("div", { className: 'ToolBar', onClick: this.handleOnClick },
            React.createElement("img", { style: this.getLeftArrowStyle(), className: 'toolkit-arrow toolkit-arrow-left', src: "/images/left-arrow-1.png", alt: "" }),
            React.createElement("img", { style: this.getRightArrowStyle(), className: 'toolkit-arrow toolkit-arrow-right', src: "/images/left-arrow-1.png", alt: "" }),
            React.createElement("div", { className: 'tools-container', style: this.getToolbarStyle() },
                React.createElement("div", { style: this.getSubmitStyle(), className: 'toolbar-tool', onClick: this.props.handleSubmit },
                    React.createElement("img", { className: 'toolbar-tool-image', src: '/images/submit.png', alt: "" })))));
    }
}
exports.default = ToolBar;
//# sourceMappingURL=ToolBar.js.map