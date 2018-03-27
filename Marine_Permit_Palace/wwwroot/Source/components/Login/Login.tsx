import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import {Link} from 'react-router-dom'
import $ from 'jquery'

const s = require('./styling/style.sass')


import Header from '../Header/Header'

interface Props extends RouteComponentProps<any> {}
export default class Login extends React.Component<Props, any> {

    constructor(props) {
        super(props)
        this.state = {
            user: {
                username: '',
                password: ''
            }
        }

        this.handleLogin = this.handleLogin.bind(this)
    }

    handleUsername(e) {

        let user = this.state.user

        user.username = e.target.value

        this.setState({
            user: user
        })
    }

    handlePassword(e) {

        let user = this.state.user

        user.password = e.target.value

        this.setState({
            user: user
        })
    }

    async handleLogin() {
    
        // let user = this.state.user

        // let response = await $.post('/loginUser', user)
        
        // if(response) {
            window.open('/A/App/Home', '_self')
        // } else {
        //     alert('Incorrect username or password')
        // }
        
    }

    componentDidMount() {
        // this.giveUserID()
        // this.test()
    }

    render() {
        return(
            <div className='Login'>

                <Header />

                <div className='login-content-container'>
                    <div className='login-title'>Login</div>
                    <div className='login-input-container'>
                        Username
                        <input type="text" className='login-input' onChange={(e) => {this.handleUsername(e)}}/>
                    </div>
                    <div className='login-input-container' id='login-password-container'>
                        Password
                        <input type="password" className='login-input' onChange={(e) => {this.handlePassword(e)}}/>
                    </div>
                    <div>
                        <button className='login-button' onClick={this.handleLogin}>Login</button>
                    </div>
                </div>
            </div>
        )
    }

}