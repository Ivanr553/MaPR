"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const s = require('./ToolBarStyle.sass');
class ToolBar extends React.Component {
    tool() {
        return (React.createElement("div", { className: 'toolbar-tool' }));
    }
    render() {
        return (React.createElement("div", { className: 'ToolBar' },
            React.createElement("img", { className: 'tolkit-image', src: "/images/toolkit.png", alt: "" }),
            React.createElement("div", { className: 'tools-container' },
                React.createElement("div", { className: 'toolbar-tool' },
                    React.createElement("img", { className: 'toolbar-tool-image', src: '/images/check.png', alt: "" })))));
    }
}
exports.default = ToolBar;
//# sourceMappingURL=ToolBar.js.map