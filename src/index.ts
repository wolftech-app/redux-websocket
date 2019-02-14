import { Middleware, MiddlewareAPI } from 'redux';

import {
  closed,
  message,
  open,
  WEBSOCKET_CONNECT,
  WEBSOCKET_DISCONNECT,
  WEBSOCKET_SEND,
} from './actions';
import { Config } from './types';
import { createWebsocket } from './websocket';


const createMiddleware = (): Middleware => {
  // Hold a reference to the WebSocket instance in use.
  let websocket: WebSocket | null;

  /**
   * A function to create the WebSocket object and attach the standard callbacks
   */
  const initialize = ({ dispatch }: MiddlewareAPI, config: Config) => {
    // Instantiate the websocket.
    websocket = createWebsocket(config);

    if (websocket) {
      websocket.onopen = event => dispatch(open(event));
      websocket.onclose = event => dispatch(closed(event));
      websocket.onmessage = event => dispatch(message(event));
    }
  };

  /**
   * Close the WebSocket connection and cleanup
   */
  const close = () => {
    if (websocket) {
      // eslint-disable-next-line no-console
      console.warn(`Closing WebSocket connection to ${websocket.url} ...`);

      websocket.close();
      websocket = null;
    }
  };

  /**
   * The primary Redux middleware function.
   * Each of the actions handled are user-dispatched.
   */
  return store => next => (action) => {
    switch (action.type) {
      // User request to connect
      case WEBSOCKET_CONNECT:
        close();
        initialize(store, action.payload);
        break;

      // User request to disconnect
      case WEBSOCKET_DISCONNECT:
        close();
        break;

      // User request to send a message
      case WEBSOCKET_SEND:
        if (websocket) {
          websocket.send(JSON.stringify(action.payload));
        } else {
          // eslint-disable-next-line no-console
          console.warn('WebSocket is closed, ignoring. Trigger a WEBSOCKET_CONNECT first.');
        }
        break;

      default:
        break;
    }

    return next(action);
  };
};

export default createMiddleware();
