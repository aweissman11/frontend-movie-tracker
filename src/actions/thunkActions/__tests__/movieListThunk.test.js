/* eslint-disable */
import { getMovieList, updateFavorites } from '../movieListThunk'
import { isLoading, setHasErrored, setMovieList } from '../../index'

// jest.mock('../movieListThunk.js')

describe('getMovieList', () => {
  let mockDispatch
  let mockMovie 

  beforeEach(()=> {
    mockDispatch = jest.fn()
    mockMovie = jest.fn()
  })

it('calls dispatch with isLoading(true)', () => {
    const thunk = getMovieList(mockMovie)
    
    thunk(mockDispatch)

    expect(mockDispatch).toHaveBeenCalledWith(isLoading(true))
  })

  it.skip('should dispatch hasErrored(true) if the response is not ok', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: false
    }))

    const fakeMovies = {title: 'Back To The Future'}

    const thunk = getMovieList(null)

    await thunk(mockDispatch)

    expect(mockDispatch).toHaveBeenCalledWith(setHasErrored(true))
    expect(mockDispatch).not.toHaveBeenCalledWith(isLoading(false))
  })

  it('should dispatch getMovieList if the response is ok', async () => {
    const fakeMovies = {title: 'Back To The Future'}

    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
       json: () => Promise.resolve({
        title: 'Back To The Future'
      })
    }))

    const thunk = getMovieList()

    await thunk(mockDispatch)

    expect(mockDispatch).toHaveBeenCalledWith(setMovieList(fakeMovies))
  })
})

describe('updateFavorites', () => {
  let mockDispatch
  let mockfavs

  beforeEach(() => {
    mockDispatch = jest.fn()
    mockfavs = jest.fn()
  })

  it('should dispatch updateFavorites', async () => {
    const id = 67890
    const setFavorites = jest.fn().mockImplementation(() => {
      return {"favorites": {"title": "Back To The Future"}, "type": "SET_FAVORITES"}
  })

    const thunk = updateFavorites(id)
    await thunk(mockDispatch)

    expect(mockDispatch).toHaveBeenCalledWith(setFavorites())
  })

})