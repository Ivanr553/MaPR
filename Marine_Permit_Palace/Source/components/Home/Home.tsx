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
      documentList: []
    }

    this.getUser = this.getUser.bind(this)
    this.getCurrentUser = this.getCurrentUser.bind(this)
    this.getCurrentView = this.getCurrentView.bind(this)
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

        <div className='documents-container'>
          {this.state.currentView}
        </div>

      </div>
    )
  }

}
