import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { setTimeout } from 'timers';

const s = require('./styling/style.sass')


interface Props {
    width: number,
    height: number,
    left: number,
    top: number,
    value: any,
    onChange: any
}

export default class TextInput extends React.Component<Props, any> {

    constructor(props) {
        super(props)
        this.state = {
            style: {}
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

    //React lifecycle methods
    componentWillMount() {
        this.setStyle()
    }

    componentDidMount() {
    }

    render() {

        return(
            <input id='TextInput' style={this.state.style} defaultValue={this.props.value} onChange={(e) => this.props.onChange(e)} />
        )
    }

}