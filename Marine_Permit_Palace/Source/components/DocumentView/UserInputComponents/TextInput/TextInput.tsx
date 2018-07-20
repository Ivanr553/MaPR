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

    //NEEDS TO BE FIXED

    //Getting style from props
    getStyle = () => {

        let style = {
            position: this.props.position as any,
            border: this.props.border,
            width: `${this.props.width}px`,
            height: `${this.props.height}px`,
            top: `${this.props.top}px`,
            left: `${this.props.left}px`,
        }

        return style
    }

    render() {

        if(this.props.view === 'DocumentPreview') {
            
            return(
                <textarea readOnly id={this.props.id} className='TextInput preview-TextInput' style={this.getStyle()} defaultValue={this.props.value} onClick={this.props.previewOnClickHandler} />
            )
        }

        if(this.props.view === 'PendingDocuments' || this.props.view === 'AccountPage') {

            return(
                <textarea id={this.props.id} className='TextInput' style={this.getStyle()} defaultValue={this.props.value} onChange={this.props.onChange} />
            )
        }
    }

}