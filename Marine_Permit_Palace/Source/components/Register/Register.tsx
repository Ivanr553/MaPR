import * as React from 'react'
import { RouteComponentProps } from 'react-router'

import './styling/style.sass'

import Header from '../Header/Header'
import Footer from '../Footer/Footer'

interface Props extends RouteComponentProps<any> {}
export default class Register extends React.Component<Props, any> {

    constructor(props) {
        super(props)
        this.state = {
            dodNumber: '',
            password: '',
            isPasswordValid: false,
            confirmPassword: '',
            email: '',
            formErrors: {
                dodNumber: '',
                password: '',
                confirmPassword: '',
                email: '',
            }
        }
    }

    handleUsername = (e) => {
        this.setState({
            dodNumber: e.target.value
        })
    }

    handleEmail = (e) => {
        this.setState({
            email: e.target.value
        }) 
    }


    handlePassword = (e) => {

        this.setState({
            password: e.target.value
        })
    }

    handleConfirmPassword = (e) => {
        this.setState({
            confirmPassword: e.target.value
        })
    }

    handleRegister = async () => {

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
            dod_id: this.state.dodNumber,
            email: this.state.email,
            password: this.state.password,
            confirm_password: this.state.confirmPassword,
            remember_me: true
        }

        try {

            let request = await fetch('/Account/RegisterAndLogin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify(newUser)
            })
            let registerResponse = await request.json()

            if(registerResponse.result === 'Failure') {
                alert('User already created')
            }
            if(registerResponse.result === 'Success') {
                window.open('/A/App/Home', '_self')
            }

        } catch(e) {
            throw new Error(e)
        }

    }

    componentDidMount() {
    }

    render() {
        return(
            <div className='Register'>

                <Header />

                <div className='register-content-container'>
                    <div className='register-container-section'>
                        <div className='register-title'>Register</div>
                            <div className='register-input-container'>
                                Dod Id
                                <input type="text" className='register-input' onChange={(e) => {this.handleUsername(e)}}/>
                            </div>
                            <div className='register-input-container'>
                                Email
                                <input type="text" className='register-input' onChange={(e) => {this.handleEmail(e)}}/>
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
                                <button className='register-button' onClick={this.handleRegister}>Register</button>
                            </div>
                        </div>
                    <div className='register-container-section' id='register-container-section-right'>
                        <div className='register-title'>For Demo Only</div>
                        <div className='register-paragraph'>
                            Registration will only occur for the purposes of the demo. In the live site, there will be no need to register as the user will have their account linked to their DOD Number.
                        </div>
                    </div>
                </div>

                <Footer />

            </div>
        )
    }

}