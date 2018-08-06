import * as React from 'react';

import './NotificationCardStyle.sass'

interface Props {
    message: string
    show?: boolean,
    exit?: boolean,
    clearNotification?: () => void
}

class NotificationCard extends React.Component<Props, any> {

    constructor(props) {
        super(props)
        this.state = {
            show: false,
            className: ' show-notification-card',
            timer: null
        }
    }

    handleCardTime = () => {
        this.show()

        let timer = setTimeout(
            () => {
                this.exit()
            },
            3000
        )
        this.setState({
            timer: timer
        })
    }

    show = () => {
        this.setState({
            show: true
        }, () => {
            this.getStyle()
        })
    }

    exit = () => {
        this.setState({
            show: false
        }, () => {
            this.getStyle()
        })
    }


    getStyle = (): React.CSSProperties => {

        if(this.props.exit) {

            return {
                animation: 'hide-notification-card 0.5s forwards'
            }
        }

        if(this.state.show) {

           return {
                animation: 'show-notification-card 0.5s forwards'
           }
        }

        if(!this.state.show) {

            return {
                animation: 'hide-notification-card 0.4s forwards'
            }
        }


    }

    componentWillUnmount() {
        if(!!this.state.timer) {
            clearInterval(this.state.timer)
        }
    }

    componentDidMount() {
        this.handleCardTime()
    }
    
    render() {
        return (
            <div className='NotificationCard' style={this.getStyle()}>
                <div className='notification-card-exit' onClick={this.exit}>X</div>
                {this.props.message}
            </div>
        );
    }
}

export default NotificationCard;