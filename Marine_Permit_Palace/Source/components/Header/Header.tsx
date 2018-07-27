import * as React from 'react'
import { Link } from 'react-router-dom'

const s =  require('./styling/style.sass')

export default class Header extends React.Component<any, any> {

    constructor(props) {
        super(props)
        this.state = {
            hamburgerMenu: '',
            hamburgerMenuShow: false,
            currentView: '',
            page: ''
        }
        
    }

    //Hamburger Menu
    handleHamburgerMenuPress = (e) => {

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

    render() {
        
        let headerLink
        let fullHeader = 'show-full-header'

        if(location.pathname === '/A/App/Home') {
            fullHeader = ''
        }

        if(location.pathname === '/A/App/Register') {
            headerLink = (
                <Link className='Link header-tab log-in-tab' to={{pathname: '/A/App/'}}>
                    Log In
                </Link>
            )
        }

        if(location.pathname === '/A/App' || location.pathname === '/A/App/') {
            headerLink = (
                <Link id='register-tab' className='Link header-tab register-tab' to={{pathname: '/A/App/Register'}}>
                    Register
                </Link>
            )
        }


        return(
            <div id='HomeHeader' className={fullHeader}>
                <div className='home-tab'>
                    <Link id='header-logo-container' className='Link home-header-link' to={{pathname: '/A/App/'}}> 
                        <img src='/images/MAPR_logo_edit.png' id='header-logo' />
                    </Link>
                </div>
                {headerLink}
            </div>
        )
    }

}