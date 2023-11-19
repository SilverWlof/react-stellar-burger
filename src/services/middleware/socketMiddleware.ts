import { Middleware } from "redux";
import { WS_CONNECTION_AUTH_START, WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_CONNECTION_START, WS_CONNECTION_SUCCESS, WS_DISCONNECT, WS_GET_MESSAGE, WS_SEND_MESSAGE } from "../action-types";

export type TwsActionsType = {
    wsInit: typeof WS_CONNECTION_START,
    wsInitAuth: typeof WS_CONNECTION_AUTH_START,
    wsSendMessage: typeof WS_SEND_MESSAGE,
    onOpen: typeof WS_CONNECTION_SUCCESS,
    onClose: typeof WS_CONNECTION_CLOSED,
    onError: typeof WS_CONNECTION_ERROR,
    onMessage: typeof WS_GET_MESSAGE,
    wsDisconnect: typeof WS_DISCONNECT
};

export const socketMiddleware = (wsUrl: string, wsActions: TwsActionsType): Middleware => {
  return (store) => {
      let socket: WebSocket|null = null;

    return (next) => (action) => {
      const { dispatch, getState } = store;
      const { type, payload } = action;
      const {
        wsInit,
        wsInitAuth,
        wsSendMessage,
        onOpen,
        onClose,
        onError,
        onMessage,
        wsDisconnect,
      } = wsActions;

        const { user } = getState().user;
        if (type === wsInitAuth && user) {
            socket = new WebSocket(`${wsUrl}${payload}`);
        } else if (type === wsInit || (type === wsInitAuth && !user)) {
            socket = new WebSocket(`${wsUrl}${payload}`);
      }

      if (socket) {
        socket.onopen = (event) => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = (event) => {
          dispatch({ type: onError, payload: event });
        };

          socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restPayload } = parsedData;
          dispatch({ type: onMessage, payload: restPayload });
        };

        socket.onclose = (event) => {
          dispatch({ type: onClose, payload: event });
        };

        if (type === wsSendMessage) {
          const message = { ...payload, token: user.token };
          socket.send(JSON.stringify(message));
        }
        if (type === wsDisconnect) {
          socket.close(payload.code, payload.reasonMessage);
          socket = null;
        }
      }

      next(action);
    };
  };
};