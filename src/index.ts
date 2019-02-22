import { Middleware, MiddlewareAPI } from 'redux';
import ReduxWebsocket from './reduxWebsocket';
import { Action, ActionType, ActionHandler } from './types';
import {
  WEBSOCKET_CLOSED,
  WEBSOCKET_CONNECT,
  WEBSOCKET_DISCONNECT,
  WEBSOCKET_MESSAGE,
  WEBSOCKET_OPEN,
  WEBSOCKET_SEND,
} from './actionTypes';

const getHandler = (reduxWebsocket: ReduxWebsocket , actionType: ActionType) => {
  const handlers: { [K in ActionType]: ActionHandler } = {
    [WEBSOCKET_CLOSED]: () => {},
    [WEBSOCKET_CONNECT]: reduxWebsocket.connect,
    [WEBSOCKET_DISCONNECT]: reduxWebsocket.disconnect,
    [WEBSOCKET_MESSAGE]: () => {},
    [WEBSOCKET_OPEN]: () => {},
    [WEBSOCKET_SEND]: reduxWebsocket.send,
  };

  return handlers[actionType];
}

// Middleware function.
const createMiddleware = (): Middleware => {
  // Create a new redux webseocket instance
  const reduxWebsocket = new ReduxWebsocket;

  return (store: MiddlewareAPI) => next => (action: Action) => {
    const handler = getHandler(reduxWebsocket, action.type)
    handler(store, action);

    return next(action);
  };
};

export * from './actionTypes';
export default createMiddleware();
