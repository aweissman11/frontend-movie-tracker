import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getUserLoggedIn } from '../../actions'
import { displaySignUp } from '../../actions';

import Logo from '../../components/Logo';

import './LoginForm.css'

import * as userDatabaseFetch from '../../utilities/userDatabaseFetch';

export class LoginForm extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: '',
      loginError: '',
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
      loginError: '',
    })
  }

  userWarning = async (type, warning) => {
    await this.setState({
      [type]: warning
    })
    await setTimeout(this.removeWarning, 5000)
  }

  submitLogin = async (e) => {
    e.preventDefault();

    const { email, password } = this.state;

    try {
      const response = await this.state.userDatabaseFetch.checkUserList({ email, password })

      await this.props.logUserIn(response.data.id, response.data.name)

    } catch(error) {
      this.userWarning('loginError', 'login-error-active')
    }
  }

  render() {
    return (
      <form onSubmit={(e) => {this.submitLogin(e)}} className={`login-form ${this.props.showLogin}`}>
        <h1><span>movie</span>Tracker</h1>
        <h4>for the love of film</h4>
        <div className='login-form-logo-wrapper'>
          <Logo />
        </div>
        <input
          className='email-input'
          onChange={this.handleChange}
          value={this.state.email}
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
        <input
          className='login-submit'
          type='submit'
          value='login'
        ></input>
        <button 
          onClick={(e) => {
            e.preventDefault()
            this.props.displaySignUp()
          }}
          className='sign-up-button'
          name='sign-up-button'
        >
          signup
        </button>
        <section className='login-social-wrapper'>
          <i className="fab fa-facebook login-social"></i>
          <i className="fab fa-twitter login-social"></i>
        </section>
        <Link to='/release-date'>
          <button className='skip-login'>skip login</button>
        </Link>
        <div className={`login-error-wrapper ${this.state.loginError}`}>
          <p className='login-error-text'>incorrect email/password combination</p>
        </div>
      </form>
    )
  }
}

export const mapStateToProps = (state) => ({
  user: state.user,
  showLogin: state.showLogin
})

export const mapDispatchToProps = (dispatch) => ({
  logUserIn: (id, name) => dispatch(getUserLoggedIn(id, name)),
  displaySignUp: () => dispatch(displaySignUp())
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)