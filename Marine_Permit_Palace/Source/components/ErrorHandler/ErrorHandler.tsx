import * as React from 'React'
import { RouteComponentProps } from 'react-router'
import { setTimeout } from 'timers';


const s = require('./styling/style.sass')

interface Props extends RouteComponentProps<any> {}
export default class ErrorHandler extends React.Component<any, any> {

    constructor(props) {
        super(props)
        this.state = {
           error: false
        }
    }

    componentDidMount() {
    }

    componentDidCatch(error) {
        console.log('caught error:', error)
        this.setState({
            error: true
        })
    }


    render() {

        if(this.state.error) {
            return (
                <div id='ErrorHandler'>
                    Something Went Wrong!
                </div>
            )
        }

        return (
            <div id='ErrorHandler'>
               {this.props.children}
            </div>
        )
    }

}