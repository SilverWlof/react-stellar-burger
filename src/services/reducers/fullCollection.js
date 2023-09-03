import {
  FULL_INGREDIENTS,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
} from "../actions/fullCollection";

const fullCollectionState = {
  collection: [],
  isLoading: false,
  hasError: false,
};

export const fullCollectionReducer = (state = fullCollectionState, action) => {
  switch (action.type) {
    case FULL_INGREDIENTS: {
      return {
        ...state,
        collection: action.data,
      };
    }
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        hasError: false,
      };
    }
    case GET_INGREDIENTS_FAILED: {
      return {
        ...state,
        isLoading: false,
        hasError: true,
      };
    }
    default: {
      return state;
    }
  }
};
