import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { setTimeout } from 'timers';

const s = require('./styling/style.sass')


interface Props {
    id: string,
    width: number,
    height: number,
    left: number,
    top: number,
    view: 'PendingDocuments' | 'DocumentPreview',
    userList?: Array<any>,
    previewOnClickHandler?: any
}

export default class SignatureForm extends React.Component<Props, any> {

    constructor(props) {
        super(props)
        this.state = {
            style: {},
            signatureContent: 'Click to Sign',
            assignedSignatureContent: 'Click to Assign Signature'
        }
    }

    //Getting style from props
    getStyle = () => {

        let style = {
            width: `${this.props.width}px`,
            height: `${this.props.height}px`,
            top: `${this.props.top}px`,
            left: `${this.props.left}px`,
        }

        return style
    }


    //Takes signature png and embeds it into component
    sign = async () => {

        let signatureSource
        let signature = <img className='user-signature' src={signatureSource} alt=""/>

        this.setState({
            signatureContent: signature
        })
    }

    render() {

        if(this.props.view === 'DocumentPreview') {

            return (
                <div id={this.props.id} className='SignatureForm' style={this.getStyle()} onClick={(e) => this.props.previewOnClickHandler(e)}>
                    {this.state.assignedSignatureContent}
                </div> 
            )
        }
        if(this.props.view === 'PendingDocuments') {

            return(
                <div className='SignatureForm' style={this.getStyle()} onClick={this.sign}>
                    {this.state.signatureContent}
                </div>
            )
        }


    }

}