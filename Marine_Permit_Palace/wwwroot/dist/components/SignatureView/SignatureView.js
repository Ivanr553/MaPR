"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const s = require('./styling/style.sass');
class SignatureView extends React.Component {
    constructor(props) {
        super(props);
        this.enablePen = () => {
            this.setState({
                enablePen: !this.state.enablePen
            }, () => {
                if (this.state.enablePen) {
                    this.setState({
                        enablePenStyle: 'pen-enabled',
                        enablePenText: 'Finish Editing'
                    });
                }
                else {
                    this.setState({
                        enablePenStyle: 'pen-disabled',
                        enablePenText: 'Edit Signature',
                        editingCanvas: false
                    }, () => {
                        if (this.state.canvasEdited) {
                            this.printCanvas();
                        }
                    });
                }
            });
        };
        this.canvasPen = (e) => {
            if (!this.state.enablePen) {
                return;
            }
            this.setState({
                canvasEdited: true
            });
            let canvas = document.getElementById('signature-canvas');
            let context = canvas.getContext('2d');
            let bounds = canvas.getBoundingClientRect();
            let prevX = this.state.prevX || e.pageX - bounds.left;
            let prevY = this.state.prevX || e.pageY - bounds.top;
            let x = e.pageX - bounds.left;
            let y = e.pageY - bounds.bottom + (canvas.height);
            context.fillStyle = 'rgb(0, 0, 0)';
            context.beginPath();
            context.moveTo(this.state.prevX, this.state.prevY);
            context.lineTo(x, y);
            context.stroke();
            context.closePath();
            this.setState({
                prevX: x,
                prevY: y
            });
        };
        this.printCanvas = () => __awaiter(this, void 0, void 0, function* () {
            this.startSave();
            let canvas = document.getElementById('signature-canvas');
            let source = canvas.toDataURL();
            let testImage = new Image();
            testImage.src = source;
            let body = {
                signature_base64: source
            };
            let request = yield fetch('/Account/AssignSignature', {
                method: 'POST',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                    'Content-Transfer-Encoding': 'base64'
                },
                body: JSON.stringify(body)
            });
            let response = yield request.json();
            console.log(response);
            this.setState({
                canvasEdited: false
            }, () => {
                let completeSaveTimeout = (setTimeout(() => {
                    this.completeSave();
                }, 1000));
                this.setState({
                    completeSaveTimeout: completeSaveTimeout
                });
            });
        });
        this.setCanvasDimensions = () => {
            this.setState({
                canvasWidth: window.innerWidth * 0.6,
                canvasHeight: window.innerHeight * 0.2
            });
        };
        this.clearCanvas = () => {
            let canvas = document.getElementById('signature-canvas');
            let context = canvas.getContext('2d');
            context.clearRect(0, 0, canvas.width, canvas.height);
        };
        this.clearPrevMousePos = () => {
            this.setState({
                prevX: undefined,
                prevY: undefined
            });
        };
        this.startSave = () => {
            this.setState({
                savingIconId: 'saving-icon'
            });
        };
        this.completeSave = () => {
            this.setState({
                savingIconSource: '/images/check-green.png',
                savingIconId: 'saving-icon-complete'
            }, () => {
                let clearSavingIcon = (setTimeout(() => {
                    this.setState({
                        savingIconId: ''
                    });
                }, 1000));
                this.setState({
                    clearSavingIcon: clearSavingIcon
                });
            });
        };
        this.state = {
            savingIconSource: '/images/clock.png',
            savingIconId: '',
            canvasWidth: '',
            canvasHeight: '',
            enablePen: false,
            enablePenStyle: 'pen-disabled',
            enablePenText: 'Edit Signature',
            editingCanvas: false,
            canvasEdited: true
        };
    }
    componentDidMount() {
        this.setCanvasDimensions();
        window.addEventListener('resize', this.setCanvasDimensions);
    }
    componentWillUnmount() {
        clearTimeout(this.state.completeSaveTimeout);
        clearTimeout(this.state.clearSavingIcon);
    }
    render() {
        return (React.createElement("div", { id: 'Signature' },
            React.createElement("div", { className: 'documents-header' }, "Your Signature"),
            React.createElement("div", { className: 'info-container' }, "This is your signature that is used throughout the application. You may edit the signature here and save it for use in auto-signing documents."),
            React.createElement("div", { id: 'signature-edit-button', className: this.state.enablePenStyle, onClick: this.enablePen }, this.state.enablePenText),
            React.createElement("div", { id: 'signature-main-container' },
                React.createElement("img", { className: 'canvas-icon', id: 'redo-icon', src: "/images/cached.png", alt: "", onClick: this.clearCanvas }),
                React.createElement("img", { className: 'canvas-icon', id: this.state.savingIconId, src: this.state.savingIconSource, alt: "", onClick: this.completeSave }),
                React.createElement("canvas", { id: 'signature-canvas', width: this.state.canvasWidth, height: this.state.canvasHeight, onMouseMoveCapture: (e) => this.canvasPen(e), onMouseLeave: this.clearPrevMousePos }))));
    }
}
exports.default = SignatureView;
//# sourceMappingURL=SignatureView.js.map