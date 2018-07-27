import * as React from 'react'
import { RouteComponentProps } from 'react-router'

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

        let prevX = this.state.prevX || e.pageX - bounds.left
        let prevY = this.state.prevX || e.pageY - bounds.top

        let x = e.pageX - bounds.left
        let y = e.pageY - bounds.bottom + (canvas.height)


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

    printCanvas = async () => {

        this.startSave()

        let canvas: HTMLCanvasElement = document.getElementById('signature-canvas') as HTMLCanvasElement
        let source = canvas.toDataURL()

        let testImage = new Image()
        testImage.src = source

        let body = {
            signature_base64: source
        }

        console.log(body)

        let request = await fetch('/Account/AssignSignature', {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json; charset=UTF-8',
                'Content-Transfer-Encoding': 'base64'
            },
            body: JSON.stringify(body)
        })
        let response = await request.json()
        console.log(response)

        this.setState({
            canvasEdited: false
        }, () => {

            let completeSaveTimeout = (
                setTimeout(() => {
                    this.completeSave()
                }, 1000)
            )

            this.setState({
                completeSaveTimeout: completeSaveTimeout
            })

        })
    }

    getSignature = async () => {

        let request = await fetch('/Account/GetSignature', {credentials: 'same-origin'})
        let response = await request.json()
        let data = response.signature_base64

        let canvas: HTMLCanvasElement = document.getElementById('signature-canvas') as HTMLCanvasElement
        let context = canvas.getContext('2d')

        let testImage = new Image()
        testImage.onload = function() {
            context.drawImage(testImage, 0, 0)
        }

        testImage.src = `data:image/png;base64,${data}`

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

            let clearSavingIcon = (
                setTimeout(() => {
                    this.setState({
                        savingIconId: ''
                    })
                }, 1000)
            )

            this.setState({
                clearSavingIcon: clearSavingIcon
            })

        })
    }

    componentDidMount() {
        this.setCanvasDimensions()
        this.getSignature()
        window.addEventListener('resize', this.setCanvasDimensions)
    }

    componentWillUnmount() {
        clearTimeout(this.state.completeSaveTimeout)
        clearTimeout(this.state.clearSavingIcon)
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
                    <img className='canvas-clear-icon' id='redo-icon' src="/images/cached.png" alt="" onClick={this.clearCanvas}/>
                    <img className='canvas-icon' id={this.state.savingIconId} src={this.state.savingIconSource} alt="" onClick={this.completeSave}/>
                    <canvas id='signature-canvas' width={this.state.canvasWidth} height={this.state.canvasHeight} onMouseMoveCapture={(e) => this.canvasPen(e)} onMouseLeave={this.clearPrevMousePos}>
                    </canvas>
                </div>
            </div>
        )
    }

}