import * as React from 'react'
import { Link } from 'react-router-dom'
import * as $ from 'jquery'

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

        let response = await $.get('/Account/Logout')
        console.log(response)

        if(!response) {
            alert('There was an error with your request')
        } else {
            this.setState({
                username: ''
            }, () => {
                window.open('/A/App', '_self')
            })
        }

    }

    async getCurrentUser() {
        
        if(!this.props.getCurrentUser) {
            return
        }

        let user = await this.props.getCurrentUser()
        console.log('header user:', user)

        if(user.username) {
            this.setState({
                username: user.username
            })
        }
    }

    componentDidMount() {
        this.getCurrentUser()
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
        let homeTab = <Link className='Link home-header-link' to={{pathname: '/A/App/'}}> <img src='/images/MAPR_logo_edit.png' id='header-logo' /> </Link>
        let logOff
        let fullHeader = 'show-full-header'

        if(this.state.username != '') {
            
            accountInnerHtml = 'User: ' + this.state.username
            accountLink = '/Account'
            registerTab = <div></div>
            logInTab = 
                <div className='header-tab log-in-tab'>
                    {accountInnerHtml}
                </div>
            homeTab = <Link className='Link home-header-link' to={{pathname: '/A/App/Home'}}> <img src='/images/MAPR_logo_edit.png' id='header-logo' /> </Link>
            homeTab = <div></div>
            logOff = 
            <div className='header-tab log-in-tab' onClick={this.logOff}>
                <div className='Link header-link'> Log Off </div>
            </div>
            fullHeader = ''
        }

        return(
            <div id='HomeHeader' className={fullHeader}>
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