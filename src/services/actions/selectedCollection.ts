import { webApi } from "../../utils/Api/AppApi";
import { v4 as uuidv4 } from "uuid";
import { AppDispatch } from "../storage/index";
import { TDragItemDataType, TIngredientPropType, TSelectedIngredientPropType } from "../custom-types/custom-types";
import { setModalViewStateAction } from "./modal";

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


export interface ISetSelectedIngredientsAction {
    readonly type: typeof SET_SELECTED_INGREDIENTS;
}
export interface IAddSelectedIngredientAction {
    readonly type: typeof ADD_SELECTED_INGREDIENT;
    data: TSelectedIngredientPropType;
}
export interface IInsertSelectedIngredientAction {
    readonly type: typeof INSERT_SELECTED_INGREDIENT;
    data: TDragItemDataType;
}
export interface ISetSelectedBunAction {
    readonly type: typeof SET_SELECTED_BUN;
    data: TIngredientPropType;
}
export interface ISetTotalPriceAction {
    readonly type: typeof SET_TOTAL_PRICE;
    newPrice : number;
}
export interface IRemoveSelectedItemAction {
    readonly type: typeof REMOVE_SELECTED_ITEM;
    pos: number;
}
export interface ISetInsertPositionAction {
    readonly type: typeof SET_INSERT_POSITION;
    newPos: number;

}
export interface IClearSelectionAction {
    readonly type: typeof CLEAR_SELECTION;
}
export interface IUpdatePositionAction {
    readonly type: typeof UPDATE_POSITION;
    data: TDragItemDataType;
}
export interface IGetOrderRequestAction {
    readonly type: typeof GET_ORDER_REQUEST;
}
export interface IGetOrderSuccesAction {
    readonly type: typeof GET_ORDER_SUCCESS;
}
export interface IGetOrderFailedAction {
    readonly type: typeof GET_ORDER_FAILED;
}

export type TSelectedCollectionActions =
    ISetSelectedIngredientsAction |
    IAddSelectedIngredientAction |
    IInsertSelectedIngredientAction |
    ISetSelectedBunAction |
    ISetTotalPriceAction |
    IRemoveSelectedItemAction |
    ISetInsertPositionAction |
    IClearSelectionAction |
    IUpdatePositionAction |
    IGetOrderRequestAction |
    IGetOrderSuccesAction |
    IGetOrderFailedAction;

export const setSelectedIngredientsAction = (): ISetSelectedIngredientsAction => ({
    type: SET_SELECTED_INGREDIENTS
});
export const addSelectedIngredientAction = (item: TSelectedIngredientPropType): IAddSelectedIngredientAction => ({
    type: ADD_SELECTED_INGREDIENT,
    data: {
        ...item,
        item: {
            ...item.item,
            uniqueId: uuidv4()
        }

    }
});
export const insertSelectedIngredientAction = (arg0: TDragItemDataType): IInsertSelectedIngredientAction => ({
    type: INSERT_SELECTED_INGREDIENT,
    data: arg0
});

export const setSelectedBunAction = (arg0: TDragItemDataType): ISetSelectedBunAction => ({
    type: SET_SELECTED_BUN,
    data: arg0.data
});

export const updatePositionAction = (item: TDragItemDataType ): IUpdatePositionAction => ({
    type: UPDATE_POSITION,
    data: item
});

export const setTotalPriceAction = (newPrice:number): ISetTotalPriceAction => ({
    type: SET_TOTAL_PRICE,
    newPrice
});
export const removeSelectedItemAction = (pos:number): IRemoveSelectedItemAction => ({
    type: REMOVE_SELECTED_ITEM,
    pos
});
export const setInsertPositionAction = (newPos:number): ISetInsertPositionAction => ({
    type: SET_INSERT_POSITION,
    newPos
});
export const clearSelectionAction = (): IClearSelectionAction => ({
    type: CLEAR_SELECTION
});
export const getOrderRequestAction = (): IGetOrderRequestAction => ({
    type: GET_ORDER_REQUEST
});
export const getOrderSuccesAction = (): IGetOrderSuccesAction => ({
    type: GET_ORDER_SUCCESS
});
export const getOrderFailedAction = (): IGetOrderFailedAction => ({
    type: GET_ORDER_FAILED
});

export function getData(orderDetails:Array<string>, openModal:(arg0: number)=>void) {
    return function (dispatch: AppDispatch) {
        dispatch(setModalViewStateAction(true));
        dispatch(getOrderRequestAction());
    webApi
      .createOrder(orderDetails)
      .then((res) => {
        openModal(res.order.number);
          dispatch(getOrderSuccesAction());
      })
        .then(() => {
            dispatch(clearSelectionAction())
        })
      .catch((e) => {
          dispatch(getOrderFailedAction());
        console.error("Failed to create order.");
        console.error(e);
      });
  };
}