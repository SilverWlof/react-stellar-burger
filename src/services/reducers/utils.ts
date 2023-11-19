import { SET_DRAG_STYLE_TYPE, TUtilsActions } from "../actions/utils";

type TUtilsStateType = {
    isDragged: boolean,
    isLoading: boolean,
    hasError: boolean,
};
const utilsState: TUtilsStateType = {
  isDragged: false,
  isLoading: false,
  hasError: false,
};

export const utilsReducer = (state = utilsState, action: TUtilsActions): TUtilsStateType => {
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
