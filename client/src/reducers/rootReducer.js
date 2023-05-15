import { combineReducers } from 'redux';
import imageReducer from './imageReducer';

const rootReducer = combineReducers({
  images: imageReducer,
});

export default rootReducer;
