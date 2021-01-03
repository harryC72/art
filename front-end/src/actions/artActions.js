import axios from '../axios';
import {
  ADD_ARTPIECE_FAIL,
  ADD_ARTPIECE_REQUEST,
  ADD_ARTPIECE_SUCCESS,
  GET_ARTPIECES_FAIL,
  GET_ARTPIECES_REQUEST,
  GET_ARTPIECES_SUCCESS,
} from '../constants/artConstants';

export const addArtPiece = (title, alt, technique, file) => async (
  dispatch
) => {
  try {
    dispatch({
      type: ADD_ARTPIECE_REQUEST,
    });
    const config = {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    };

    let data = {
      title,
      alt,
      technique,
    };

    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);
    formData.append('alt', alt);
    formData.append('technique', technique);

    await axios.post('/artPieces', formData, config);

    dispatch({
      type: ADD_ARTPIECE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADD_ARTPIECE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getArtPieces = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_ARTPIECES_REQUEST,
    });

    const { data } = await axios.get('/artpieces');

    dispatch({
      type: GET_ARTPIECES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ARTPIECES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
