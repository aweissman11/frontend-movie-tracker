import { getMovieList } from '../FiltersThunk'
import { isLoading, setHasErrored, setMovieList, setIsOk } from '../../index'

describe('FiltersThunk', () => {
  let mockFilter
  let mockDispatch

  beforeEach(() => {
    mockFilter = jest.fn()
    mockDispatch = jest.fn()
  })

  it('calls dispatch with isLoading(true)', () => {
    const thunk = getMovieList(mockFilter)
    
    thunk(mockDispatch)

    expect(mockDispatch).toHaveBeenCalledWith(isLoading(true))
  })


it('should dispatch Error if the response is not ok', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: false
    }))

    mockDispatch = jest.fn().mockImplementation(() => {
      return {"movies": "failed", "type": "SET_MOVIE_LIST"}
    })

    const thunk = getMovieList(mockFilter)

    await thunk(mockDispatch)

    expect(mockDispatch).toHaveBeenCalledWith(setIsOk(true))
  })

it('should dispatch Error(false) if the response is ok', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true
    }))

    mockDispatch = jest.fn().mockImplementation(() => {
      return {"movies": {title: 'Mean Girls'}, "type": "SET_MOVIE_LIST"}
    })

    const thunk = getMovieList(mockFilter)

     await thunk(mockDispatch)

    expect(mockDispatch).toHaveBeenCalledWith(setHasErrored(true))
  })


it.skip('should dispatch setMovieList', async () => {
    const mockMovies = [{title: 'Mean Girls'}, {title: 'Back to the future'}]

    mockDispatch = jest.fn().mockImplementation(() => {
      return mockMovies
    })

    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      }))

    const thunk = getMovieList(mockFilter)

    await thunk(mockDispatch)

    expect(mockDispatch).toHaveBeenCalledWith(setMovieList(mockMovies))
  })
})
