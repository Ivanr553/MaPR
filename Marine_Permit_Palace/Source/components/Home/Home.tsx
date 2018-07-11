import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { Link } from 'react-router-dom'
import * as $ from 'jquery'

const s = require('./styling/style.sass')

import Header from '../Header/Header'
import MetaBar from '../MetaBar/MetaBar'
import DocumentList from '../DocumentList/DocumentList'
import Account from '../Account/Account'
import HamburgerMenu from '../HamburgerMenu/HamburgerMenu';

interface Props extends RouteComponentProps<any> {}
export default class Home extends React.Component<Props, any> {

  constructor(props) {
    super(props)
    this.state = {
      user: {},
      username: '',
      currentView: '',
      documentResults: [],
      documentList: [],
      hamburgerMenu: '',
      hamburgerMenuShow: false,
      hamburgerSource: '/images/hamburger-menu.png',
      closeHamburgerMenu: false
    }

    this.getUser = this.getUser.bind(this)
    this.getCurrentUser = this.getCurrentUser.bind(this)
  }

  //Hamburger Menu
  handleHamburgerMenuPress(e) {

    if(!this.state.hamburgerMenuShow) {

        let hamburgerMenu = 
        <div id='hamburger-menu' className='hamburger-menu-element' style={{animation: 'show-hamburger-menu 1.5s forwards'}}>
            <div className='hamburger-menu-item hamburger-menu-element' id='account-hamburger-menu-item' onClick={this.handleAccountPress}>Account</div>
            <div className='hamburger-menu-item hamburger-menu-element' id='settings-hamburger-menu-item'>Help</div>
            <div className='hamburger-menu-item hamburger-menu-element' id='log-out-hamburger-menu-item' onClick={this.logOff}>Log Out</div>
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

  handleAccountPress = () => {
    this.setState({
      currentView: <Account />
    })
  }

  logOff = async () => {

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

  async getUser() {

    let response = await $.get('/Account/WhoAmI')
    
    if(!response) {
      window.open('/A/App', '_self')
    }

    let user = {
        first_name: 'John',
        last_name: 'Smith',
        middle_name: 'Doe',
        username: response.username,
        street_address: '1234 United Way',
        state: 'CA',
        country: 'US',
        zip: 93021,
        authorization: 1
    }

    this.setState({
        user: user
    })

    return user

  }

  async getCurrentUser() {
    let user = await this.getUser()
    return user
  }

  getHamburgerMenuBrightness = async (hamburgerSource) => {
    this.setState({
      hamburgerSource: hamburgerSource
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

  getHamburgerState = (hamburgerState) => {
    this.setState({
      hamburgerState: hamburgerState
    })
  }

  async componentDidMount() {
    this.getUser()
  }

  render() {
    return(
      <div className="Home" onClick={(e) => {this.handleHomeClick(e)}}>
        
        <Header getCurrentUser={this.getCurrentUser} page={'Home'}/>

        <MetaBar getCurrentView={this.getCurrentView} getCurrentUser={this.getCurrentUser}/>

        <HamburgerMenu handleAccountPress={() => this.getCurrentView(<Account />)} logOff={this.logOff} getHamburgerState={this.getHamburgerState} closeHamburgerMenuBool={this.state.closeHamburgerMenu} hamburgerSource={this.state.hamburgerSource}/>

        <div id='documents-container' className={this.state.animate} >
          {this.state.currentView}
        </div>

      </div>
    )
  }

}
