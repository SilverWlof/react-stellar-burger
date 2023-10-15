import { webApi } from "../../utils/Api/AppApi.js";
import { useSelector } from "react-redux";

export const FULL_INGREDIENTS = "FULL_INGREDIENTS";

export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";

export function getData() {
  return function (dispatch, getState) {
    const { isLoaded } = getState().fullIngredients.isLoaded;
    if (!isLoaded) {
      dispatch({ type: GET_INGREDIENTS_REQUEST });
      webApi
        .getIngredients()
        .then((res) => {
          dispatch({ type: GET_INGREDIENTS_SUCCESS });
          dispatch({
            type: FULL_INGREDIENTS,
            data: res.data,
          });
        })
        .catch((e) => {
          dispatch({ type: GET_INGREDIENTS_FAILED });
          console.error("Failed to load ingredients data.");
        });
    }
  };
}
