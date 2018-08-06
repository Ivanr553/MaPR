import * as React from 'react'

import './styling/style.sass'

import TextInput from '../DocumentView/UserInputComponents/TextInput/TextInput'

export default class Account extends React.Component<any, any> {

  constructor(props) {
    super(props)
    this.state = {
      user: {
        personalInfo: {
          first_name: 'TRISTAN',
          last_name: 'ABER',
          middle_name: 'JOLYON',
          DOB: '1998 Nov 08',
          home_of_record: '19211 JEFFERSON DAVIS HWY, TRIANGLE, VA 22172',
          place_of_birth: 'TUN TAVERN, PA',
          age: 27,
          sex: 'M',
          height: 66,
          weight: '140',
          hair_color: 'BLN',
          eye_color: 'BLU',
          wears_glasses: false,
        },
        accountInfo: {
          dod_id: '',
          rank: 'PVT',
          civ_license_state: 'KY',
          class_of_vehicle: 'C',
          civ_license_num: 'MARCORDET 434',
          civ_issued_date: '11/8/1998',
          civ_exp_date: '11/9/2018',
          medical_cert_req: '*MED CERT REQUIRED',
          organization: 'MARCOR DET FLW, MTIC',
          authorization: 1,
        },
        additionalInfo: {

        }
      },
      currentView: '',
      personalInfoArray: [],
      accountInfoArray: [],
      additionalInfoArray: [],
      error: false,
      'personal-tab': false,
      'account-tab': false,
      'additional-tab': false
    }

  }

  generateInfo = (userArray: Array<any> , displayArrayName: String) => {

    let elementArray = []

    for(let item in userArray) {

      let itemDescription = item
      
      //Replacing _ with ' '
      while(itemDescription.includes('_')) {
        itemDescription = itemDescription.replace('_', ' ')
      }

      //Capitalizing the first word
      itemDescription = itemDescription.charAt(0).toUpperCase() + itemDescription.slice(1)


      let component = (
        <div key={item} className='account-content-line'>
          <div className='account-info-description'>{itemDescription}:</div>
          <TextInput id={item} field_name={undefined} page={null} position='block' width={'auto'} border={'solid 1px rgb(0, 0, 0, 0.1)'} height={null} left={null} top={null} value={userArray[item]} onChange={(e) => this.handleInputChange(e, item, 'personalInfo')} view={'AccountPage'}/>
        </div>
      )

      
      elementArray.push(component)
    }

    this.setState({
      [`${displayArrayName}`]: elementArray
    })

  }

  handleInputChange = (e, id, array) => {

    let user = this.state.user
    user[array][id] = e.target.value

    this.setState({
      user: user
    })

  }

  handleAccountTabPress = (e, tab, title, list, arrow) => {

    //Making sure code is executed only when selecting tab/title
    if(!(e.target.id == tab || e.target.id == title || e.target.id == arrow)) {
      return 
    }

    if(this.state[tab]) {
      document.getElementById(tab).classList.remove('account-tab-open')
      document.getElementById(title).classList.remove('account-tab-title-open')
      document.getElementById(list).classList.remove('account-content-list-open')
      document.getElementById(arrow).classList.remove('account-tab-title-arrow-open')

      this.setState({
        [tab]: false
      })
    } 
    
    else {
      document.getElementById(tab).classList.add('account-tab-open')
      document.getElementById(title).classList.add('account-tab-title-open')
      document.getElementById(list).classList.add('account-content-list-open')
      document.getElementById(arrow).classList.add('account-tab-title-arrow-open')

      this.setState({
        [tab]: true
      })
    }

  }

  componentDidMount() {
    this.generateInfo(this.state.user.personalInfo, 'personalInfoArray')
    this.generateInfo(this.state.user.accountInfo, 'accountInfoArray')
    this.generateInfo(this.state.user.additionalInfo, 'additionalInfoArray')
  }

  render() {

    return(
      <div id='Account'>
        <div className='documents-header'>Account Information</div>
        <div id='main-account-content-container'>
          <div id='personal-tab' className='account-tab' onClick={(e) => this.handleAccountTabPress(e, 'personal-tab', 'personal-tab-title', 'personal-tab-list', 'personal-tab-arrow')}>
            <div id='personal-tab-title' className='account-tab-title'>
              Personal Information
              <img id='personal-tab-arrow' className='account-tab-title-arrow' src="/images/down-arrow-1.png" alt=""/>
            </div>
            <div id='personal-tab-list' className='account-content-list'>
              {this.state.personalInfoArray}
            </div>
          </div>
          <div id='account-tab' className='account-tab' onClick={(e) => this.handleAccountTabPress(e, 'account-tab', 'account-tab-title', 'account-tab-list', 'account-tab-arrow')}>
            <div id='account-tab-title' className='account-tab-title'>
              Account Information
              <img id='account-tab-arrow' className='account-tab-title-arrow' src="/images/down-arrow-1.png" alt=""/>
            </div>
            <div id='account-tab-list' className='account-content-list'>
              {this.state.accountInfoArray}
            </div>
          </div>
          {/* <div id='additional-tab' className='account-tab' onClick={(e) => this.handleAccountTabPress(e, 'additional-tab', 'additional-tab-title', 'additional-tab-list', 'additional-tab-arrow')}>
            <div id='additional-tab-title' className='account-tab-title'>
              Additional Information
              <img id='additional-tab-arrow' className='account-tab-title-arrow' src="/images/down-arrow-1.png" alt=""/>
            </div>
            <div id='additional-tab-list' className='account-content-list'>
              {this.state.additionalInfoArray}
            </div>
          </div> */}
        </div>
      </div>
    )
  }

}
