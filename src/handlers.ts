import { AnyAction, MiddlewareAPI } from 'redux';

import createWebsocket from './createWebsocket';

// WebSocket connect event handler.
export const handleWebsocketConnect = (
  websocket: WebSocket,
  store: MiddlewareAPI,
  action: AnyAction,
) => {
  if (websocket) {
    websocket.close();
  }

  return createWebsocket(store.dispatch, action.payload.url);
};

// WebSocket disconnect event handler.
export const handleWebsocketDisconnect = (websocket: WebSocket) => {
  // TODO: write a test that checks what happens when a user tries to close
  // a closed connection. maybe we dispatch an 'error' action with a message?
  // maybe we throw an error?
  try {
    websocket.close();
  } catch (err) {
    throw new Error('Socket connection not initialized. Dispatch WEBSOCKET_CONNECT first');
  }
};

// WebSocket send event handler.
export const handleWebsocketSend = (
  websocket: WebSocket,
  _store: MiddlewareAPI,
  action: AnyAction,
) => (
  websocket.send(JSON.stringify(action.payload))
);
