import * as React from 'react'
import { RouteComponentProps } from 'react-router'

const s = require('./styling/style.sass')

import Header from '../Header/Header'

interface Props extends RouteComponentProps<any> {}
export default class Account extends React.Component<any, any> {

  constructor(props) {
    super(props)
    this.state = {
      user: {
        username: '',
        rank: 'PVT',
        first_name: 'TRISTAN',
        last_name: 'ABER',
        middle_name: 'JOLYON',
        DOB: '1998 Nov 08',
        home_of_record: '19211 JEFFERSON DAVIS HWY, TRIANGLE, VA 22172',
        place_of_birth: 'TUN TAVERN, PA',
        civ_license_state: 'KY',
        class_of_vehicle: 'C',
        civ_license_num: 'MARCORDET 434',
        civ_issued_date: '11/8/1998',
        civ_exp_date: '11/9/2018',
        medical_cert_req: '*MED CERT REQUIRED',
        wears_glasses: false,
        organization: 'MARCOR DET FLW, MTIC',
        age: 27,
        sex: 'M',
        height: 66,
        weight: '140',
        hair_color: 'BLN',
        eye_color: 'BLU',
        authorization: 1,
      },
      currentView: ''
    }

    this.getCurrentUser = this.getCurrentUser.bind(this)
  }

  getAccountInformationView() {
    let currentView = (
      <div className='account-page-view' id='account-information-view'>
        <div className='account-content-column'>
          <div className='account-info-line-item'><strong>DOD Number:</strong> {this.state.user.username}</div>
          <div className='account-info-line-item'><strong>Rank:</strong> {this.state.user.rank}</div>
          <div className='account-info-line-item'><strong>Organization:</strong> {this.state.user.organization}</div>
          <div className='account-info-line-item'><strong>Class of Vehicle:</strong> {this.state.user.class_of_vehicle}</div>
        </div>
        <div className='account-content-column'>
          <div className='account-info-line-item'><strong>Authorization Level:</strong> {this.state.user.authorization}</div>
            <div className='account-info-line-item'><strong>Medical Certification:</strong> {this.state.user.medical_cert_req}</div>
            <div className='account-info-line-item'><strong>Civilian Issued Date:</strong> {this.state.user.civ_issued_date}</div>
            <div className='account-info-line-item'><strong>Civilian Expiration Date:</strong> {this.state.user.civ_exp_date}</div>
        </div>
      </div>
    )

    this.setState({
      currentView: currentView
    })
  }

  getPersonalInformationView() {
    let currentView = (
      <div className='account-page-view' id='personal-information-view'>
          <div className='account-content-column'>
            <div className='account-info-line-item'><strong>First Name:</strong> {this.state.user.first_name}</div>
            <div className='account-info-line-item'><strong>Middle Name:</strong> {this.state.user.middle_name}</div>
            <div className='account-info-line-item'><strong>Last Name:</strong> {this.state.user.last_name}</div>
            <div className='account-info-line-item'><strong>Sex:</strong> {this.state.user.sex}</div>
            <div className='account-info-line-item'><strong>Age:</strong> {this.state.user.age}</div>
            <div className='account-info-line-item'><strong>Wears Glasses:</strong> {this.state.user.wears_glasses}</div>
          </div>
          <div className='account-content-column'>
            <div className='account-info-line-item'><strong>Height:</strong> {this.state.user.height}</div>            
            <div className='account-info-line-item'><strong>Weight:</strong> {this.state.user.weight}</div>
            <div className='account-info-line-item'><strong>Hair Color:</strong> {this.state.user.hair_color}</div>
            <div className='account-info-line-item'><strong>Eye Color:</strong> {this.state.user.eye_color}</div>
            <div className='account-info-line-item'></div>
          </div>
      </div>
    )

    this.setState({
      currentView: currentView
    })
  }

  getCivilianInformationView() {
    let currentView = (
      <div className='account-page-view' id='civilian-information-view'>
        <div className='account-content-column'>
            <div className='account-info-line-item'><strong>Home Address:</strong> {this.state.user.home_of_record}</div>
            <div className='account-info-line-item'><strong>Date of Birth:</strong> {this.state.user.DOB}</div>
            <div className='account-info-line-item'><strong>Place of Birth:</strong> {this.state.user.place_of_birth}</div>
        </div>
        <div className='account-content-column'>
            <div className='account-info-line-item'><strong>Civilian Licence Number:</strong> {this.state.user.civ_license_num}</div>
            <div className='account-info-line-item'><strong>State of Licence:</strong> {this.state.user.civ_license_state}</div>
        </div>
      </div>
    )

    this.setState({
      currentView: currentView
    })
  }

  async getCurrentUser() {

    let user = await this.props.getCurrentUser()

    this.setState({
      user: user
    }, () => {
      
    })

  }

  handleTabPress(e, content) {

    let tabs = e.target.parentNode.children

    for(let tab of tabs) {
      if(tab.classList.contains('account-tab-selected')) {
        tab.classList.remove('account-tab-selected')
      }
    }

    e.target.classList.add('account-tab-selected')

    if(content == 'Account') {
      this.getAccountInformationView()
    }
    if(content == 'Personal') {
      this.getPersonalInformationView()
    }
    if(content == 'Civilian') {
      this.getCivilianInformationView()
    }

  }

  async componentDidMount() {
    let awaitUser= await this.getCurrentUser()
    this.getAccountInformationView()
  }

  render() {

    return(
      <div id='Account'>
        <div id='account-content-container'>
          <div id='account-tabs-container'>
            <div id='account-info-tab' className='account-tab account-tab-selected' onClick={(e) => {this.handleTabPress(e, 'Account')}}>Account Information</div>
            <div id='personal-info-tab' className='account-tab' onClick={(e) => {this.handleTabPress(e, 'Personal')}}>Personal Information</div>
            <div id='civilian-info-tab' className='account-tab' onClick={(e) => {this.handleTabPress(e, 'Civilian')}}>Civilian Information</div>
          </div>
          {this.state.currentView}
        </div>
      </div>
    )
  }

}
