import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { setTimeout } from 'timers';

const s = require('./styling/style.sass')

interface Props extends RouteComponentProps<any> {}
export default class SignatureForm extends React.Component<any, any> {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentDidMount() {
    }

    render() {

        return(
            <div id='SignatureForm'>
 
            </div>
        )
    }

}