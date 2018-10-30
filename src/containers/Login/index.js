import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import LoginForm from '../LoginForm';
import SignUpForm from '../SignUpForm';
import Logo from '../../components/Logo';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import './Login.css'

export class Login extends Component {
  constructor() {
    super()
    this.state = {
    }
  };

  render() {
    if (this.props.user.id) {
      return (<Redirect to='/movies' />)
    } else {
      return (
        <main className='login-page' aria-label='login-page'>
          <div className='right-side'></div>
          <Logo />
          <section className='login-signup-wrapper'>
            <LoginForm />
            <SignUpForm />
          </section>
          <footer className='login-footer'>
            <p>about</p>
            <p>terms</p>
            <p>privacy</p>
          </footer>
          <footer className='login-copyright' aria-label='copyright'>
            <p>© 2018 movieTracker</p>
          </footer>
        </main>
      )
    }
  }
};

export const mapStateToProps = (state) => ({
  user: state.user
});

export default connect(mapStateToProps, null)(Login);

Login.propTypes = {
  user: PropTypes.object,
};