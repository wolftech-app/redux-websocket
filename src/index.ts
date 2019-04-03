import { Middleware, MiddlewareAPI } from 'redux';
import ReduxWebsocket from './reduxWebsocket';
import {
  Action,
  ActionType,
  ActionHandler,
  Options,
} from './types';
import { error } from './actions';
import {
  WEBSOCKET_CLOSED,
  WEBSOCKET_CONNECT,
  WEBSOCKET_DISCONNECT,
  WEBSOCKET_MESSAGE,
  WEBSOCKET_OPEN,
  WEBSOCKET_SEND,
} from './actionTypes';

const getHandler = (reduxWebsocket: ReduxWebsocket, actionType: ActionType) => {
  const handlers: { [K in ActionType]: ActionHandler } = {
    [WEBSOCKET_CLOSED]: () => {},
    [WEBSOCKET_CONNECT]: reduxWebsocket.connect,
    [WEBSOCKET_DISCONNECT]: reduxWebsocket.disconnect,
    [WEBSOCKET_MESSAGE]: () => {},
    [WEBSOCKET_OPEN]: () => {},
    [WEBSOCKET_SEND]: reduxWebsocket.send,
  };

  return handlers[actionType];
};

// Default middleware options
const defaultOptions = {
  prefix: 'REDUX_WEBSOCKET',
};

// Middleware function.
const createMiddleware = (opt?: Options): Middleware => {
  const options = { ...defaultOptions, ...opt };
  const { prefix } = options;
  const actionPrefixExp = RegExp(`^${prefix}::`);

  // Create a new redux websocket instance
  const reduxWebsocket = new ReduxWebsocket(options);

  return (store: MiddlewareAPI) => next => (action: Action) => {
    const { dispatch } = store;
    const { type: actionType } = action;

    // Check if action type matches prefix
    if (actionType && actionType.match(actionPrefixExp)) {
      const baseActionType = action.type.replace(actionPrefixExp, '') as ActionType;
      const handler = getHandler(reduxWebsocket, baseActionType);

      if (handler) {
        try {
          handler(store, action);
        } catch (err) {
          dispatch(error(action, err, prefix));
        }
      }
    }

    return next(action);
  };
};

export * from './actionTypes';
export default createMiddleware;
