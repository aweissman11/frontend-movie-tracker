/* eslint-disable */
import { deployFilterModalReducer } from '../deployFilterModalReducer';

describe('deployFilterModalReducer', () => {
  it('should return default state', () => {
    
    const expected = false;
    const result = deployFilterModalReducer(undefined, {});
    
    
    expect(result).toEqual(expected);
  })
  
  it('should return new state', () => {
    const mockAction = {
      type: 'DEPLOY_FILTER_MODAL',
      status: true
    };
    const expected = true;
    const result = deployFilterModalReducer(undefined, mockAction);

    expect(result).toEqual(expected);
  })

})