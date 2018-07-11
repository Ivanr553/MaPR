import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { setTimeout } from 'timers';

const s = require('./styling/style.sass')


interface Props {
    width: number,
    height: number,
    left: number,
    top: number
}

export default class SignatureForm extends React.Component<Props, any> {

    constructor(props) {
        super(props)
        this.state = {
            style: {},
            signatureContent: 'Click to Sign'
        }
    }

    //Getting style from props
    setStyle = () => {

        let style = this.state.style

        style.width = this.props.width + 'px'
        style.height = this.props.height + 'px'
        style.top = this.props.top + 'px'
        style.left = this.props.left + 'px'

        this.setState({
            style: style
        })
    }


    //Takes signature png and embeds it into component
    sign = async () => {

        let signatureSource
        let signature = <img className='user-signature' src={signatureSource} alt=""/>

        this.setState({
            signatureContent: signature
        })
    }

    //React lifecycle methods
    componentWillMount() {
        this.setStyle()
    }

    componentDidMount() {

    }

    render() {

        return(
            <div id='SignatureForm' style={this.state.style} onClick={this.sign}>
                {this.state.signatureContent}
            </div>
        )
    }

}