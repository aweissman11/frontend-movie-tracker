import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { getUserLoggedIn, displayLogin, isLoading, setHasErrored } from '../../actions';
import { submitNewUser } from '../../actions/thunkActions/SignUpFormThunk';


import Logo from '../../components/Logo';

import './SignUpForm.css';

import * as userDatabaseFetch from '../../utilities/userDatabaseFetch';

export class SignUpForm extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      signUpError: '',
      userDatabaseFetch: userDatabaseFetch,
      activeErrorText: 'email address already registered'
    }
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  userWarning = async (warning) => {
    await this.setState({
      signUpError: 'sign-up-error-active',
      activeErrorText: warning
    });
    await setTimeout(this.removeWarning, 5000);
  };

  removeWarning = () => {
    this.setState({
      signUpError: ''
    })
  };

  createNewUser = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = this.state;
    if (!name.length) {
      this.userWarning('please enter a name');
      return;
    }
    if (!email.length) {
      this.userWarning('please enter a valid email');
      return;
    }
    if (password.length < 3) {
      this.userWarning('password must be at least 3 characters');
      return;
    }
    if (password !== confirmPassword) {
      this.userWarning('passwords must match');
      return;
    } else {
      this.props.clearError();
      this.props.submitNewUser(name, email, password);
    }
  };

  render() {
    if (this.state.isLoggedIn) {
      return (<Redirect exact path='/release-date' />)
    } else {
      return (
        <form onSubmit={this.createNewUser} className={`sign-up-form ${this.props.showSignup}`}>
          <h1><span>movie</span>Tracker</h1>
          <h4>for the love of film</h4>
          <div className='login-form-logo-wrapper'>
            <Logo />
          </div>
          <input
            aria-label='name-input'
            className='name-input'
            onChange={this.handleChange}
            value={this.state.name}
            name='name'
            placeholder='name'
          />
          <img
            src='./user.png'
            alt='user'
            className='user-icon'
          />
          <input
            aria-label='email-input'
            className='email-input'
            onChange={this.handleChange}
            value={this.state.email}
            pattern="^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$"
            title='Enter a Valid Email Address'
            name='email'
            placeholder='email'
          ></input>
          <img
            src='./email.png'
            alt='mail'
            className='email-icon'
          />
          <input
            aria-label='password-input'
            className='password-input'
            onChange={this.handleChange}
            type='password'
            value={this.state.password}
            name='password'
            placeholder='password'
          ></input>
          <img
            src='./password.png'
            alt='lock'
            className='password-icon'
          />
          <img
            src='./password.png'
            alt='lock'
            className='password-confirm-icon'
          />
          <input
            aria-label='confirm-password-input'
            className='password-confirm-input'
            onChange={this.handleChange}
            type='password'
            value={this.state.confirmPassword}
            name='confirmPassword'
            placeholder='confirm password'
          ></input>
          <input
            aria-label='submit-new-user-info'
            className='create-user-btn'
            type='submit'
            value='sign up'
          ></input>
          <Link
            className='skip-sign-up'
            to='/login'
          >
            <button
              aria-label='back-to-login'
              className='skip-sign-up-button'
              onClick={this.props.displayLogin}>already a user</button>
          </Link>
          <div className={`signup-error-wrapper ${this.state.signUpError}`}>
            <p>{this.state.activeErrorText}</p>
          </div>
          <div className={`email-in-use-error ${this.props.error}`}>
            <p>there is already an account linked to this email</p>
          </div>
        </form>
      )
    }
  }
};

const mapStateToProps = (state) => ({
  user: state.user,
  showSignup: state.showSignup,
  error: state.hasErrored
});

const mapDispatchToProps = (dispatch) => ({
  logUserIn: (id, name) => dispatch(getUserLoggedIn(id, name)),
  displayLogin: () => dispatch(displayLogin()),
  setIsLoading: (bool) => dispatch(isLoading(bool)),
  submitNewUser: (name, email, password) => dispatch(submitNewUser(name, email, password)),
  clearError: () => dispatch(setHasErrored(false))
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);

SignUpForm.propTypes = {
  user: PropTypes.object,
  showSignup: PropTypes.string,
  logUserIn: PropTypes.func,
  displayLogin: PropTypes.func
};