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
    checked: boolean,
    onChange: any,
    view: 'PendingDocuments' | 'DocumentPreview',
    userList?: Array<any>,
    previewOnClickHandler?: any
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

    componentDidMount() {
        this.setStyle()

    }

    render() {

        let checkmark

        if(this.state.checked) {
            checkmark = 'X'
        }

        if(this.props.view === 'DocumentPreview') {
            
            return(
                <div id={this.props.id} className='CheckboxInput' style={this.state.style} onClick={(e) => this.props.previewOnClickHandler(e)}>
                </div>
            )
        }

        if(this.props.view === 'PendingDocuments') {

            return(
                <div id={this.props.id} className='CheckboxInput' style={this.state.style} onClick={(e) => this.props.onChange(e)}>
                    {checkmark}
                </div>
            )
        }
    }

}