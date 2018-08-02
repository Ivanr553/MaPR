import * as React from 'react'
import { RouteComponentProps } from 'react-router'

import {authenticateUser, logOff} from '../../services/services'

import './styling/style.sass'

import Header from '../Header/Header'
import MetaBar from '../MetaBar/MetaBar'
import Account from '../Account/Account'
import HamburgerMenu from '../HamburgerMenu/HamburgerMenu';

interface Props extends RouteComponentProps<any> {}
export default class Home extends React.Component<Props, any> {

  constructor(props) {
    super(props)
    this.state = {
      username: '',
      currentView: '',
      documentResults: [],
      documentList: [],
      hamburgerMenu: '',
      hamburgerMenuShow: false,
      hamburgerSource: '/images/hamburger-menu.png',
      closeHamburgerMenu: false
    }

  }

  //View Handling
  handleAccountPress = () => {
    this.setState({
      currentView: <Account />
    })
  }

  getCurrentView = (currentView) => {
    this.setState({
      currentView: currentView
    }, () => {
      if(this.state.currentView.type.name === 'CreateDocument') {
        this.setState({
          hamburgerSource: '/images/hamburger-menu-edit.png'
        })
      } else {
        this.setState({
          hamburgerSource: '/images/hamburger-menu.png'
        })
      }
    })
  }
  

  //Hamburger Menu
  handleHamburgerMenuPress(e) {

    if(!this.state.hamburgerMenuShow) {

        let hamburgerMenu = 
        <div id='hamburger-menu' className='hamburger-menu-element' style={{animation: 'show-hamburger-menu 1.5s forwards'}}>
            <div className='hamburger-menu-item hamburger-menu-element' id='account-hamburger-menu-item' onClick={this.handleAccountPress}>Account</div>
            <div className='hamburger-menu-item hamburger-menu-element' id='settings-hamburger-menu-item'>Help</div>
            <div className='hamburger-menu-item hamburger-menu-element' id='log-out-hamburger-menu-item' onClick={logOff}>Log Out</div>
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
            <div className='hamburger-menu-item'>Help</div>
            <div className='hamburger-menu-item'>Log Out</div>
        </div>

        this.setState({
            hamburgerMenu: hamburgerMenu,
            hamburgerMenuShow: false
        })

    }

  }

  getHamburgerState = (hamburgerState) => {
    this.setState({
      hamburgerState: hamburgerState
    })
  }

  getHamburgerMenuBrightness = async (hamburgerSource) => {
    this.setState({
      hamburgerSource: hamburgerSource
    })
  }


  //Will check to see if hamburgermenu was not clicked, if true then it will tell hamburger menu to close
  handleHomeClick = (e) => {

    if(e.target.classList.contains('hamburger-menu-element')) {
      return
    }

    this.setState({
      closeHamburgerMenu: true
    }, () => {
      setTimeout(
        () => {
          this.setState({
            closeHamburgerMenu: false
          })
        },
        500
      )
    })
  }

  componentDidMount() {
    authenticateUser()
  }

  render() {
    return(
      <div className="Home" onClick={(e) => {this.handleHomeClick(e)}}>
        
        <Header />

        <MetaBar getCurrentView={this.getCurrentView}/>

        <HamburgerMenu handleAccountPress={() => this.getCurrentView(<Account />)} logOff={logOff} getHamburgerState={this.getHamburgerState} closeHamburgerMenuBool={this.state.closeHamburgerMenu} hamburgerSource={this.state.hamburgerSource}/>

        <div id='documents-container' className={this.state.animate} >
          {this.state.currentView}
        </div>

      </div>
    )
  }

}
