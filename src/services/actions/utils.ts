export const SET_DRAG_STYLE_TYPE = "SET_DRAG_STYLE_TYPE";

export const CREATE_ORDER_REQUEST = "CREATE_ORDER_REQUEST";
export const CREATE_ORDER_SUCCESS = "CREATE_ORDER_SUCCESS";
export const CREATE_ORDER_FAILED = "CREATE_ORDER_FAILED";


export interface ISetDragStyleTypeAction {
    readonly type: typeof SET_DRAG_STYLE_TYPE;
    isDragged: boolean;
}
export interface ICreateOrderRequestAction {
    readonly type: typeof CREATE_ORDER_REQUEST;
}
export interface ICreateOrderSuccesAction {
    readonly type: typeof CREATE_ORDER_SUCCESS;
}
export interface ICreateOrderFailedAction {
    readonly type: typeof CREATE_ORDER_FAILED;
}
export type TUtilsActions =
    | ISetDragStyleTypeAction
    | ICreateOrderRequestAction
    | ICreateOrderSuccesAction
    | ICreateOrderFailedAction;


export const setDragStyleTypeAction = (isDragged:boolean): ISetDragStyleTypeAction => ({
    type: SET_DRAG_STYLE_TYPE,
    isDragged
});
export const createOrderRequestAction = (): ICreateOrderRequestAction => ({
    type: CREATE_ORDER_REQUEST
});
export const createOrderSuccesAction = (): ICreateOrderSuccesAction => ({
    type: CREATE_ORDER_SUCCESS
});
export const createOrderFailedAction = (): ICreateOrderFailedAction => ({
    type: CREATE_ORDER_FAILED
});