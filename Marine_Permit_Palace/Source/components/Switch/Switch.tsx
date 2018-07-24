import * as React from 'react';

import {user} from '../CreateDocument/CreateDocumentValidation'

const s = require('./style.sass')

interface Props {
    offInnerText: string,
    onInnerText: string,
    handleSwitchToggle: (field: string | user) => void,
    field: string,
    initialToggle: boolean,
    user?: user
}

class Switch extends React.Component<Props, any> {

    constructor(props) {
        super(props)
        this.state = {
            toggle: false
        }
    }

    getLeftStyle = () => {

        if(this.props.initialToggle) {

            let style = {
                animation: 'animateSelectedLeft 0.2s forwards'
            }

            return style

        }

        if(!this.props.initialToggle) {

            let style = {
                animation: 'animateDeselectedLeft 0.2s forwards'
            }

            return style

        }

    }

    getRightStyle = () => {

        if(this.props.initialToggle) {

            let style = {
                animation: 'animateSelectedRight 0.2s forwards'
            }

            return style

        }

        if(!this.props.initialToggle) {

            let style = {
                animation: 'animateDeselectedRight 0.2s forwards'
            }

            return style

        }

    }

    handleClick = () => {
        this.setState({
            toggle: !this.state.toggle
        }, () => {
            this.props.handleSwitchToggle(this.props.field ? this.props.field : this.props.user)
        })
    }

    render() {

        return (
            <div className='Switch' onClick={this.handleClick}>
                <div className='switch-item switch-item-left' style={this.getLeftStyle()} >{this.props.offInnerText}</div>
                <div className='switch-item switch-item-right' style={this.getRightStyle()} >{this.props.onInnerText}</div>
            </div>
        );
    }
}

export default Switch;