import * as React from 'react'

import './styling/style.sass'


interface Props {
    id: string,
    width: number,
    height: number,
    left: number,
    top: number,
    checked: 'On' | 'Off',
    onChange: any,
    view: 'PendingDocuments' | 'DocumentPreview',
    userList?: Array<any>,
    previewOnClickHandler?: any,
    is_disabled: boolean
}

export default class CheckboxInput extends React.Component<Props, any> {

    constructor(props) {
        super(props)
        this.state = {
            style: {}
        }
    }

    getStyle = (): React.CSSProperties => {

        if(this.props.is_disabled) {

            let style: React.CSSProperties = {
                width: `${this.props.width - 1}px`,
                height: `${this.props.height - 1}px`,
                top: `${this.props.top + 1}px`,
                left: `${this.props.left + 1}px`,
                cursor: 'default',
                backgroundColor: 'rgba(0, 0, 0, 0.1)'
            }
    
            return style

        } else {

            let style: React.CSSProperties = {
                width: `${this.props.width}px`,
                height: `${this.props.height}px`,
                top: `${this.props.top}px`,
                left: `${this.props.left}px`,
                cursor: 'pointer'
            }
    
            return style

        }
    }

    render() {

        let checkmark

        if(this.props.checked === 'On') {
            checkmark = 'X'
        }

        if(this.props.view === 'DocumentPreview') {
            
            return(
                <div id={this.props.id} className='CheckboxInput' style={this.getStyle()} onClick={(e) => this.props.previewOnClickHandler(e)}>
                </div>
            )
        }

        if(this.props.view === 'PendingDocuments') {

            if(this.props.is_disabled) {
                <div id={this.props.id} className='CheckboxInput' style={this.getStyle()}>
                    {checkmark}
                </div>
            }

            return(
                <div id={this.props.id} className='CheckboxInput' style={this.getStyle()} onClick={(e) => this.props.onChange(e)}>
                    {checkmark}
                </div>
            )
        }
    }

}