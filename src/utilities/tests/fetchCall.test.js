/* eslint-disable */
import fetchCall from '../fetchCall';

describe('fetchCall', () => {
  let mockUrl;

  beforeEach(() => {
    mockUrl = ''
  })

  it('should call fetch w/ the correct params', async () => {
    window.fetch = jest.fn().mockImplementation(() => (
      Promise.resolve({ json: () => Promise.resolve('Promise resolved') })
    ))

    await fetchCall(mockUrl);
    expect (window.fetch).toHaveBeenCalledWith(mockUrl);
  })
})