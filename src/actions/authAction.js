
import { ROOT_URL} from '../env';
import axios from 'axios';
import {AUTH_USER , UNAUTH_USER, AUTH_ERROR} from './types';

export  const siginUser = (userName, userPassword,history)=>{
   
    
    return function(dispatch){

        axios.post(`${ROOT_URL}api/signin`,{userName,userPassword,"userType":1})
        .then((response)=>{
            localStorage.setItem('ad-token', response.data.token);
            dispatch({type:AUTH_USER,payload:response.data.token})
            history.push('/dashboard/product-entry');
        })
        .catch((err)=>{
            dispatch({type:AUTH_ERROR, payload:err.message})
        })
    }

}

export const signoutUser = ()=>{
    localStorage.removeItem('ad-token');
    return {
        type:UNAUTH_USER
    }
}

