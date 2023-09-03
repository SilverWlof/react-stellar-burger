import IngredientDetails from "../../components/ingredient-info/ingredient-info";
import OrderInfo from "../../components/order-info/order-info";
import {
  SET_MODAL_CONTENT,
  SET_MODAL_VIEW_STATE,
  INGREDIENT_MODAL_TYPE,
  ORDER_MODAL_TYPE,
} from "../actions/modal";

const modalState = {
  modalPopupTitle: null,
  modalPopupControl: null,
  isModalOpened: false,
};

export const modalStateReducer = (state = modalState, action) => {
  switch (action.type) {
    case SET_MODAL_CONTENT: {
      let modalControl;
      switch (action.popupType) {
        case INGREDIENT_MODAL_TYPE: {
          modalControl = <IngredientDetails ingredientData={action.data} />;
          break;
        }
        case ORDER_MODAL_TYPE: {
          modalControl = <OrderInfo id={action.data} />;
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
