import * as React from 'react';

const s = require('./ToolBarStyle.sass')

interface Props {
    handleSubmit: () => void,
    handleApprove: () => void,
    canSubmit: () => boolean
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
            timerDone: false,
            open: !this.state.open
        }, () => {
            this.setTimer()
        })
    }

    getLeftArrowStyle = (): React.CSSProperties => {

        if(this.state.open) {

            let style = {
                animation: 'animate-toolbar-left-arrow-opening 0.2s forwards'
            }
    
            return style
        }

        if(!this.state.open) {

            let style = {
                animation: 'animate-toolbar-left-arrow-closing 0.2s forwards'
            }

            return style
        }

    }

    getRightArrowStyle = (): React.CSSProperties => {

        if(this.state.open) {

            let style = {
                animation: 'animate-toolbar-right-arrow-opening 0.2s forwards'
            }
    
            return style
        }

        if(!this.state.open) {

            let style = {
                animation: 'animate-toolbar-right-arrow-closing 0.2s forwards'
            }

            return style
        }

    }


    getToolbarInfoBox = () => {

        if(this.props.canSubmit()) {

            if(this.state.timerDone) {
                return (
                    <div className='toolbar-info-box toolbar-info-box-ready tool-bar-info-fade-away'>
                        Document is ready to be submitted
                        <div className='toolbar-info-box-triangle toolbar-info-box-triangle-ready'></div>
                    </div>
                )
            }

            return (
                <div className='toolbar-info-box toolbar-info-box-ready'>
                    Document is ready to be submitted
                    <div className='toolbar-info-box-triangle toolbar-info-box-triangle-ready'></div>
                </div>
            )

        }
        if(!this.props.canSubmit()) {

            if(this.state.timerDone) {
                return (
                    <div className='toolbar-info-box toolbar-info-box-not-ready tool-bar-info-fade-away'>
                        Document is ready to be submitted
                        <div className='toolbar-info-box-triangle toolbar-info-box-triangle-not-ready'></div>
                    </div>
                )
            }

            return (
                <div className='toolbar-info-box toolbar-info-box-not-ready'>
                    Document is not ready to be submitted
                    <div className='toolbar-info-box-triangle toolbar-info-box-triangle-not-ready'></div>
                </div>
            )
        }
    }

    getSubmitStyle = () => {

        if(this.props.canSubmit()) {
            let style = {
                cursor: 'pointer',
                backgroundColor: 'white'
            }
            return style
        }

        if(!this.props.canSubmit()) {
            let style = {
                cursor: 'default',
                backgroundColor: 'lightgrey'
            }
            return style
        }

    }

    setTimer = () => {
        let timeout = setTimeout(() => {
            this.setState({
                timerDone: true
            })
        }, 2000);

        this.setState({
            timeout: timeout
        })
    }

    componentDidMount() {
        this.setTimer()
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
                {/* <div className='tools-container'>
                    <div className='toolbar-tool toolbar-delete' onClick={this.props.handleApprove}>
                        X
                    </div>
                    <div style={this.getSubmitStyle()} className='toolbar-tool' onClick={this.props.handleSubmit}>
                        <img className='toolbar-tool-image' src='/images/submit.png' alt=""/>
                        {this.getToolbarInfoBox()}
                    </div>
                </div> */}
            </div>
        );
    }
}

export default ToolBar;