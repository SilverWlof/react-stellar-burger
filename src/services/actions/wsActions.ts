import {
  WS_CONNECTION_START,
  WS_CONNECTION_AUTH_START,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE,
  WS_DISCONNECT,
} from "../action-types";
import { TAllOrdersMessageType } from "../../services/custom-types/custom-types";


export interface IConnectionStartAction {
    readonly type: typeof WS_CONNECTION_START;
    payload: string;
}
export interface IConnectionAuthStartAction {
    readonly type: typeof WS_CONNECTION_AUTH_START;
    payload: string;
}
export interface IConnectionSuccesAction {
    readonly type: typeof WS_CONNECTION_SUCCESS;
}
export interface IConnectionErrorAction {
    readonly type: typeof WS_CONNECTION_ERROR;
}
export interface IConnectionClosedAction {
    readonly type: typeof WS_CONNECTION_CLOSED;
}
export interface IGetMessageAction {
    readonly type: typeof WS_GET_MESSAGE;
    payload: TAllOrdersMessageType;
}
export interface ISendMessageAction {
    readonly type: typeof WS_SEND_MESSAGE;
    payload: TAllOrdersMessageType;
}
export interface IDisconnectAction {
    readonly type: typeof WS_DISCONNECT;
    payload: {
        code?: number;
        reasonMessage?: string;
    }
}
export type TWSActionActions =
    | IConnectionStartAction
    | IConnectionAuthStartAction
    | IConnectionSuccesAction
    | IConnectionErrorAction
    | IConnectionClosedAction
    | IGetMessageAction
    | ISendMessageAction
    | IDisconnectAction;

export const wsOpenConnection = (uri: string): IConnectionStartAction => {
  return {
      type: WS_CONNECTION_START,
      payload: uri
  };
};
export const wsOpenAuthConnection = (uri: string): IConnectionAuthStartAction => {
    const token: string = (localStorage.getItem("accessToken") || '').toString();
    const clearToken: string = token.replace('Bearer ', '')
    return {
        type: WS_CONNECTION_AUTH_START,
        payload: `${uri}?token=${clearToken}`
    };
};
export const wsConnectionSuccess = (): IConnectionSuccesAction => {

  return {
      type: WS_CONNECTION_SUCCESS,
  };
};
export const wsConnectionError = (): IConnectionErrorAction => {
  return {
    type: WS_CONNECTION_ERROR,
  };
};
export const wsConnectionClosed = (): IConnectionClosedAction => {
  return {
    type: WS_CONNECTION_CLOSED,
  };
};
export const wsGetMessage = (message: TAllOrdersMessageType): IGetMessageAction => {
  return {
    type: WS_GET_MESSAGE,
    payload: message,
  };
};
export const wsSendMessage = (message: TAllOrdersMessageType) => {
  return {
    type: WS_SEND_MESSAGE,
    payload: message,
  };
};
export const wsCloseConnection = (closeCode: number | undefined, message: string | undefined): IDisconnectAction => {
  return {
    type: WS_DISCONNECT,
    payload: { code: closeCode, reasonMessage: message },
  };
};
