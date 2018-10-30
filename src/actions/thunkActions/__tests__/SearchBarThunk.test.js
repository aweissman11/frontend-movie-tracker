import { getMovieList } from '../SearchBarThunk'
import { isLoading, setHasErrored, setMovieList, setIsOk } from '../../index'

describe('FiltersThunk', () => {
  let mockSearchMovies
  let mockDispatch

  beforeEach(() => {
    mockSearchMovies = jest.fn()
    mockDispatch = jest.fn()
  })

  it('calls dispatch with isLoading(true)', () => {
    const thunk = getMovieList(mockSearchMovies)
    
    thunk(mockDispatch)

    expect(mockDispatch).toHaveBeenCalledWith(isLoading(true))
  })


it('should dispatch Error if the response is not ok', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: false
    }))

    const thunk = getMovieList(mockSearchMovies)

    await thunk(mockDispatch)

    expect(mockDispatch).toHaveBeenCalledWith(setHasErrored(true))
  })

it.skip('should dispatch isLoading(false) if the response is ok', async () => {

  const mockDispatch = jest.fn().mockImplementation(() => {
    return { "isLoading": false, "type": "IS_LOADING"}
  })

  console.log(mockDispatch)

    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true
    }))

    const thunk = getMovieList(mockSearchMovies)

    await thunk(mockDispatch)

    expect(mockDispatch).toHaveBeenCalledWith(isLoading(false))
  })

})
