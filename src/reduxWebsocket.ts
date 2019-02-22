import createWebsocket from './createWebsocket';
import { AnyAction, MiddlewareAPI } from 'redux';

export default class ReduxWebsocket {
  // TODO correctly type this thing
  websocket: WebSocket | null;

  constructor() {
    this.websocket = null;
  }

  /**
   * WebSocket connect event handler.
   */
  connect = ({ dispatch }: MiddlewareAPI, { payload }: AnyAction) => {
    if (this.websocket) {
      this.websocket.close();
    }

    this.websocket = createWebsocket(dispatch, payload.url);
  };

  /**
   * WebSocket disconnect event handler.
   */
  disconnect = () => {
    // TODO: write a test that checks what happens when a user tries to close
    // a closed connection. maybe we dispatch an 'error' action with a message?
    // maybe we throw an error?
    if (this.websocket) {
      this.websocket.close();
    } else {
      throw new Error(
        'Socket connection not initialized. Dispatch WEBSOCKET_CONNECT first',
      );
    }
  };

  /**
   * WebSocket send event handler.
   */
  send = (_store: MiddlewareAPI, { payload }: AnyAction) =>
    this.websocket && this.websocket.send(JSON.stringify(payload));
}
