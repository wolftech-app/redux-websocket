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
    let handler;

    switch (action.type) {
      case actionTypes.WEBSOCKET_CONNECT:
      case actionTypes.WEBSOCKET_DISCONNECT:
      case actionTypes.WEBSOCKET_SEND:
        handler = handlers[action.type];
        break;
      default:
    }

    if (handler) {
      try {
        // If an instanceName is set in the options, then only run the handler
        // if the same instanceName is in the action's meta data.
        //
        // If there's no instanceName set, just run the handler.
        if (options.instanceName != null) {
          const instanceName = Reflect.get(action.meta, 'instanceName');

          if (instanceName === options.instanceName) {
            handler(store, action);
          }
        } else {
          handler(store, action);
        }
      } catch (err) {
        dispatch(error(action, err, { instanceName: options.instanceName }));
      }
    }

    return next(action);
  };
};
