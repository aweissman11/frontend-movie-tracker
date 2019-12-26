/* eslint-disable */
import fetchCall from '../userDatabaseFetch';
import { checkUserList } from '../../utilities/userDatabaseFetch';


describe('userDataBaseFetch', () => {
  const url = 'http://localhost:3000/api/v1/users'
  const mockData = { email: 'kevin@yo.com', password: 'password' }

  const optionsObject = {
    method: "POST",
    body: JSON.stringify(mockData),
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    }
  }

  it('should call fetch w/ the correct params', async () => {
    window.fetch = jest.fn().mockImplementation(() => (
      Promise.resolve({ json: () => Promise.resolve('Promise resolved') })
    ))

    await checkUserList(mockData);
    expect(window.fetch).toHaveBeenCalledWith(url, optionsObject);
  })
})