import * as React from 'react'

const s = require('./styling/style.sass')

interface Props {
    getHamburgerState(hamburgerState: string): void,
    closeHamburgerMenuBool: boolean,
    logOff(): void,
    handleAccountPress(): void,
    hamburgerSource: string
}

class HamburgerMenu extends React.Component<Props, any> {

    constructor(props) {
        super(props)
        this.state = {
            closeHamburgerMenuBool: this.props.closeHamburgerMenuBool,
            hamburgerState: 'new',
            hamburgerSource: ''
        }


    }

    toggleHamburgerMenu = (toggle) => {
        this.setState({
            hamburgerState: toggle
        })
    } 


    //State Management
    giveHamburgerState = (hamburgerState) => {
        this.props.getHamburgerState(hamburgerState)
    }

    handleAccountPress = () => {
        this.props.handleAccountPress()
    }

    logOff = () => {
        this.props.logOff()
    }

    //Is checking to see if hamburger menu should be closed by home click
    handleCloseHamburgerMenuBool = () => {
        if(this.props.closeHamburgerMenuBool) {
            if(this.state.hamburgerState === 'open') {
                this.toggleHamburgerMenu('closed')
            }
        }
    }

    //React Lifecycle
    componentDidUpdate() {
        this.handleCloseHamburgerMenuBool()
    }

    componentDidMount() {

    }

    render() {

        if(this.state.hamburgerState === 'new') {
            return (
                <div onClick={(e) => {this.toggleHamburgerMenu('open')}} id='hamburger-menu-container' className='hamburger-menu-element'>
                <img className='hamburger-menu-element' id='hamburger-icon' src={this.props.hamburgerSource} alt=""/>
            </div>
            )
        }

        if(this.state.hamburgerState === 'closed') {

            return (
                <div onClick={(e) => {this.toggleHamburgerMenu('open')}} id='hamburger-menu-container' className='hamburger-menu-element'>
                    <img className='hamburger-menu-element' id='hamburger-icon' src={this.props.hamburgerSource} alt=""/>
                    <div id='hamburger-menu' style={{animation: 'hide-hamburger-menu 0.75s forwards'}}>
                        <div className='hamburger-menu-item'>Account</div>
                        <div className='hamburger-menu-item'>Help</div>
                        <div className='hamburger-menu-item'>Log Out</div>
                    </div>
                </div>
            )

        }
        if(this.state.hamburgerState === 'open') {

            return (
                <div onClick={(e) => {this.toggleHamburgerMenu('closed')}} id='hamburger-menu-container' className='hamburger-menu-element'>
                    <img className='hamburger-menu-element' id='hamburger-icon' src={this.props.hamburgerSource} alt=""/>
                    <div id='hamburger-menu' className='hamburger-menu-element' style={{animation: 'show-hamburger-menu 1.5s forwards'}}>
                        <div className='hamburger-menu-item hamburger-menu-element' id='account-hamburger-menu-item' onClick={this.handleAccountPress}>Account</div>
                        <div className='hamburger-menu-item hamburger-menu-element' id='settings-hamburger-menu-item'>Help</div>
                        <div className='hamburger-menu-item hamburger-menu-element' id='log-out-hamburger-menu-item' onClick={this.logOff}>Log Out</div>
                    </div>
                </div>
            )
        }

        return <div>Something Broke!</div>
    }
}

export default HamburgerMenu;