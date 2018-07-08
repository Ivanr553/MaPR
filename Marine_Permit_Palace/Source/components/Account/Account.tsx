import * as React from 'react'
import { RouteComponentProps } from 'react-router'

const s = require('./styling/style.sass')

import Header from '../Header/Header'
import TextInput from '../TextInput/TextInput'

interface Props extends RouteComponentProps<any> {}
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
        }
      },
      currentView: '',
      personalInfoArray: []
    }

  }

  generatePersonalInfo = () => {

    let personalInfo = this.state.user.personalInfo
    let personalInfoArray = this.state.personalInfoArray

    for(let item in personalInfo) {

      let itemDescription = item
      while(itemDescription.includes('_')) {
        itemDescription = itemDescription.replace('_', ' ')
      }

      let component = (
        <div className='account-content-line'>
          <div className='account-info-description'>{itemDescription}:</div>
          <TextInput position='block' width={'auto'} border={'solid 2px lightgrey'} height={null} left={null} top={null} value={personalInfo[item]} onChange={(e) => this.handleInputChange(e, item, 'personalInfo')}/>
        </div>
      )

      personalInfoArray.push(component)

    }

    this.setState({
      personalInfoArray: personalInfoArray
    })

  }

  handleInputChange = (e, id, array) => {

    let user = this.state.user
    user[array][id] = e.target.value

    this.setState({
      user: user
    })

  }

  componentWillMount() {
    this.generatePersonalInfo()
  }

  async componentDidMount() {

  }

  render() {

    return(
      <div id='Account'>
        <div className='documents-header'>Account Information</div>
        <div id='main-account-content-container'>
          <div className='account-content-container'>
            <div className='account-article-title'>Personal Information</div>
            {this.state.personalInfoArray}
          </div>
          <article className='account-content-container'>
            <div className='account-article-title'>Account Information</div>
            <div className='account-info'>First Name: {this.state.user.first_name}</div>
          </article>
          <article className='account-content-container'>
            <div className='account-article-title'>Additional Information</div>
            <div className='account-info'>First Name: {this.state.user.first_name}</div>
          </article>
        </div>
      </div>
    )
  }

}
