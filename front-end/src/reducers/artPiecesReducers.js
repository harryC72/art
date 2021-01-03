import {
  ADD_ARTPIECE_FAIL,
  ADD_ARTPIECE_REQUEST,
  ADD_ARTPIECE_SUCCESS,
  GET_ARTPIECES_FAIL,
  GET_ARTPIECES_REQUEST,
  GET_ARTPIECES_SUCCESS,
} from '../constants/artConstants';

export const addArtPieceReducer = (state = [], action) => {
  switch (action.type) {
    case ADD_ARTPIECE_REQUEST:
      return { loading: true };
    case ADD_ARTPIECE_SUCCESS:
      return {
        loading: false,
        success: true,
        artPieces: action.payload,
      };
    case ADD_ARTPIECE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const getArtPiecesReducer = (state = { artPieces: [] }, action) => {
  switch (action.type) {
    case GET_ARTPIECES_REQUEST:
      return { loading: true, artPieces: [] };
    case GET_ARTPIECES_SUCCESS:
      return {
        loading: false,
        artPieces: action.payload,
      };
    case GET_ARTPIECES_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
