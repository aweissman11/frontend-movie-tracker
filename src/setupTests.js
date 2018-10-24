import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

class LocalStorage{
  constructor(){
    this.store = {};
  }

  getItem = (key) => {
    return this.store[key]
  }

  setItem = (key, value) => {
    this.store[key] = value
    console.log('firing')

  }

  removeItem = (key) => {
    this.store[key] = undefined
  }

  clear = () => {
    this.store = {}
  }

}

export default LocalStorage;