import axios from 'axios';

// Action Types
export const FETCH_IMAGES_REQUEST = 'FETCH_IMAGES_REQUEST';
export const FETCH_IMAGES_SUCCESS = 'FETCH_IMAGES_SUCCESS';
export const FETCH_IMAGES_FAILURE = 'FETCH_IMAGES_FAILURE';

// Action Creators
export const fetchImagesRequest = () => {
  return {
    type: FETCH_IMAGES_REQUEST,
  };
};

export const fetchImagesSuccess = (images) => {
  return {
    type: FETCH_IMAGES_SUCCESS,
    payload: images,
  };
};

export const fetchImagesFailure = (error) => {
  return {
    type: FETCH_IMAGES_FAILURE,
    payload: error,
  };
};

// Thunk to fetch images from the backend
export const fetchImages = () => {
  return (dispatch) => {
    dispatch(fetchImagesRequest());

    axios
      .get('http://localhost:3001/images')
      .then((response) => {
        const images = response.data;
        dispatch(fetchImagesSuccess(images));
      })
      .catch((error) => {
        const errorMessage = error.message;
        dispatch(fetchImagesFailure(errorMessage));
      });
  };
};
