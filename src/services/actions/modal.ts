export const SET_MODAL_CONTENT = "SET_MODAL_CONTENT";
export const SET_MODAL_VIEW_STATE = "SET_MODAL_VIEW_STATE";
export const INGREDIENT_MODAL_TYPE = "INGREDIENT_MODAL_TYPE";
export const ORDER_MODAL_TYPE = "ORDER_MODAL_TYPE";



export interface ISetModalContentAction {
    readonly type: typeof SET_MODAL_CONTENT;
    popupType: typeof INGREDIENT_MODAL_TYPE | typeof ORDER_MODAL_TYPE;
    Title?: string;
    data: string|number;
}
export interface ISetModalViewStateAction {
    readonly type: typeof SET_MODAL_VIEW_STATE;
    isOpened: boolean;
}

export type TModalActions =
    | ISetModalContentAction
    | ISetModalViewStateAction;


export const setModalContentAction = (popupType: typeof INGREDIENT_MODAL_TYPE | typeof ORDER_MODAL_TYPE, data: number, Title?: string): ISetModalContentAction => ({
    type: SET_MODAL_CONTENT,
    popupType,
    Title,
    data
});

export const setModalViewStateAction = (isOpened: boolean): ISetModalViewStateAction => ({
    type: SET_MODAL_VIEW_STATE,
    isOpened
});