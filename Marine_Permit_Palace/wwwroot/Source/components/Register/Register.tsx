import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import $ from 'jquery'

const s = require('./styling/style.sass')

import Header from '../Header/Header'

interface Props extends RouteComponentProps<any> {}
export default class Register extends React.Component<Props, any> {

    constructor(props) {
        super(props)
        this.state = {
            dodNumber: '',
            password: '',
            confirmPassword: ''
        }

        this.handleUsername = this.handleUsername.bind(this)
        this.handleRegister = this.handleRegister.bind(this)
    }

    handleUsername(e) {
        this.setState({
            dodNumber: e.target.value
        })
    }

    handlePassword(e) {
        this.setState({
            password: e.target.value
        })
    }

    handleConfirmPassword(e) {
        this.setState({
            confirmPassword: e.target.value
        })
    }

    async handleRegister() {

        // Check if inputs are not properly filled in
        if(!this.state.dodNumber || !this.state.password) {
            alert('Fill in all fields')
            return
        }

        // Check if password are not correctly equivalent
        if(this.state.password != this.state.confirmPassword) {
            alert('Passwords do not match')
            return
        }

        let newUser = {
            username: this.state.dodNumber,
            password: this.state.password
        }

        try {

            let response = await $.post('/registerUser', newUser)
            if(response == 'Success') {
                let userRes = alert('Registration Complete!')
                if(userRes) {
                    window.open('/A/App/', '_self')
                }
            }
            if(response == 'User Exists') {
                alert('Username Already Exists')
            }

        } catch(e) {
            console.log(e)
            alert('There was an error with your registration.')
        }
    }

    render() {
        return(
            <div className='Register'>

                <Header />

                <div className='register-title'>Register</div>
                <div className='main-register-content-container'>
                    <div className='username-register-container'>
                        DOD Number
                        <input className='register-input' type="string" onChange={(e)=>{this.handleUsername(e)}} name='username'/>
                    </div>
                    <div className='password-register-container'>
                        Password
                        <input className='register-input' type="password" onChange={(e)=>{this.handlePassword(e)}} name='password'/>
                        <input className='register-input' type="password" onChange={(e)=>{this.handleConfirmPassword(e)}} name='password-confirm' placeholder='confirm password'/>
                    </div>
                    <button className='register-submit-button' name='register-submit' onClick={this.handleRegister} >Register</button>
                </div>
            </div>
        )
    }

}