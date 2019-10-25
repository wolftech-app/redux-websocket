import { Middleware, MiddlewareAPI } from 'redux';

import { Action, Options } from './types';
import { error } from './actions';
import * as actionTypes from './actionTypes';
import ReduxWebSocket from './ReduxWebSocket';

/**
 * Default middleware creator options.
 * @private
 */
const defaultOptions = {
  instanceName: undefined,
  reconnectInterval: 2000,
  reconnectOnClose: false,
};

/**
 * Create a middleware.
 *
 * @param {Options} rawOptions
 *
 * @returns {Middleware}
 */
export default (rawOptions?: Options): Middleware => {
  const options = { ...defaultOptions, ...rawOptions };

  // Create a new redux websocket instance.
  const reduxWebsocket = new ReduxWebSocket(options);

  // Define the list of handlers, now that we have an instance of ReduxWebSocket.
  const handlers = {
    [actionTypes.WEBSOCKET_CONNECT]: reduxWebsocket.connect,
    [actionTypes.WEBSOCKET_DISCONNECT]: reduxWebsocket.disconnect,
    [actionTypes.WEBSOCKET_SEND]: reduxWebsocket.send,
  };

  // Middleware function.
  return (store: MiddlewareAPI) => next => (action: Action) => {
    const { dispatch } = store;
    const handler = handlers[action.type];

    if (handler) {
      try {
        handler(store, action);
      } catch (err) {
        dispatch(error(action, err, options.instanceName));
      }
    }

    return next(action);
  };
};
