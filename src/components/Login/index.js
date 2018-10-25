import React, { Component } from 'react';
import * as backEndFetches from '../../utilities/userDatabaseFetch';

class Login extends Component {
  constructor() {
    super()
    this.state = {
      email: '',
      password: ''
    }
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  handleSubmit = async(e) => {
    e.preventDefault();
    try {
      const response = await backEndFetches.checkUserList(this.state)
      console.log(response)
    } catch(error) {
      console.log(error)
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className='login-page'>
        <h1>Movie Tracker</h1>
        <input
          onChange={this.handleChange}
          value={this.state.email}
          name='email'
          placeholder='email'
        ></input>
        <input
          onChange={this.handleChange}
          type='password'
          value={this.state.password}
          name='password'
          placeholder='password'
        ></input>
        <input type='submit' value='Login'></input>
      </form>
    )
  }
}

export default Login;