import React from 'react';
import { connect } from 'react-redux';
import { logUserOut } from '../../actions'
import { NavLink } from 'react-router-dom'

const LogButton = (props) => {
  return (
    <NavLink to='/login'>
    {props.user.name && 
     <button onClick={props.logOut()}>Log out</button> 
    }
    {!props.user.name && 
      <button>Login</button>
    }
    </NavLink>
  )
}

const mapStateToProps = (state) => ({
  user: state.user
})

const mapDispatchToProps = (dispatch) => ({
  logOut: () => dispatch(logUserOut()) 
})

export default connect(mapStateToProps, mapDispatchToProps)(LogButton)