import { webApi } from "../../utils/Api/AppApi.js";
import { v4 as uuidv4 } from "uuid";

export const SET_SELECTED_INGREDIENTS = "SET_SELECTED_INGREDIENTS";
export const ADD_SELECTED_INGREDIENT = "ADD_SELECTED_INGREDIENT";
export const INSERT_SELECTED_INGREDIENT = "INSERT_SELECTED_INGREDIENT";
export const SET_SELECTED_BUN = "SET_SELECTED_BUN";
export const SET_TOTAL_PRICE = "SET_TOTAL_PRICE";
export const REMOVE_SELECTED_ITEM = "REMOVE_SELECTED_ITEM";
export const SET_INSERT_POSITION = "SET_INSERT_POSITION";
export const CLEAR_SELECTION = "CLEAR_SELECTION";
export const UPDATE_POSITION = "UPDATE_POSITION";

export const GET_ORDER_REQUEST = "GET_ORDER_REQUEST";
export const GET_ORDER_SUCCESS = "GET_ORDER_SUCCESS";
export const GET_ORDER_FAILED = "GET_ORDER_FAILED";

export function getData(orderDetails, openModal) {
    console.log("getData")
  return function (dispatch) {
    dispatch({ type: GET_ORDER_REQUEST });
    webApi
      .createOrder(orderDetails)
      .then((res) => {
        openModal(res.order.number);
        dispatch({ type: GET_ORDER_SUCCESS });
      })
      .then(() => clearOrder(dispatch))
      .catch((e) => {
        dispatch({ type: GET_ORDER_FAILED });
        console.error("Failed to create order.");
        console.error(e);
      });
  };
}
export const addIngridient = (item) => {
    return {
        type: INSERT_SELECTED_INGREDIENT,
        data: {
            ...item,
            uniqueId: uuidv4()
        }
    }
}
export const addBun = (item) => {
    return {
        type: SET_SELECTED_BUN,
        data: {
            ...item,
            uniqueId: uuidv4()
        }
    }
}
export const moveIngridient = (item) => {
    return {
        type: UPDATE_POSITION,
        data: {
            ...item
        }
    }
}


function clearOrder(dispatch) {
  dispatch({
    type: CLEAR_SELECTION,
  });
}
