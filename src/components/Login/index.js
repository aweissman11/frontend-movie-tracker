import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import LoginForm from '../LoginForm';
import SignUpForm from '../SignUpForm';
import Logo from '../Logo';
import { connect } from 'react-redux';

import './Login.css'

export class Login extends Component {
  constructor() {
    super()
    this.state = {
    }
  }

  render() {
    if (this.props.user.id) {
      return (<Redirect to='/release-date' />)
    } else {
      return (
        <main className='login-page'>
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
          <footer className='login-copyright'>
            <p>© 2018 movieTracker</p>
          </footer>
        </main>
      )
    }
  }
}

const mapStateToProps = (state) => ({
  user: state.user
})

export default connect(mapStateToProps, null)(Login);