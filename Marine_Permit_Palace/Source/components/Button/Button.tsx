import * as React from 'react';

interface Props {
    innerText: string,
    onClickHandler: (e) => any,
    color?: string,
    secondaryColor?: string
}

import './style.sass'

class Button extends React.Component<Props, any> {

    constructor(props){
        super(props)
        this.state = {
            hover: false
        }
    }

    getStyle = () => {

        if(this.state.hover) {
            
            let style ={
                backgroundColor: this.props.color ? this.props.color : '$main-color',
                color: this.props.secondaryColor ? this.props.secondaryColor : 'black',
                borderColor: this.props.color ? this.props.color : '$main-color'
            }

            return style
        }

        if(!this.state.hover) {

            let style = {
                backgroundColor: 'rgba(0, 0, 0, 0)',
                color: this.props.color ? this.props.color : '$main-color',
                borderColor: this.props.color ? this.props.color : '$main-color'
            }

            return style
        }
    }

    handleMouseOver = () => {
        this.setState({
            hover: true
        })
    }

    handleMouseLeave = () => {
        this.setState({
            hover: false
        })
    }

    render() {
        return (
            <div className='app-button' style={this.getStyle()} onClick={e => this.props.onClickHandler(e)} onMouseOver={this.handleMouseOver} onMouseLeave={this.handleMouseLeave}>
                {this.props.innerText}
            </div>
        )
    }
}

export default Button