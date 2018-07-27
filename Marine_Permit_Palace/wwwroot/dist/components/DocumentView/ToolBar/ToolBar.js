"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const s = require('./ToolBarStyle.sass');
class ToolBar extends React.Component {
    constructor(props) {
        super(props);
        this.handleOnClick = () => {
            this.setState({
                timerDone: false
            }, () => {
                this.setTimer();
            });
        };
        this.getToolbarInfoBox = () => {
            if (this.props.canSubmit) {
                if (this.state.timerDone) {
                    return (React.createElement("div", { className: 'toolbar-info-box toolbar-info-box-ready tool-bar-info-fade-away' },
                        "Document is ready to be submitted",
                        React.createElement("div", { className: 'toolbar-info-box-triangle toolbar-info-box-triangle-ready' })));
                }
                return (React.createElement("div", { className: 'toolbar-info-box toolbar-info-box-ready' },
                    "Document is ready to be submitted",
                    React.createElement("div", { className: 'toolbar-info-box-triangle toolbar-info-box-triangle-ready' })));
            }
            if (!this.props.canSubmit) {
                if (this.state.timerDone) {
                    return (React.createElement("div", { className: 'toolbar-info-box toolbar-info-box-not-ready tool-bar-info-fade-away' },
                        "Document is ready to be submitted",
                        React.createElement("div", { className: 'toolbar-info-box-triangle toolbar-info-box-triangle-not-ready' })));
                }
                return (React.createElement("div", { className: 'toolbar-info-box toolbar-info-box-not-ready' },
                    "Document is not ready to be submitted",
                    React.createElement("div", { className: 'toolbar-info-box-triangle toolbar-info-box-triangle-not-ready' })));
            }
        };
        this.getSubmitStyle = () => {
            if (this.props.canSubmit) {
                let style = {
                    cursor: 'pointer'
                };
                return style;
            }
            if (!this.props.canSubmit) {
                let style = {
                    cursor: 'default'
                };
                return style;
            }
        };
        this.setTimer = () => {
            let timeout = setTimeout(() => {
                this.setState({
                    timerDone: true
                });
            }, 2000);
            this.setState({
                timeout: timeout
            });
        };
        this.state = {
            timerDone: false
        };
    }
    componentDidMount() {
        this.setTimer();
    }
    componentWillUnmount() {
        if (!!this.state.timeout) {
            clearTimeout(this.state.timeout);
        }
    }
    render() {
        return (React.createElement("div", { className: 'ToolBar' },
            React.createElement("div", { className: 'tools-container', onClick: this.handleOnClick },
                React.createElement("div", { style: this.getSubmitStyle(), className: 'toolbar-tool', onClick: this.props.handleSubmit },
                    React.createElement("img", { className: 'toolbar-tool-image', src: '/images/submit.png', alt: "" }),
                    this.getToolbarInfoBox()))));
    }
}
exports.default = ToolBar;
//# sourceMappingURL=ToolBar.js.map