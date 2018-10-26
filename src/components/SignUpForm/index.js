import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserLoggedIn } from '../../actions'
import { displayLogin } from '../../actions';

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
      const response = await userDatabaseFetch.createNewUser({ name, email, password })
      console.log(response)
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
          <input
            className='create-user-btn'
            type='submit'
            value='Sign Up'
          ></input>
          <Link to='/login'>
            <button onClick={this.props.displayLogin}>Already a user</button>
          </Link>
          <div className={`sign up ${this.state.signUpError}`}></div>
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