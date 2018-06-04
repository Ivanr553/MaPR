import * as React from 'react'
import * as $ from 'jquery'

const s = require('./styling/style.sass')

export default class HomeView extends React.Component<any, any> {

    constructor(props) {
        super(props)
        this.state = {

        }
    }

    submitSearch() {
        console.log('search submitted')
    }

    render() {

        return(
            <div id='HomeView'>

                <div id='search-bar-container'>
                    <input id='home-view-search-bar' type="text"/>
                    <button onClick={this.submitSearch} >Search</button>
                </div>

            </div>
        )

    }


}