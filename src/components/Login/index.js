import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserLoggedIn } from '../../actions';
import LoginForm from '../LoginForm';
import SignUpForm from '../SignUpForm';

import * as userDatabaseFetch from '../../utilities/userDatabaseFetch';

export class Login extends Component {
  constructor() {
    super()
    this.state = {
      newUserInputsVisible: false,
    }
  }
  
  showNewUserInputs = (e) => {
    e.preventDefault();
    this.setState({ newUserInputsVisible: !this.state.newUserInputsVisible })
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

const mapStateToProps = (state) => ({
  user: state.user 
})

const mapDispatchToProps = (dispatch) => ({
  logUserIn: (id, name) => dispatch(getUserLoggedIn(id, name))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)