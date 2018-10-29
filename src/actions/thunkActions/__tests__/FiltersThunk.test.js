import { getMovieList } from '../FiltersThunk'
import { isLoading, setHasErrored, setMovieList } from '../../index'

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
})