import * as React from 'react'
import { RouteComponentProps } from 'react-router'
import { Link } from 'react-router-dom'
import * as $ from 'jquery'

const s = require('./styling/style.sass')

import Header from '../Header/Header'
import MetaBar from '../MetaBar/MetaBar'
import DocumentList from '../DocumentList/DocumentList'

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
      hamburgerMenuShow: false
    }

    this.getUser = this.getUser.bind(this)
    this.getCurrentUser = this.getCurrentUser.bind(this)
    this.getCurrentView = this.getCurrentView.bind(this)
  }

    //Hamburger Menu
  handleHamburgerMenuPress(e) {

    if(!this.state.hamburgerMenuShow) {

        let hamburgerMenu = 
        <div className='hamburger-menu-element' id='hamburger-menu' style={{animation: 'show-hamburger-menu 1.5s forwards'}}>
            <div className='hamburger-menu-item hamburger-menu-element' id='account-hamburger-menu-item'>Account</div>
            <div className='hamburger-menu-item hamburger-menu-element' id='settings-hamburger-menu-item'>Settings</div>
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
            <div className='hamburger-menu-item'>Settings</div>
            <div className='hamburger-menu-item'>Log Out</div>
        </div>

        this.setState({
            hamburgerMenu: hamburgerMenu,
            hamburgerMenuShow: false
        })

    }

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

  getCurrentView(currentView) {
    this.setState({
      currentView: currentView
    })
  }

  async componentDidMount() {
    this.getUser()
  }

  render() {
    return(
      <div className="Home">
        
        <Header getCurrentUser={this.getCurrentUser}/>

        <MetaBar getCurrentView={this.getCurrentView} getCurrentUser={this.getCurrentUser}/>

        <div onClick={(e) => {this.handleHamburgerMenuPress(e)}} id='hamburger-menu-container'>
          <img id='hamburger-icon' src="/images/hamburger-menu.png" alt=""/>
          {this.state.hamburgerMenu}
        </div>

        <div id='documents-container' className={this.state.animate} >
          {this.state.currentView}
        </div>

      </div>
    )
  }

}
