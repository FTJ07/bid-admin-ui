import {AUTH_USER , UNAUTH_USER, AUTH_ERROR} from '../actions/types';

const initializeState = ()=>{
    const adminToken = localStorage.getItem('ad-token');
    if(adminToken) return {authenticated:true,token:adminToken}
    else return {};
}

const authReducer = (state=initializeState(), action)=>{

    switch (action.type) {
        case AUTH_USER:
                return {...state,authenticated:true,token:action.payload}

        case UNAUTH_USER:
            return {...state, authenticated: false }

        case AUTH_ERROR:
                return { ...state,error: action.payload }

        default:
            break;
    }
    return state;
}

export default authReducer