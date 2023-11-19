import { SET_AUTH_CHECKED, SET_USER, TAuthActions } from "../actions/auth";

import { TUserDataType } from "../../services/custom-types/custom-types";
export type TAuthStateType = {
    user: TUserDataType | null,
    isAuthChecked: boolean,
};
const initialState: TAuthStateType = {
  user: null,
  isAuthChecked: false,
};

export const authReducer = (state = initialState, action: TAuthActions): TAuthStateType => {
  switch (action.type) {
    case SET_AUTH_CHECKED:
      return {
        ...state,
        isAuthChecked: action.payload,
      };
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    default:
      return state;
  }
};
