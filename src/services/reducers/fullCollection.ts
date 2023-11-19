import {
  FULL_INGREDIENTS,
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_FAILED,
  TFullCollectionActions,
} from "../actions/fullCollection";
import { TIngredientPropType } from "../../services/custom-types/custom-types";

export type TFullCollectionStateType = {
    collection: Array<TIngredientPropType>,
    isLoading: boolean,
    hasError: boolean,
    isLoaded: boolean,
};


const fullCollectionState: TFullCollectionStateType = {
  collection: [],
  isLoading: false,
  hasError: false,
  isLoaded: false,
};

export const fullCollectionReducer = (state = fullCollectionState, action: TFullCollectionActions): TFullCollectionStateType => {
  switch (action.type) {
    case FULL_INGREDIENTS: {
      return {
        ...state,
        collection: action.data,
        isLoaded: true,
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
