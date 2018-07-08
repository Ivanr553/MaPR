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

  }

  async componentDidMount() {

  }

  render() {

    return(
      <div id='Account'>
        <div className='documents-header'>Account Information</div>
        <div id='account-content-container'>
          <div className='account-info'>First Name: {this.state.user.first_name}</div>
        </div>
      </div>
    )
  }

}
