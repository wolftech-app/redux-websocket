import { AnyAction, MiddlewareAPI } from 'redux';

import { Options, Action } from './types';
import createWebsocket from './createWebsocket';
import ReduxWebSocketError from './ReduxWebSocketError';

/**
 * ReduxWebsocket
 * @class
 */
export default class ReduxWebsocket {
  options: Options;

  websocket: WebSocket | null;

  /**
   * Constructor
   * @constructor
   *
   * @param {Options} options
   */
  constructor(options: Options) {
    this.options = options;
    this.websocket = null;
  }

  /**
   * WebSocket connect event handler.
   */
  connect = ({ dispatch }: MiddlewareAPI, { payload }: AnyAction) => {
    if (this.websocket) {
      this.websocket.close();
    }

    this.websocket = createWebsocket(dispatch, payload.url, this.options);
  }

  /**
   * WebSocket disconnect event handler.
   *
   * @throws {ReduxWebSocketError} Socket connection must exist.
   */
  disconnect = () => {
    // TODO: write a test that checks what happens when a user tries to close
    // a closed connection. maybe we dispatch an 'error' action with a message?
    // maybe we throw an error?
    if (this.websocket) {
      this.websocket.close();

      this.websocket = null;
    } else {
      throw new ReduxWebSocketError(
        'Socket connection not initialized. Dispatch WEBSOCKET_CONNECT first',
      );
    }
  }

  /**
   * WebSocket send event handler.
   *
   * @param {MiddlewareAPI} _store
   * @param {Action} action
   *
   * @throws {ReduxWebSocketError} Socket connection must exist.
   */
  send = (_store: MiddlewareAPI, { payload }: Action) => {
    if (this.websocket) {
      this.websocket.send(JSON.stringify(payload));
    } else {
      throw new ReduxWebSocketError(
        'Socket connection not initialized. Dispatch WEBSOCKET_CONNECT first',
      );
    }
  }
}
