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
            timerDone: false
        }, () => {
            this.setTimer()
        })
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
            <div className='ToolBar'>
                {/* <img className='tolkit-image' src="/images/toolkit.png" alt=""/> */}
                <div className='tools-container' onClick={this.handleOnClick}>
                    {/* <div className='toolbar-tool' onClick={this.props.handleApprove}>
                        <img className='toolbar-tool-image' src='/images/check.png' alt=""/>
                    </div> */}
                    <div style={this.getSubmitStyle()} className='toolbar-tool' onClick={this.props.handleSubmit}>
                        <img className='toolbar-tool-image' src='/images/submit.png' alt=""/>
                        {this.getToolbarInfoBox()}
                    </div>
                </div>
            </div>
        );
    }
}

export default ToolBar;