import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { setTimeout } from 'timers';

const s = require('./styling/style.sass')


interface Props {
    width: number,
    height: number,
    left: number,
    top: number,
    checked: boolean,
    onChange: any
}

export default class CheckboxInput extends React.Component<Props, any> {

    constructor(props) {
        super(props)
        this.state = {
            style: {}
        }
    }

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

    componentWillMount() {
        this.setStyle()
    }

    componentDidMount() {
    }

    render() {

        let checkmark

        if(this.state.checked) {
            checkmark = 'X'
        }

        return(
            <div id='CheckboxInput' style={this.state.style} onClick={(e) => this.props.onChange(e)}>
                {checkmark}
            </div>
        )
    }

}