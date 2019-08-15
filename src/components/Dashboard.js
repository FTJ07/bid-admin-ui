import React from 'react';
import { Route, Switch, Link, withRouter } from 'react-router-dom';
import ProductEntry from './ProductEntry';
import ProductActive from './ProductActive';
import AuthHOC from '../components/auth/AuthHOC';

 

class Dashboard extends React.Component {
  signOutUser(){
      localStorage.removeItem('ad-token');
      this.props.history.push('/');
  }
  render(){
        return (
          <div className="row">
            <div className="col s3" style={{height:'100vh',boxShadow: '1px 0 0 rgba(0, 0, 0, .1)',zIndex: 100}}>

              <ul id="slide-out" className="side-nav fixed">
                <li>
                  <div className="userView">
                    <img className="background" src="https://smartlaunder.com/static/assets/img/brand.svg" />

                  </div>
                </li>
         
                <li><Link className="waves-effect" to="/dashboard/product-entry">Product Entry</Link></li>
                <li><Link className="waves-effect" to="/dashboard/product-active">Product Active</Link></li>
                <li><Link className="waves-effect" onClick={this.signOutUser.bind(this)} to="#">Log out</Link></li>
              </ul>
            </div>
            <div className="col s9">
              
              <Switch>
                <Route exact path='/dashboard/product-entry' component={AuthHOC(ProductEntry)} />
                <Route path='/dashboard/product-active' component={AuthHOC(ProductActive)} />
              </Switch>
            </div>


          </div>
        )
  }
 
}

export default withRouter(Dashboard);
