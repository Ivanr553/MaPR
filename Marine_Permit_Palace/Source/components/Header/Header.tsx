import * as React from 'react'
import { Link } from 'react-router-dom'
import * as $ from 'jquery'

const s =  require('./styling/style.sass')

export default class Header extends React.Component<any, any> {

    constructor(props) {
        super(props)
        this.state = {
            username: '',
            hamburgerMenu: '',
            hamburgerMenuShow: false
        }

        this.getCurrentUser = this.getCurrentUser.bind(this)
        this.logOff = this.logOff.bind(this)
        this.handleHamburgerMenuPress = this.handleHamburgerMenuPress.bind(this)
    }

    async logOff() {

        let response = await $.get('/Account/Logout')

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

        if(user.username) {
            this.setState({
                username: user.username
            })
        }
    }

    //Hamburger Menu
    handleHamburgerMenuPress(e) {

        if(!this.state.hamburgerMenuShow) {

            let hamburgerMenu = 
            <div className='hamburger-menu-element' id='hamburger-menu' style={{animation: 'show-hamburger-menu 1.5s forwards'}}>
                <div className='hamburger-menu-item hamburger-menu-element' id='account-hamburger-menu-item'>Account</div>
                <div className='hamburger-menu-item hamburger-menu-element' id='settings-hamburger-menu-item'>Settings</div>
                <div className='hamburger-menu-item hamburger-menu-element' id='log-out-hamburger-menu-item'>Log Out</div>
            </div>

            this.setState({
                hamburgerMenu: hamburgerMenu,
                hamburgerMenuShow: true
            })
        }

        if(this.state.hamburgerMenuShow) {

            let hamburgerMenu = 
            <div id='hamburger-menu' style={{animation: 'hide-hamburger-menu 0.75s forwards'}}>
                <div className='hamburger-menu-item'>Account</div>
                <div className='hamburger-menu-item'>Settings</div>
                <div className='hamburger-menu-item'>Log Out</div>
            </div>

            this.setState({
                hamburgerMenu: hamburgerMenu,
                hamburgerMenuShow: false
            })

        }

    }

    componentDidMount() {
        this.getCurrentUser()
    }

    render() {

        //Header state if user is NOT logged in
        let accountInnerHtml
        let accountLink = '/Register'
        let registerTab = (
            <Link id='register-tab' className='Link header-tab register-tab' to={{pathname: '/A/App/Register'}}>
                Register
            </Link>
        )
        let logInTab = (
            <Link className='Link header-tab log-in-tab' to={{pathname: '/A/App/'}}>
                Log In
            </Link>
        )
        let homeTab = 
            <Link id='header-logo-container' className='Link home-header-link' to={{pathname: '/A/App/'}}> 
                <img src='/images/MAPR_logo_edit.png' id='header-logo' />
            </Link>
        let logOff
        let fullHeader = 'show-full-header'

        //Header state if user IS logged in
        if(this.state.username != '') {
            // accountLink = '/Account'
            // registerTab = <div></div>
            // logInTab = <div></div>
            //     // <div onClick={(e) => {this.handleHamburgerMenuPress(e)}} className='header-tab log-in-tab' id='hamburger-menu-container'>
            //     //     <img id='hamburger-icon' src="/images/hamburger-menu.png" alt=""/>
            //     //     {this.state.hamburgerMenu}
            //     // </div>
            // homeTab =
            //     <Link className='Link home-header-link' to={{pathname: '/A/App/Home'}}>
            //         <img src='/images/MAPR_logo_edit.png' id='header-logo' />
            //     </Link>
            // homeTab = <div></div>
            // logOff = 
            //     <div className='header-tab log-in-tab' onClick={this.logOff}>
            //         <img id='logoff-icon' src="/images/logoff.png" alt=""/>
            //     </div>
            fullHeader = ''
        }

        return(
            <div id='HomeHeader' className={fullHeader}>
                <div className='home-tab'>
                    {homeTab}
                </div>
                {logInTab}
                {registerTab}
            </div>
        )
    }

}