import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import LoginForm from '../LoginForm';
import SignUpForm from '../SignUpForm';
import Logo from '../Logo';

import './Login.css'

export class Login extends Component {
  constructor() {
    super()
    this.state = {
    }
  }

  render() {
    if (this.state.isLoggedIn) {
      return (<Redirect exact path='/release-date' />)
    } else {
      return (
        <main className='login-page'>
          <div className='right-side'></div>
          <Logo />
          <LoginForm />
          <SignUpForm />
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

export default Login;