import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { setTimeout } from 'timers';

const s = require('./styling/style.sass')

interface Props extends RouteComponentProps<any> {}
export default class SignatureView extends React.Component<any, any> {

    constructor(props) {
        super(props)
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
        }
    }

    enablePen = () => {
        this.setState({
            enablePen: !this.state.enablePen
        }, () => {
            if(this.state.enablePen) {
                this.setState({
                    enablePenStyle: 'pen-enabled',
                    enablePenText: 'Finish Editing'
                })
            } else {
                this.setState({
                    enablePenStyle: 'pen-disabled',
                    enablePenText: 'Edit Signature',
                    editingCanvas: false
                }, () => {
                    if(this.state.canvasEdited) {
                        this.printCanvas()
                    }
                })
            }
        })
    }

    canvasPen = (e) => {

        if(!this.state.enablePen) {
            return
        }

        this.setState({
            canvasEdited: true
        })

        let canvas: HTMLCanvasElement = document.getElementById('signature-canvas') as HTMLCanvasElement
        let context = canvas.getContext('2d')

        let bounds = canvas.getBoundingClientRect()

        let prevX = this.state.prevX || e.screenX - bounds.left
        let prevY = this.state.prevX || e.screenY - bounds.top

        let x = e.screenX - bounds.left
        let y = e.screenY - bounds.bottom + (canvas.height/2)


        context.fillStyle = 'rgb(0, 0, 0)';

        context.beginPath()
        context.moveTo(this.state.prevX, this.state.prevY)
        context.lineTo(x, y);
        context.stroke()
        context.closePath()

        this.setState({
            prevX: x,
            prevY: y
        })
    }

    printCanvas = () => {

        this.startSave()

        let canvas: HTMLCanvasElement = document.getElementById('signature-canvas') as HTMLCanvasElement
        let source = canvas.toDataURL('image/png')

        let testImage = new Image()
        testImage.src = source

        document.body.appendChild(testImage)

        this.setState({
            canvasEdited: false
        }, () => {
            setTimeout(() => {
                this.completeSave()
            }, 1000)
        })
    }

    setCanvasDimensions = () => {
        this.setState({
            canvasWidth:  window.innerWidth * 0.6,
            canvasHeight: window.innerHeight * 0.2
        })
    }

    clearCanvas = () => {
        let canvas: HTMLCanvasElement = document.getElementById('signature-canvas') as HTMLCanvasElement
        let context = canvas.getContext('2d')
        context.clearRect(0, 0, canvas.width, canvas.height);
    }

    clearPrevMousePos = () => {
        this.setState({
            prevX: undefined,
            prevY: undefined
        })
    }

    startSave = () => {
        this.setState({
            savingIconId: 'saving-icon'
        })
    }

    completeSave = () => {
        this.setState({
            savingIconSource: '/images/check-green.png',
            savingIconId: 'saving-icon-complete'
        }, () => {
            setTimeout(() => {
                this.setState({
                    savingIconId: ''
                })
            }, 1000)
        })
    }

    componentWillMount() {
        
    }

    componentDidMount() {
        this.setCanvasDimensions()
        window.addEventListener('resize', this.setCanvasDimensions)
    }

    render() {

        return(
            <div id='Signature'>
                <div className='documents-header'>Your Signature</div>
                <div className='info-container'>
                    This is your signature that is used throughout the application. You may edit the signature here and save it for use in auto-signing documents.
                </div>
                    <div id='signature-edit-button' className={this.state.enablePenStyle} onClick={this.enablePen}>{this.state.enablePenText}</div>
                <div id='signature-main-container'>
                    <img className='canvas-icon' id='redo-icon' src="/images/cached.png" alt="" onClick={this.clearCanvas}/>
                    <img className='canvas-icon' id={this.state.savingIconId} src={this.state.savingIconSource} alt="" onClick={this.completeSave}/>
                    <canvas id='signature-canvas' width={this.state.canvasWidth} height={this.state.canvasHeight} onMouseMoveCapture={(e) => this.canvasPen(e)} onMouseLeave={this.clearPrevMousePos}>
                    </canvas>
                </div>
            </div>
        )
    }

}