import {
  SET_DRAG_STYLE_TYPE
} from "../actions/utils";

const utilsState = {
  isDragged: false,
  isLoading: false,
  hasError: false,
};

export const utilsReducer = (state = utilsState, action) => {
  switch (action.type) {
    case SET_DRAG_STYLE_TYPE: {
      return {
        ...state,
        isDragged: action.isDragged,
      };
    }
    default: {
      return state;
    }
  }
};
