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

                <div className='register-content-container'>
                    <div className='register-container-section'>
                        <div className='register-title'>Register</div>
                            <div className='register-input-container'>
                                Username
                                <input type="text" className='register-input' onChange={(e) => {this.handleUsername(e)}}/>
                            </div>
                            <div className='register-input-container' id='register-password-container'>
                                Password
                                <input type="password" className='register-input' onChange={(e) => {this.handlePassword(e)}}/>
                            </div>
                            <div className='register-input-container'>
                                Confirm Password
                                <input type="password" className='register-input' onChange={(e) => {this.handleConfirmPassword(e)}}/>
                            </div>
                            <div>
                                <button className='register-button'>Register</button>
                            </div>
                        </div>
                    <div className='register-container-section' id='register-container-section-right'>
                        <div className='register-title'>For Demo Only</div>
                        <div className='register-paragraph'>
                            Registration will only occur for the purposes of the demo. In the live site, there will be no need to register as the user will have their account linked to their DOD Number.
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}