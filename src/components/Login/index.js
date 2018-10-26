import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import LoginForm from '../LoginForm';
import SignUpForm from '../SignUpForm';

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
        <main>
          <LoginForm />
          <SignUpForm />
        </main>
      )
    }
  }
}

export default Login;