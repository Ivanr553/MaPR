import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import {Link} from 'react-router-dom'
import $ from 'jquery'

const s = require('./styling/style.sass')


import Header from '../Header/Header'
import Footer from '../Footer/Footer'

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
                    <div className='login-container-section'>
                        <div className='login-title'>Log In</div>
                            <div className='login-input-container'>
                                Username
                                <input type="text" className='login-input' onChange={(e) => {this.handleUsername(e)}}/>
                            </div>
                            <div className='login-input-container' id='login-password-container'>
                                Password
                                <input type="password" className='login-input' onChange={(e) => {this.handlePassword(e)}}/>
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