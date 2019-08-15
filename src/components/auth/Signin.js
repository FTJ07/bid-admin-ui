import React from 'react';
import { connect } from 'react-redux';
import {siginUser} from '../../actions/authAction';
import { Link , withRouter } from 'react-router-dom';

class SignIn extends React.Component{
    handleFormSubmit(event){
        event.preventDefault();
        const userName = event.target.username.value;
        const userPassword = event.target.password.value;
        this.props.siginUser(userName,userPassword,this.props.history);
    }

    renderAlert(){
        if(this.props.auth.error){
            return (
                <div>
                       <strong>User Name password doesnt match </strong>
                </div>
            )
        }
  
    }

    render(){
    
        return (      
            <center>
            <h5 className="indigo-text">Admin Panel</h5>
            <div className="section"></div>

            <div className="container">
                <div className="z-depth-1 grey lighten-4 row">

                    <form onSubmit={this.handleFormSubmit.bind(this)} className="col s12" method="post">
                        <div className='row'>
                            <div className='col s12'>
                            </div>
                        </div>

                        <div className='row'>
                            <div className='input-field col s12'>
                                <input className='validate' placeholder="User Name" type='text' name='username' id='username' />           
                            </div>
                        </div>

                        <div className='row'>
                            <div className='input-field col s12'>
                                <input className='validate' type='password' placeholder="User Password" name='password' id='password' />
                            </div>
                        </div>

                        <br />
                        <center>
                            <div className='row'>
                                <button type='submit' name='btn_login' className='col s12 btn btn-large waves-effect indigo'>Login</button>
                            </div>
                        </center>
                    </form>
                </div>
            </div>
            {this.renderAlert()}
            <Link to="/signup">Create account</Link>
        </center>
        )
    }
}

const mapStateToProps = (state)=>{
    return {
        auth: state.auth
    }
}

export default withRouter(connect(mapStateToProps,{siginUser})(SignIn));