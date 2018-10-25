import React, { Component } from 'react';
import * as backEndFetches from '../../utilities/userDatabaseFetch';

class Login extends Component {
  constructor() {
    super()
    this.state = {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      newUserInputsVisible: false
    }
  }
  
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }
  
  handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = this.state;

    try {
      const response = await backEndFetches.checkUserList({ email, password })
      console.log(response)
    } catch(error) {
      console.log(error)
    }
    this.setState({
      email: '',
      password: ''
    })
  }

  showNewUserInputs = (e) => {
    e.preventDefault();
    this.setState({ newUserInputsVisible: true})
  }

  createNewUser = async (e) => {
    e.preventDefault();
    const { name, email, password } = this.state;

    try {
      const response = await backEndFetches.createNewUser({ name, email, password })
      console.log(response)
    } catch(error) {
      console.log(error)
    }

    this.setState({ newUserInputsVisible: false })
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit} className='login-page'>
        <h1>Movie Tracker</h1>
        {
          this.state.newUserInputsVisible ?
          <input
            onChange={this.handleChange}
            value={this.state.name}
            name='name'
            placeholder='What is your Name?'
          /> :
          <div></div>
        }
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
        {
          this.state.newUserInputsVisible ?
          <div>
            <input
              onChange={this.handleChange}
              type='password'
              value={this.state.confirmPassword}
              name='confirmPassword'
              placeholder='confirm password'
            ></input> 
            <button onClick={this.createNewUser}>Create new user</button>
          </div> :
          <div></div>
        }
        <input type='submit' value='Login'></input>
        <button onClick={this.showNewUserInputs}>Not a user?</button>
      </form>
    )
  }
}

export default Login;