import { getMovieList } from '../FiltersThunk'
import { isLoading, setHasErrored, setMovieList, setIsOk } from '../../index'

describe('showFavorites', () => {
  let mockFavoriteInfo
  let mockDispatch

  beforeEach(() => {
    mockFavoriteInfo = jest.fn()
    mockDispatch = jest.fn()
  })

it('calls dispatch with isLoading(true)', () => {
    const thunk = getMovieList(mockFavoriteInfo)
    
    thunk(mockDispatch)

    expect(mockDispatch).toHaveBeenCalledWith(isLoading(true))
  })

  it('should dispatch hasErrored(true) if the response is not ok', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: false
    }))

    const movies = {title: 'mean girls'}

    // mockDispatch = jest.fn().mockImplementation(() => {
    //   return {"movies": "failed", "type": "SET_MOVIE_LIST"}
    // })

    const thunk = getMovieList(mockFavoriteInfo)

    await thunk(mockDispatch)

    expect(mockDispatch).toHaveBeenCalledWith(setIsOk(true))
  })

    it.skip('should dispatch isLoading(false) if the response is ok', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true
    }))

    const thunk = getMovieList(mockFavoriteInfo)
sh
    await thunk(mockDispatch)

    expect(mockDispatch).toHaveBeenCalledWith(isLoading(false))
  })

})