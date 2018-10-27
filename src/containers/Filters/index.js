import React, { Component } from 'react';
import connect from 'react-redux';

export class Filters extends Component {
  constructor() {
    super()
    this.state = {
      genre: null,
      year: null,
      rating: null,
      sort: null
    }
  }

  getGenreOptions = () => {
    const genres = [
      {
        "id": 28,
        "name": "Action"
      },
      {
        "id": 12,
        "name": "Adventure"
      },
      {
        "id": 16,
        "name": "Animation"
      },
      {
        "id": 35,
        "name": "Comedy"
      },
      {
        "id": 80,
        "name": "Crime"
      },
      {
        "id": 99,
        "name": "Documentary"
      },
      {
        "id": 18,
        "name": "Drama"
      },
      {
        "id": 10751,
        "name": "Family"
      },
      {
        "id": 14,
        "name": "Fantasy"
      },
      {
        "id": 36,
        "name": "History"
      },
      {
        "id": 27,
        "name": "Horror"
      },
      {
        "id": 10402,
        "name": "Music"
      },
      {
        "id": 9648,
        "name": "Mystery"
      },
      {
        "id": 10749,
        "name": "Romance"
      },
      {
        "id": 878,
        "name": "Science Fiction"
      },
      {
        "id": 10770,
        "name": "TV Movie"
      },
      {
        "id": 53,
        "name": "Thriller"
      },
      {
        "id": 10752,
        "name": "War"
      },
      {
        "id": 37,
        "name": "Western"
      }
    ]
    
    return genres.map( genre => {
      return (<option value={genre.id} name={genre.name}>{genre.name}</option>)
    })
  }
  
  getYearOptions = () => {
    let years = [];
    for (let i = 1; i < 50; i++) {
      years.push(2018 - i)
    }
    return years.map( year => {
      return (<option value={year} name={year}>{year}</option>)
    })
  }
  
  getRatingOptions = () => {
    const ratings = [
      {
        "certification": "G",
        "meaning": "All ages admitted. There is no content that would be objectionable to most parents. This is one of only two ratings dating back to 1968 that still exists today.",
        "order": 1
      },
      {
        "certification": "PG-13",
        "meaning": "Some material may be inappropriate for children under 13. Films given this rating may contain sexual content, brief or partial nudity, some strong language and innuendo, humor, mature themes, political themes, terror and/or intense action violence. However, bloodshed is rarely present. This is the minimum rating at which drug content is present.",
        "order": 3
      },
      {
        "certification": "R",
        "meaning": "Under 17 requires accompanying parent or adult guardian 21 or older. The parent/guardian is required to stay with the child under 17 through the entire movie, even if the parent gives the child/teenager permission to see the film alone. These films may contain strong profanity, graphic sexuality, nudity, strong violence, horror, gore, and strong drug use. A movie rated R for profanity often has more severe or frequent language than the PG-13 rating would permit. An R-rated movie may have more blood, gore, drug use, nudity, or graphic sexuality than a PG-13 movie would admit.",
        "order": 4
      },
      {
        "certification": "NC-17",
        "meaning": "These films contain excessive graphic violence, intense or explicit sex, depraved, abhorrent behavior, explicit drug abuse, strong language, explicit nudity, or any other elements which, at present, most parents would consider too strong and therefore off-limits for viewing by their children and teens. NC-17 does not necessarily mean obscene or pornographic in the oft-accepted or legal meaning of those words.",
        "order": 5
      },
      {
        "certification": "NR",
        "meaning": "No rating information.",
        "order": 0
      },
      {
        "certification": "PG",
        "meaning": "Some material may not be suitable for children under 10. These films may contain some mild language, crude/suggestive humor, scary moments and/or violence. No drug content is present. There are a few exceptions to this rule. A few racial insults may also be heard.",
        "order": 2
      }
    ]
    
    return ratings.map( rating => {
      return (<option value={rating.certification} name={rating.certification}>{rating.certification}</option>)
    })

  }

  getSortOptions = () => {
    const sortOptions = [
      {

      }
    ]


    // most popular - popularity.asc
    // least popular - popularity.desc
    // recently released - release_date.asc
    // oldest - release_date.desc
    // highest grossing - revenue.desc
    // lowest grossing - revenue.asc
    // title A to Z - original_title.desc
    // title Z to A - original_title.asc
    
    // default: popularity.desc     
  }

  handleSelect = (e) => {
    e.preventDefault();
    console.log(e.target.value)
  }

  handleSubmitFilters = (e) => {
    e.preventDefault();
    console.log('e.target.querySelector(".genre-slct"):', e.target.querySelector(".genre-slct"));
  }

  render() {
    return (
      <form onSubmit={this.handleSubmitFilters}>
        <h1>Filters</h1>
        <select onChange={this.handleSelect} className='genre-slct'>
          {this.getGenreOptions()}
        </select>
        <select onChange={this.handleSelect} className='year-slct'>
          {this.getYearOptions()}
        </select>
        <select onChange={this.handleSelect} className='rating-slct'>
          {this.getRatingOptions()}
        </select>
        <a>Sort by:</a>
        <select onChange={this.handleSelect} className='sort-by-slct'>
          {this.getSortOptions()}
        </select>
        <input type='submit' />
      </form>
    )
  }
}

export default Filters;