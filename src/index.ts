import { Middleware } from 'redux';

import { WEBSOCKET_CONNECT, WEBSOCKET_DISCONNECT, WEBSOCKET_SEND } from './actionTypes';
import createWebsocket from './createWebsocket';

// Middleware function.
const createMiddleware = (): Middleware => {
  // Hold a reference to the WebSocket instance in use.
  let websocket: WebSocket;

  return store => next => (action) => {
    switch (action.type) {
      // User request to connect
      case WEBSOCKET_CONNECT:
        if (websocket) {
          websocket.close();
        }

        websocket = createWebsocket(store.dispatch, action.payload.url);
        break;

      // User request to disconnect
      case WEBSOCKET_DISCONNECT:
        websocket.close();
        break;

      // User request to send a message
      case WEBSOCKET_SEND:
        websocket.send(JSON.stringify(action.payload));
        break;

      default:
        break;
    }

    return next(action);
  };
};

export * from './actionTypes';
export default createMiddleware();
