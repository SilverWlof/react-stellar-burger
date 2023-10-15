export const socketMiddleware = (wsUrl, wsActions) => {
  return (store) => {
    let socket = null;

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
              console.log('socket.onmessage')
              console.log(event)
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
//wss://norma.nomoreparties.space/orders/all
//{
//    "success": true,
//        "orders": [
//            {
//                "ingredients": [
//                    "60d3463f7034a000269f45e7",
//                    "60d3463f7034a000269f45e9",
//                    "60d3463f7034a000269f45e8",
//                    "60d3463f7034a000269f45ea"
//                ],
//                "_id": "",
//                "status": "done",
//                "number": 0,
//                "createdAt": "2021-06-23T14:43:22.587Z",
//                "updatedAt": "2021-06-23T14:43:22.603Z"
//            }
//        ],
//            "total": 1,
//                "totalToday": 1
//}
//norma.nomoreparties.space/orders
//?token=${accessToken}
