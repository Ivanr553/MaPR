import * as React from 'react'

const s = require('./styling/style.sass')

export default class Footer extends React.Component<any, any> {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return(
            <div id='Footer'>
                Marin Permit Repository 2018
            </div>
        )
    }

}