import { Middleware, MiddlewareAPI } from 'redux';

import { Action, ActionType, ActionHandler } from './types';
import {
  WEBSOCKET_CLOSED,
  WEBSOCKET_CONNECT,
  WEBSOCKET_DISCONNECT,
  WEBSOCKET_MESSAGE,
  WEBSOCKET_OPEN,
  WEBSOCKET_SEND,
} from './actionTypes';
import { handleWebsocketConnect, handleWebsocketDisconnect, handleWebsocketSend } from './handlers';

const handlers: { [K in ActionType]: ActionHandler } = {
  [WEBSOCKET_CLOSED]: () => {},
  [WEBSOCKET_CONNECT]: handleWebsocketConnect,
  [WEBSOCKET_DISCONNECT]: handleWebsocketDisconnect,
  [WEBSOCKET_MESSAGE]: () => {},
  [WEBSOCKET_OPEN]: () => {},
  [WEBSOCKET_SEND]: handleWebsocketSend,
};

// Middleware function.
const createMiddleware = (): Middleware => {
  // Hold a reference to the WebSocket instance in use.
  let websocket: WebSocket;

  return (store: MiddlewareAPI) => next => (action: Action) => {
    // Find the appropriate handler and call it.
    const handler = handlers[action.type as ActionType];
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
