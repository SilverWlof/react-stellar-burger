import { webApi } from "../../utils/Api.js";

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

function clearOrder(dispatch) {
  dispatch({
    type: CLEAR_SELECTION,
  });
}
