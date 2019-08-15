import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import SignIn from './components/auth/Signin';
import SignUp from './components/auth/Signup';
import Dashboard from './components/Dashboard';
import Notfound from './components/Notfound';
import AuthHOC from './components/auth/AuthHOC';


class App extends React.Component{
    render(){
        return (
          <BrowserRouter> 
            <Switch>
                <Route path='/' exact component={SignIn} />
                <Route path='/signup' exact component={SignUp} />
                <Route path='/dashboard'  component={AuthHOC(Dashboard)} />
                <Route component={Notfound} />
            </Switch>
          </BrowserRouter>

        )
    }
}
export default App;