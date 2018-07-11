import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Route, Switch, BrowserRouter } from 'react-router-dom'

import Home from './components/Home/Home'
import Account from './components/Account/Account'
// import Studio from './components/studio/Studio'
import Register from './components/Register/Register'
import Login from './components/Login/Login'
import DocumentView from './components/DocumentView/DocumentView'

const s = require('./style.sass')

export default class App extends React.Component<any, any> {

    render() {
        if (module['hot']) { module['hot'].accept(); }
        return(
            <div id='App'>
                <BrowserRouter>
                    <Switch>
                        <Route path='/A/App' exact component={Login} />
                        <Route path='/A/App/Account' exact component={Account} />
                        {/* <Route path='/A/Studio' exact component={Studio} /> */}
                        <Route path='/A/App/Register' exact component={Register} />
                        <Route path='/A/App/Home' exact component={Home} />
                        <Route path='/A/App/DocumentView' exact component={DocumentView} />
                    </Switch>
                </BrowserRouter>
            </div>
        )
    }

}

ReactDOM.render(
    
    <App />,
    document.getElementById('react-app')
)