import * as React from 'react';

const s = require('./ToolBarStyle.sass')

interface Props {
    handleSubmit: () => void,
    handleApprove: () => void,
    canSubmit: boolean
}

class ToolBar extends React.Component<Props, any> {

    constructor(props) {
        super(props)
        this.state = {
            timerDone: false
        }
    }

    handleOnClick = () => {
        this.setState({
            open: !this.state.open
        })
    }

    getLeftArrowStyle = (): React.CSSProperties => {

        if(this.state.open) {

            let style: React.CSSProperties = {
                animation: 'animate-toolbar-left-arrow-opening 0.2s forwards'
            }
    
            return style
        }

        if(!this.state.open) {

            let style: React.CSSProperties = {
                animation: 'animate-toolbar-left-arrow-closing 0.2s forwards'
            }

            return style
        }

    }

    getRightArrowStyle = (): React.CSSProperties => {

        if(this.state.open) {

            let style: React.CSSProperties = {
                animation: 'animate-toolbar-right-arrow-opening 0.2s forwards'
            }
    
            return style
        }

        if(!this.state.open) {

            let style: React.CSSProperties = {
                animation: 'animate-toolbar-right-arrow-closing 0.2s forwards'
            }

            return style
        }

    }

    getSubmitStyle = (): React.CSSProperties => {

        if(this.props.canSubmit) {
            let style: React.CSSProperties = {
                cursor: 'pointer',
                backgroundColor: 'rgb(221, 244, 255)'
            }
            return style
        }

        if(!this.props.canSubmit) {
            let style: React.CSSProperties = {
                cursor: 'default',
                backgroundColor: 'rgb(255, 216, 216)'
            }
            return style
        }

    }

    getToolbarStyle = (): React.CSSProperties => {

        if(this.state.open) {
            let style: React.CSSProperties = {
                display: 'flex',
                animation: 'toolbar-container-opening 0.7s forwards'
            }
            return style
        }
        if(!this.state.open) {
            let style: React.CSSProperties = {
                display: 'flex',
                animation: 'toolbar-container-closing 0.7s forwards'
            }
            return style
        }

    }

    componentDidMount() {
    }

    componentWillUnmount() {
        if(!!this.state.timeout) {
            clearTimeout(this.state.timeout)
        }
    }

    render() {
        return (
            <div className='ToolBar' onClick={this.handleOnClick}>
                <img style={this.getLeftArrowStyle()} className='toolkit-arrow toolkit-arrow-left' src="/images/left-arrow-1.png" alt=""/>
                <img style={this.getRightArrowStyle()} className='toolkit-arrow toolkit-arrow-right' src="/images/left-arrow-1.png" alt=""/>
                <div className='tools-container' style={this.getToolbarStyle()}>
                    {/* <div className='toolbar-tool toolbar-delete' onClick={this.props.handleApprove}>
                        X
                    </div> */}
                    <div style={this.getSubmitStyle()} className='toolbar-tool' onClick={this.props.handleSubmit}>
                        <img className='toolbar-tool-image' src='/images/submit.png' alt=""/>
                    </div>
                </div>
            </div>
        );
    }
}

export default ToolBar;