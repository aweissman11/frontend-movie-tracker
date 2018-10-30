import React, { Component } from 'react';
import { connect } from 'react-redux';
import { logUserOut, setFavorites } from '../../actions'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types';

export class LogButton extends Component {
  
  logOutUser = () => {
    this.props.logOut();
    this.props.removeFavorites();
    localStorage.removeItem('userInfo') 
  };
  
  render() {
    return (
      <NavLink to='/login'>
      {this.props.user.id && 
       <button 
        onClick={() => this.logOutUser()}
        className='login-logout-btn'
        aria-label='logout'
      >log out</button> 
      }
      {!this.props.user.id && 
        <button
          className='login-logout-btn'
          aria-label='login'
        >login</button>
      }
      </NavLink>
    )
  }
};

export const mapStateToProps = (state) => ({
  user: state.user
});

export const mapDispatchToProps = (dispatch) => ({
  logOut: () => dispatch(logUserOut()),
  removeFavorites: () => dispatch(setFavorites())
});

LogButton.propTypes = {
  user: PropTypes.object,
  logOut: PropTypes.func,
  removeFavorites: PropTypes.func
};

export default connect(mapStateToProps, mapDispatchToProps)(LogButton)