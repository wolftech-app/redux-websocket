import { AnyAction, MiddlewareAPI } from 'redux';

import createWebsocket from './createWebsocket';

/**
 * WebSocket connect event handler.
 */
export const handleWebsocketConnect = (
  websocket: WebSocket,
  { dispatch }: MiddlewareAPI,
  { payload }: AnyAction,
) => {
  if (websocket) {
    websocket.close();
  }

  return createWebsocket(dispatch, payload.url);
};

/**
 * WebSocket disconnect event handler.
 */
export const handleWebsocketDisconnect = ({ close }: WebSocket) => {
  // TODO: write a test that checks what happens when a user tries to close
  // a closed connection. maybe we dispatch an 'error' action with a message?
  // maybe we throw an error?
  try {
    close();
  } catch (err) {
    throw new Error('Socket connection not initialized. Dispatch WEBSOCKET_CONNECT first');
  }
};

/**
 * WebSocket send event handler.
 */
export const handleWebsocketSend = (
  { send }: WebSocket,
  _store: MiddlewareAPI,
  { payload }: AnyAction,
// @ts-ignore
) => console.log('LIB: handle websocket send', send, payload) ||
(
  send(JSON.stringify(payload))
);
