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
        if(this.props.exit) {
            return this.exit()
        }

        this.show()
        let timer = setTimeout(
            () => {
                this.exit()
            },
            5000
        )

        this.startTimer(timer)
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
            setTimeout(() => {
                this.props.clearNotification()
            }, 400)
        })
    }

    startTimer = (timer) => {
        this.setState({
            timer: timer
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