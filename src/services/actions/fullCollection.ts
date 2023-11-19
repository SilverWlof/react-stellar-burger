import { webApi } from "../../utils/Api/AppApi";
import { AppDispatch, RootState } from "../storage/index";
import { TIngredientPropType } from "../custom-types/custom-types";


export const FULL_INGREDIENTS = "FULL_INGREDIENTS";
export const GET_INGREDIENTS_REQUEST = "GET_INGREDIENTS_REQUEST";
export const GET_INGREDIENTS_SUCCESS = "GET_INGREDIENTS_SUCCESS";
export const GET_INGREDIENTS_FAILED = "GET_INGREDIENTS_FAILED";

export interface ISetFullIngredientsAction {
    readonly type: typeof FULL_INGREDIENTS;
    data: Array<TIngredientPropType>;
}
export interface IGetIngredientsRequestAction {
    readonly type: typeof GET_INGREDIENTS_REQUEST;
}
export interface IGetIngredientsSuccesAction {
    readonly type: typeof GET_INGREDIENTS_SUCCESS;
}
export interface IGetIngredientsFailedAction {
    readonly type: typeof GET_INGREDIENTS_FAILED;
}
export type TFullCollectionActions =
    | ISetFullIngredientsAction
    | IGetIngredientsRequestAction
    | IGetIngredientsSuccesAction
    | IGetIngredientsFailedAction;


export const setFullIngredientsAction = (data: Array<TIngredientPropType>): ISetFullIngredientsAction  => ({
    type: FULL_INGREDIENTS,
    data
});
export const getIngredientsRequestAction = (): IGetIngredientsRequestAction  => ({
    type: GET_INGREDIENTS_REQUEST
});
export const getIngredientsSuccesAction = (): IGetIngredientsSuccesAction  => ({
    type: GET_INGREDIENTS_SUCCESS
});
export const getIngredientsFailedAction = (): IGetIngredientsFailedAction  => ({
    type: GET_INGREDIENTS_FAILED
});


export function getData() {
    return function (dispatch: AppDispatch, getState: () => RootState) {
    const isLoaded  = getState().fullIngredients.isLoaded;
    if (!isLoaded) {
        dispatch(getIngredientsRequestAction());
      webApi
        .getIngredients()
        .then((res) => {
            dispatch({ type: GET_INGREDIENTS_SUCCESS });
            dispatch(setFullIngredientsAction(res.data))
        })
        .catch((e) => {
          dispatch({ type: GET_INGREDIENTS_FAILED });
          console.error("Failed to load ingredients data.");
        });
    }
  };
}
