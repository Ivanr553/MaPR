import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import {Link} from 'react-router-dom'
import * as $ from 'jquery'

const s = require('./styling/style.sass')


import Header from '../Header/Header'
import Footer from '../Footer/Footer'

interface Props extends RouteComponentProps<any> {}
export default class Login extends React.Component<Props, any> {

    constructor(props) {
        super(props)
        this.state = {
            user: {
                dod_id: '',
                password: '',
                remember_me: true
            }
        }
    }

    handleUsername = (e) => {

        let user = this.state.user

        user.dod_id = e.target.value

        this.setState({
            user: user
        })
    }

    handlePassword = (e) => {

        let user = this.state.user

        user.password = e.target.value

        this.setState({
            user: user
        })
    }

    handleSubmit = (e) => {
        if(e.key === 'Enter') {
            this.handleLogin()
        }
    }

    handleLogin = async () => {

        try {

            let user = this.state.user

            let loginAttempt = await $.ajax({
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                },
                url: `/Account/Login`,
                dataType: 'json',
                data: JSON.stringify(user)
            })

            if(loginAttempt.result === 'NotRegistered') {
                let sendToRegister = confirm('User not registered')
                if(sendToRegister) {
                    window.open('/A/App/Register', '_self')
                }
            }
            if(loginAttempt.result === 'Failure') {
                alert('Invalid login attempt')
            }
            if(loginAttempt.result === 'Success') {
                let date = new Date()
                date.setDate(date.getDate() + 365)
                document.cookie = `dod_id=${this.state.user.dod_id};expires=${date.getUTCMilliseconds}`
                window.open('/A/App/Home', '_self')
            }

        } catch(e) {
            console.log(e)
        }

    }

    componentDidMount() {
    }

    render() {
        return(
            <div className='Login'>

                <Header />

                <div className='login-content-container'>
                    <div className='login-container-section'>
                        <div className='login-title'>Log In</div>
                            <div className='login-input-container'>
                                Dod Id
                                <input type="text" className='login-input' onKeyPress={(e) => {this.handleSubmit(e)}} onChange={(e) => {this.handleUsername(e)}}/>
                            </div>
                            <div className='login-input-container' id='login-password-container'>
                                Password
                                <input type="password" className='login-input' onKeyPress={(e) => {this.handleSubmit(e)}} onChange={(e) => {this.handlePassword(e)}}/>
                            </div>
                            <div>
                                <button id='login-button' onClick={this.handleLogin}>Log In</button>
                            </div>
                        </div>
                    <div className='login-container-section'>
                        <div className='login-title'>First Time Users</div>
                        <div className='login-paragraph'>
                            During the course of the demo, register an account with a username and password and then login. Each user will be generic and have their content auto generated.
                        </div>
                    </div>
                </div>

                <Footer />

            </div>
        )
    }

}