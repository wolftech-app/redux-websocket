// eslint-disable-next-line no-unused-vars
import { Middleware, MiddlewareAPI } from 'redux';

// eslint-disable-next-line import/no-cycle
import {
  closed,
  message,
  open,
} from './actions';
// eslint-disable-next-line no-unused-vars
import { Config } from './types';
import { createWebsocket } from './websocket';

// Action types to be dispatched by the user
export const WEBSOCKET_CONNECT = 'WEBSOCKET:CONNECT';
export const WEBSOCKET_DISCONNECT = 'WEBSOCKET:DISCONNECT';
export const WEBSOCKET_SEND = 'WEBSOCKET:SEND';
// Action types dispatched by the WebSocket implementation
export const WEBSOCKET_OPEN = 'WEBSOCKET:OPEN';
export const WEBSOCKET_CLOSED = 'WEBSOCKET:CLOSED';
export const WEBSOCKET_MESSAGE = 'WEBSOCKET:MESSAGE';

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
