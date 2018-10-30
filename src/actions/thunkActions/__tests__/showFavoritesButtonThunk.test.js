/* eslint-disable */
import { getMovieList } from '../FiltersThunk'
import { isLoading, setHasErrored, setMovieList, setIsOk } from '../../index'

describe('showFavorites', () => {
  const mockFavoriteInfo = [23, 45]
  let mockDispatch

  beforeEach(() => {
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
    const thunk = getMovieList(mockFavoriteInfo)

    await thunk(mockDispatch)

    expect(mockDispatch).toHaveBeenCalledWith(setIsOk(true))
  })

    it('should dispatch isLoading(false) if the response is ok', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve({
        movies: []
      })
    }))
    const thunk = getMovieList(mockFavoriteInfo)
    await thunk(mockDispatch)
    expect(mockDispatch).toHaveBeenCalledWith(isLoading(false))
  })

  it('should dispatch Error if the response is not ok', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve('failed'))
    mockDispatch = jest.fn().mockImplementation(() => {
      return 'failed'
    })
    const thunk = getMovieList(mockFavoriteInfo)
    await thunk(mockDispatch)
    expect(mockDispatch).toHaveBeenCalledWith(setIsOk(true))
  })
})