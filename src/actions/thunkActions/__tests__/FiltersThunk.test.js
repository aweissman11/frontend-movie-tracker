/* eslint-disable */
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
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve('failed'))

    mockDispatch = jest.fn().mockImplementation(() => {
      return 'failed'
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
})
