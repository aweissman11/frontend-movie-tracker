import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserLoggedIn } from '../../actions'
import { displayLogin } from '../../actions';

import Logo from '../../components/Logo'

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
      newUserInputsVisible: false,
      signUpError: '',
      userDatabaseFetch: userDatabaseFetch
    }
  }
  
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  removeWarning = () => {
    this.setState({
      signUpError: ''
    })
  }

  userWarning = async (type, warning) => {
    await this.setState({
      [type]: warning
    })
    await setTimeout(this.removeWarning, 5000)
    console.log(warning)
  }

  showNewUserInputs = (e) => {
    e.preventDefault();
    this.setState({ newUserInputsVisible: !this.state.newUserInputsVisible })
  }

  createNewUser = async (e) => {
    e.preventDefault();
    const { name, email, password } = this.state;

    try {
      const response = await this.state.userDatabaseFetch.createNewUser({ name, email, password })
      if (response.error) {
        this.userWarning('signUpError', 'sign-up-error-active')
      }
    } catch(error) {
      console.log(error.message)
    }

    // this is where we need to navigate the user to the MovieList page
    // I think our default could be by release-date, so we could navigate them there
    this.setState({ newUserInputsVisible: false })
  }

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
            className='password-confirm-input'
            onChange={this.handleChange}
            type='password'
            value={this.state.confirmPassword}
            name='confirmPassword'
            placeholder='confirm password'
          ></input> 
          <input
            className='create-user-btn'
            type='submit'
            value='sign up'
          ></input>
          <Link 
            className='skip-sign-up'
            to='/login'
          >
            <button 
              className='skip-sign-up-button'
              onClick={this.props.displayLogin}>already a user</button>
          </Link>
          <div className={`signup-error-wrapper ${this.state.signUpError}`}>
            <p>email address already registered</p>
          </div>
        </form>
      )
    }
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  showSignup: state.showSignup
})

const mapDispatchToProps = (dispatch) => ({
  logUserIn: (id, name) => dispatch(getUserLoggedIn(id, name)),
  displayLogin: () => dispatch(displayLogin())
})

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm)