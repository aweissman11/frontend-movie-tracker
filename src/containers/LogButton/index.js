import React from 'react';
import { connect } from 'react-redux';
import { logUserOut } from '../../actions'
import { NavLink } from 'react-router-dom'

export const LogButton = (props) => {
  
  const logOutUser = () => {
    props.logOut();
    localStorage.removeItem('userInfo') 
  }
  
  return (
    <NavLink to='/login'>
    {props.user.id && 
     <button onClick={() => logOutUser()}>Log out</button> 
    }
    {!props.user.id && 
      <button>Login</button>
    }
    </NavLink>
  )
}

export const mapStateToProps = (state) => ({
  user: state.user
})

export const mapDispatchToProps = (dispatch) => ({
  logOut: () => dispatch(logUserOut()) 
})

export default connect(mapStateToProps, mapDispatchToProps)(LogButton)