import * as React from 'react'

import './styling/style.sass'

export default class Footer extends React.Component<any, any> {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return(
            <div id='Footer'>
                Marine Permit Repository 2018
            </div>
        )
    }

}