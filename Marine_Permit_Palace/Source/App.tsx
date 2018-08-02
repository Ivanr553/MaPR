import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Route, Switch, BrowserRouter } from 'react-router-dom'

import Home from './components/Home/Home'
import Register from './components/Register/Register'
import Login from './components/Login/Login'

import './style.sass'

export default class App extends React.Component<any, any> {
    render() {
        return(
            <div id='App'>
                <BrowserRouter>
                    <Switch>
                        <Route path='/A/App' exact component={Login}/>
                        <Route path='/A/App/Register' exact component={Register} />
                        <Route path='/A/App/Home' exact component={Home} />
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