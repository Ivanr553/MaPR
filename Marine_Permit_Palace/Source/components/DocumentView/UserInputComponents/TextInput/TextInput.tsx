import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { setTimeout } from 'timers';

const s = require('./styling/style.sass')


interface Props {
    id: string,
    position: string,
    border: string,
    width: any,
    height: any,
    left: number,
    top: number,
    value: any,
    onChange: any,
    view: 'PendingDocuments' | 'DocumentPreview' | 'AccountPage',
    userList?: Array<any>,
    previewOnClickHandler?: any
}

export default class TextInput extends React.Component<Props, any> {

    constructor(props) {
        super(props)
        this.state = {
            style: {
                
            }
        }
    }

    //Getting style from props
    setStyle = () => {

        let style = this.state.style

        style.position = this.props.position
        style.border = this.props.border
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

        if(this.props.view === 'DocumentPreview') {
            
            return(
                <textarea readOnly id={this.props.id} className='TextInput preview-TextInput' style={this.state.style} defaultValue={this.props.value} onClick={this.props.previewOnClickHandler} />
            )
        }

        if(this.props.view === 'PendingDocuments' || this.props.view === 'AccountPage') {

            return(
                <textarea id={this.props.id} className='TextInput TextInputRemoveOutline' style={this.state.style} defaultValue={this.props.value} onChange={this.props.onChange} />
            )
        }
    }

}