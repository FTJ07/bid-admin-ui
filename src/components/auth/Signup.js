import React from 'react';
import axios from 'axios';
import { ROOT_URL } from "../../env";
import { Link } from 'react-router-dom';


class SingUp extends React.Component{
    state={
        error:false,
        message:''
    }


    handleFormSubmit(event){
        event.preventDefault();
        const name = event.target.name.value;
        const userName = event.target.username.value;
        const userPassword = event.target.password.value;
        
        event.target.name.value = "";
        event.target.username.value = "";
        event.target.password.value= "";

        axios.post(`${ROOT_URL}api/signup`,{name,userName,userPassword,"userType":1})
        .then((response)=>{
            this.setState({message:"Successfully inserted",error:false})
        })
        .catch((err)=>{

            this.setState ({message:err.response.data.message,error:true})
        });


    }

    render(){
        return (
            <center>
            <h5 className="indigo-text">Admin! Registration</h5>
            <div className="section"></div>

            <div className="container">
                <div className="z-depth-1 grey lighten-4 row">

                    <form  onSubmit={this.handleFormSubmit.bind(this)} className="col s12" method="post">
                      <div className='row'>
                            <div className='input-field col s12'>
                                <input placeholder="Name" className='validate' type='text' name='name' id='name' required/>
                            </div>
                        </div>

                        <div className='row'>
                            <div className='input-field col s12'>
                                <input  placeholder="User Name" className='validate' type='text' name='username' id='username' required/>
                            </div>
                        </div>

                        <div className='row'>
                            <div className='input-field col s12'>
                                <input  placeholder="User Password" className='validate' type='password' name='password' id='password' required/>                     
                            </div>
                        </div>

                        <br />
                        <center>
                            <div className='row'>
                                <button type='submit' name='btn_login' className='col s12 btn btn-large waves-effect indigo'>Sign Up</button>
                            </div>
                        </center>
                    </form>
                </div>
            </div>
            <div>{this.state.message}</div>
            <Link to="/">Already Registered!! Login </Link>
        </center>

        )
    }
}
export default SingUp;