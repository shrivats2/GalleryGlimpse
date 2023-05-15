import { configureStore } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

// Define the initial state
const initialState = {
  images: [],
  loading: false,
  error: null,
};

// Create a slice of the Redux store
const imageSlice = createSlice({
  name: 'image',
  initialState,
  reducers: {
    fetchImagesStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchImagesSuccess(state, action) {
      state.loading = false;
      state.images = action.payload;
    },
    fetchImagesFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

// Create an action for fetching images
export const fetchImages = () => async (dispatch) => {
  dispatch(imageSlice.actions.fetchImagesStart());
  
  try {
    const response = await fetch('http://localhost:3001/images');
    const data = await response.json();
    dispatch(imageSlice.actions.fetchImagesSuccess(data));
  } catch (error) {
    dispatch(imageSlice.actions.fetchImagesFailure(error.message));
  }
};

// Create the Redux store
const store = configureStore({
  reducer: imageSlice.reducer,
});

// Create custom hooks for accessing the store and dispatching actions
export const useAppSelector = useSelector;
export const useAppDispatch = useDispatch;

export default store;
