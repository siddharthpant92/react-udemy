import * as actionTypes from "../actions/actionTypes";

const initialState = {
  token: null,
  userId: null,
  error: null,
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.AUTH_START:
      return { ...state, error: null, loading: true };

    case actionTypes.AUTH_SUCCESS:
      return {
        ...state,
        token: action.idToken,
        userId: action.userId,
        error: null,
        loading: false,
      };

    case actionTypes.AUTH_FAIL:
      return {
        ...state,
        error: action.error,
        token: null,
        userId: null,
        loading: false,
      };

    case actionTypes.AUTH_LOGOUT:
      return {
        ...state,
        token: null,
        userId: null,
      };

    default:
      return state;
  }
};
