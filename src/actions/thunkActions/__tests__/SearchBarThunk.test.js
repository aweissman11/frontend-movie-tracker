/* eslint-disable */
import { getMovieList } from '../SearchBarThunk'
import { isLoading, setHasErrored, setMovieList, setIsOk } from '../../index'

describe('SearchBarThunk', () => {
  let mockDispatch
  let filterProperties
  let searchQuery

  beforeEach(() => {
    mockDispatch = jest.fn()
    filterProperties = {
      genre: null, 
      year: null, 
      sort: null,
      rating: null
    }
    searchQuery = ''
  })

  it('calls dispatch with isLoading(true)', () => {
    const thunk = getMovieList(filterProperties, searchQuery)
    
    thunk(mockDispatch)

    expect(mockDispatch).toHaveBeenCalledWith(isLoading(true))
  })


it('should dispatch Error if the response is not ok', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: false
    }))

    const thunk = getMovieList(filterProperties, searchQuery)

    await thunk(mockDispatch)

    expect(mockDispatch).toHaveBeenCalledWith(setIsOk(true))
  })

it('should dispatch isLoading(false) if the response is ok', async () => {

  const mockDispatch = jest.fn()

    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
        movies: []
      })
    }))

    const thunk = getMovieList(filterProperties, searchQuery)

    await thunk(mockDispatch)

    expect(mockDispatch).toHaveBeenCalledWith(isLoading(false))
  })

  it('should dispatch getMovieList if the response is ok', async () => {
    const movies = [{title: 'Back To The Future'}]
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve(movies)
    }))
    const thunk = getMovieList(filterProperties, searchQuery)

    await thunk(mockDispatch)

    expect(mockDispatch).toHaveBeenCalledWith(setMovieList(movies))
  })
})
