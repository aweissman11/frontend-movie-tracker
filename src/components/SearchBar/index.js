import React, { Component } from 'react';

import './SearchBar.css';

class SearchBar extends Component {
  constructor() {
    super()

    this.state = {
      searchInput: ''
    }

  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  render() {
    return(
      <form 
        className='search-form'
        onSubmit={() => {}}
      >
        <input 
          className='search-input'
          value={this.state.searchInput}
          name='searchInput'
          onChange={(e) => this.handleChange(e)}
          placeholder='movie/genre search'
        />
        <input 
          className='search-submit'
          type='submit'
          value=''
        ></input>
      </form>
    )
  }

}

export default SearchBar;