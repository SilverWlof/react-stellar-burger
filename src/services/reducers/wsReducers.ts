import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
} from "../action-types";
import { TWSActionActions } from "../actions/wsActions";
import { TOrderPropType } from "../../services/custom-types/custom-types";

export type TWSRedusersStateType = {
    wsConnected: boolean,
    orders: Array<TOrderPropType>,
    total: number,
    totalToday: number,
    previousMessage: string,
};
const initialState: TWSRedusersStateType = {
  wsConnected: false,
  orders: [],
  total: 0,
  totalToday: 0,
  previousMessage: "",
};

export const wsReducer = (state = initialState, action:TWSActionActions) => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
      };

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
      };

    case WS_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false,
      };

    case WS_GET_MESSAGE:
      const currentMessage = JSON.stringify(action.payload);
      if (currentMessage === state.previousMessage) {
        return { ...state };
      } else {
        const newOrders = action.payload.orders ? action.payload.orders : [];
        return {
          ...state,
          orders: [...newOrders],
          total: action.payload.total,
          totalToday: action.payload.totalToday,
          previousMessage: currentMessage,
        };
      }

    default:
      return state;
  }
};
