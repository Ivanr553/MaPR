import * as React from 'react';

const s = require('./ToolBarStyle.sass')

class ToolBar extends React.Component {
    render() {
        return (
            <div className='ToolBar'>
                <img className='tolkit-image' src="/images/toolkit.png" alt=""/>
            </div>
        );
    }
}

export default ToolBar;