import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import { compose } from 'redux';
import { rootReducer } from '../reducers';
import { TwsActionsType, socketMiddleware } from '../middleware/socketMiddleware';
import { WS_CONNECTION_AUTH_START, WS_CONNECTION_CLOSED, WS_CONNECTION_ERROR, WS_CONNECTION_START, WS_CONNECTION_SUCCESS, WS_DISCONNECT, WS_GET_MESSAGE, WS_SEND_MESSAGE } from '../action-types/wsActionTypes';

declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const wsUrl = "wss://norma.nomoreparties.space";

const wsActions: TwsActionsType = {
    wsInit: WS_CONNECTION_START,
    wsInitAuth: WS_CONNECTION_AUTH_START,
    wsSendMessage: WS_SEND_MESSAGE,
    onOpen: WS_CONNECTION_SUCCESS,
    onClose: WS_CONNECTION_CLOSED,
    onError: WS_CONNECTION_ERROR,
    onMessage: WS_GET_MESSAGE,
    wsDisconnect: WS_DISCONNECT
};

export const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const Enhancer = composeEnhancers(applyMiddleware(thunk, socketMiddleware(wsUrl, wsActions)));

export const store = createStore(rootReducer, Enhancer);