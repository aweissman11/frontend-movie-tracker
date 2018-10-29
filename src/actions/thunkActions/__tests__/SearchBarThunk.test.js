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


})
