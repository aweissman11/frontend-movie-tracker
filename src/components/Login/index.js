import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserLoggedIn } from '../../actions'

import * as userDatabaseFetch from '../../utilities/userDatabaseFetch';

export class Login extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      newUserInputsVisible: false,
      loginError: '',
      signUpError: '',
    }
  }
  
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  removeWarning = () => {
    this.setState({
      loginError: '',
      signUpError: ''
    })
  }

  newUserWarning = () => {
    this.setState({
      signUpError: 'sign-up-error-active'
    })
    setTimeOut(this.removeWarning(), 5000)
    console.log('email has already been used')
  }

  userNamePassWordWarning = () => {
    this.setState({
      loginError: 'login-error-active'
    })
    setTimeOut(this.removeWarning(), 5000)
    console.log('username and password do not match')
  }
  
  submitLogin = async (e) => {
    e.preventDefault();

    const { email, password } = this.state;

    try {
      const response = await userDatabaseFetch.checkUserList({ email, password })

      await this.props.logUserIn(response.data.id, response.data.name)
      console.log(response)
    } catch(error) {
      console.log(error)
      this.userNamePassWordWarning()
    }
    this.setState({
      email: '',
      password: ''
    })
  }

  showNewUserInputs = (e) => {
    e.preventDefault();
    this.setState({ newUserInputsVisible: !this.state.newUserInputsVisible })
  }

  createNewUser = async (e) => {
    e.preventDefault();
    const { name, email, password } = this.state;

    try {
      const response = await userDatabaseFetch.createNewUser({ name, email, password })
      console.log(response)
      if (response.error) {
        this.newUserWarning()
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
        <form onSubmit={this.submitLogin} className='login-page'>
          <h1>Movie Tracker</h1>
          <input
            className='name-input'
            onChange={this.handleChange}
            value={this.state.name}
            name='name'
            placeholder='What is your Name?'
            /> 
          <input
            className='email-input'
            onChange={this.handleChange}
            value={this.state.email}
            name='email'
            placeholder='email'
            ></input>
          <input
            className='password-input'
            onChange={this.handleChange}
            type='password'
            value={this.state.password}
            name='password'
            placeholder='password'
          ></input>
          <input
            className='password-confirm-input'
            onChange={this.handleChange}
            type='password'
            value={this.state.confirmPassword}
            name='confirmPassword'
            placeholder='confirm password'
          ></input> 
          <button
            className='create-user-btn'
            onClick={this.createNewUser}
          >
            Submit new user
          </button>
          <input
            className='login-submit'
            type='submit'
            value='Login'
          ></input>
          <button>Create new user</button>
          <Link to='/release-date'>
            <button>Skip login</button>
          </Link>
          <Link to='/login'>
            <button>Already a user</button>
          </Link>
        </form>
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