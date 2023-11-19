import { ReactElement } from "react";
import { IngredientDetails } from "../../components/ingredient-info/ingredient-info";
import { OrderInfo } from "../../components/order-info/order-info";
import {
  SET_MODAL_CONTENT,
  SET_MODAL_VIEW_STATE,
  INGREDIENT_MODAL_TYPE,
  ORDER_MODAL_TYPE,
  TModalActions,
} from "../actions/modal";

const modalState: TModalState = {
  modalPopupTitle: null,
  modalPopupControl: null,
  isModalOpened: false,
};
export type TModalState = {
    modalPopupTitle?: string | null;
    modalPopupControl: ReactElement | null;
    isModalOpened: boolean;
};

export const modalStateReducer = (state = modalState, action: TModalActions): TModalState => {
  switch (action.type) {
    case SET_MODAL_CONTENT: {
      let modalControl;
      switch (action.popupType) {
        case INGREDIENT_MODAL_TYPE: {
              modalControl = IngredientDetails({});
          break;
        }
        case ORDER_MODAL_TYPE: {
              modalControl = OrderInfo({ id: action.data });
          break;
        }
        default: {
          modalControl = null;
        }
      }
      return {
        ...state,
        modalPopupTitle: action.Title,
        modalPopupControl: modalControl,
      };
    }
    case SET_MODAL_VIEW_STATE: {
      return {
        ...state,
        isModalOpened: action.isOpened,
      };
    }
    default: {
      return state;
    }
  }
};
