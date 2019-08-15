import React from 'react';
import { connect } from 'react-redux';


const AuthHOC = (ComposedComponent)=>{

    class Authentication extends React.Component{

        componentWillMount(){
            if(!localStorage.getItem('ad-token'))this.props.history.push('/')
            if(!this.props.authenticated) this.props.history.push('/')
        }

        render(){
            return <ComposedComponent/>
        }

    }

    const mapStateToProps = (state)=>{
        return {
            authenticated: state.auth.authenticated
        }
    }
    return connect(mapStateToProps)(Authentication)
}

export default AuthHOC;