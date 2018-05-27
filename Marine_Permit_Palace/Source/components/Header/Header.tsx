import * as React from 'react'
import { Link } from 'react-router-dom'
import $ from 'jquery'

const s =  require('./styling/style.sass')

export default class Header extends React.Component<any, any> {

    constructor(props) {
        super(props)
        this.state = {
            username: ''
        }
        this.getCurrentUser = this.getCurrentUser.bind(this)
        this.logOff = this.logOff.bind(this)
    }

    async logOff() {

        // let response = $.post('/logout')

        // if(!response) {
        //     alert('There was an error with your request')
        // } else {
        //     this.setState({
        //         username: ''
        //     }, () => {
        //         window.open('/A/App', '_self')
        //     })
        // }

    }

    async getCurrentUser() {

        // let response = await $.post('/checkSession')

        // let user = this.props.getCurrentUser()

        // if(user.username) {
        //     this.setState({
        //         username: user.username
        //     })
        // }
    }

    componentDidMount() {
        // this.getCurrentUser()
    }

    render() {

        let accountInnerHtml
        let accountLink = '/Register'
        let registerTab = (
            <div className='header-tab register-tab'>
                <Link className='Link header-link' to={{pathname: '/A/App/Register'}}> Register </Link>
            </div>
        )
        let logInTab = (
            <div className='header-tab log-in-tab'>
                <Link className='Link header-link' to={{pathname: '/A/App/'}}> Log In </Link>
            </div>
        )
        let homeTab = <Link className='Link home-header-link' to={{pathname: '/A/App/'}}> <img src='/images/mapr-logo.png' id='header-logo' /> </Link>
        let logOff

        if(this.state.username != '') {
            
            accountInnerHtml = 'Welcome, ' + this.state.username
            accountLink = '/Account'
            registerTab = <div></div>
            logInTab = 
                <div className='header-tab log-in-tab'>
                    {accountInnerHtml}
                </div>
            homeTab = <Link className='Link home-header-link' to={{pathname: '/A/App/Home'}}> <img src='/images/mapr-logo.png' id='header-logo' /> </Link>
            logOff = 
            <div className='header-tab log-in-tab' onClick={this.logOff}>
                <div className='Link header-link'> Log Off </div>
            </div>
        }

        return(
            <div className='HomeHeader' >
                <div className='home-tab'>
                    {homeTab}
                </div>
                {logOff}
                {logInTab}
                {registerTab}
            </div>
        )
    }

}