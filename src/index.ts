import { AnyAction, Middleware, MiddlewareAPI } from 'redux';

import { WEBSOCKET_CONNECT, WEBSOCKET_DISCONNECT, WEBSOCKET_SEND } from './actionTypes';
import { handleWebsocketConnect, handleWebsocketDisconnect, handleWebsocketSend } from './handlers';

type Handler = (websocket: WebSocket, _store: MiddlewareAPI, action: AnyAction) => void;

// TODO: is there a way to specify that a key in this object must be a
// known action type?
const handlers: { [key: string]: Handler } = {
  [WEBSOCKET_CONNECT]: handleWebsocketConnect,
  [WEBSOCKET_DISCONNECT]: handleWebsocketDisconnect,
  [WEBSOCKET_SEND]: handleWebsocketSend,
};

// Middleware function.
const createMiddleware = (): Middleware => {
  // Hold a reference to the WebSocket instance in use.
  let websocket: WebSocket;

  return (store: MiddlewareAPI) => next => (action) => {
    // Find the appropriate handler and call it.
    const handler = handlers[action.type];
    const returnValue = handler(websocket, store, action);

    // Handle the case where an action returns a WebSocket instance.
    // TODO: This feels gross. Is there a better way to manage this instance?
    // Don't love the idea
    if (returnValue != null) {
      websocket = returnValue;
    }

    return next(action);
  };
};

export default createMiddleware();
