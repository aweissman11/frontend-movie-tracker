import { getMovieList } from '../movieListThunk'
import { isLoading, setHasErrored, setMovieList } from '../../index'

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

  it('should dispatch hasErrored(true) if the response is not ok', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: false
    }))

    // const fakeMovies = {title: 'Back To The Future'}

    const thunk = getMovieList(mockMovie)

    await thunk(mockDispatch)

    expect(mockDispatch).toHaveBeenCalledWith(setHasErrored(true))
    expect(mockDispatch).not.toHaveBeenCalledWith(isLoading(false))
  })

})