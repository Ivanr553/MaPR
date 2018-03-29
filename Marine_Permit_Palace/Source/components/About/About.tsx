import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { Link } from 'react-router-dom'

const s = require('./styling/style.sass')

interface Props extends RouteComponentProps<any> {}
export default class About extends React.Component<any, any> {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    render() {
        return(
            <div className='About'>
                This is About
            </div>
        )
    }

}