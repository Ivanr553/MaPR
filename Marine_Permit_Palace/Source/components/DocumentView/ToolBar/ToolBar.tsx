import * as React from 'react';

const s = require('./ToolBarStyle.sass')

class ToolBar extends React.Component {

    tool() {

        return (
            <div className='toolbar-tool'>

            </div>
        )

    }

    render() {
        return (
            <div className='ToolBar'>
                <img className='tolkit-image' src="/images/toolkit.png" alt=""/>
                <div className='tools-container'>
                <div className='toolbar-tool' >
                    <img className='toolbar-tool-image' src='/images/check.png' alt=""/>
                </div>
                </div>
            </div>
        );
    }
}

export default ToolBar;