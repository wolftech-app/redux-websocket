// eslint-disable-next-line no-unused-vars
import { compose, Middleware, MiddlewareAPI } from 'redux';
import { partial, partialRight } from 'lodash/fp';

// eslint-disable-next-line import/no-cycle
import {
  closed,
  connecting,
  message,
  open,
} from './actions';
// eslint-disable-next-line no-unused-vars
import { Config, ReduxWebSocket } from './types';
import { createWebsocket } from './websocket';

// Action types to be dispatched by the user
export const WEBSOCKET_CONNECT = 'WEBSOCKET:CONNECT';
export const WEBSOCKET_DISCONNECT = 'WEBSOCKET:DISCONNECT';
export const WEBSOCKET_SEND = 'WEBSOCKET:SEND';
// Action types dispatched by the WebSocket implementation
export const WEBSOCKET_CONNECTING = 'WEBSOCKET:CONNECTING';
export const WEBSOCKET_OPEN = 'WEBSOCKET:OPEN';
export const WEBSOCKET_CLOSED = 'WEBSOCKET:CLOSED';
export const WEBSOCKET_MESSAGE = 'WEBSOCKET:MESSAGE';

const createMiddleware = (): Middleware => {
  // Hold a reference to the WebSocket instance in use.
  let websocket: ReduxWebSocket | null;

  /**
   * A function to create the WebSocket object and attach the standard callbacks
   */
  const initialize = ({ dispatch }: MiddlewareAPI, config: Config) => {
    // Instantiate the websocket.
    websocket = createWebsocket(config);

    // Function will dispatch actions returned from action creators.
    const dispatchAction = partial(compose, [dispatch]);

    // Setup handlers to be called like this:
    // dispatch(open(event));
    websocket.onopen = dispatchAction(open);
    websocket.onclose = dispatchAction(closed);
    websocket.onmessage = dispatchAction(message);

    // An optimistic callback assignment for WebSocket objects that support this
    const onConnecting = dispatchAction(connecting);
    // Add the websocket as the 2nd argument (after the event).

    websocket.onconnecting = partialRight(onConnecting, [websocket]);
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
