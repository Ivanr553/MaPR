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
    previewOnClickHandler?: any,
    is_disabled?: boolean
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
    getStyle = (): React.CSSProperties => {

        let style: React.CSSProperties = {
            position: this.props.position as any,
            border: this.props.border,
            width: `${this.props.width}px`,
            height: `${this.props.height}px`,
            top: `${this.props.top}px`,
            left: `${this.props.left}px`,
        }

        return style
    }

    getDisabledStyle = (): React.CSSProperties => {
        
        let style: React.CSSProperties = {
            position: this.props.position as any,
            border: this.props.border,
            width: `${this.props.width}px`,
            height: `${this.props.height}px`,
            top: `${this.props.top}px`,
            left: `${this.props.left}px`,
            backgroundColor: 'rgba(0, 0, 0, 0.1)',
            cursor: 'default'
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

            if(this.props.is_disabled) {
            
                return (
                    <textarea readOnly id={this.props.id} className='TextInput' style={this.getDisabledStyle()} defaultValue={this.props.value}/>
                )

            }

            return(
                <textarea id={this.props.id} className='TextInput' style={this.getStyle()} defaultValue={this.props.value} onChange={this.props.onChange} />
            )
        }
    }

}