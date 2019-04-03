import { MiddlewareAPI } from 'redux';

import { Options, Action } from './types';
import createWebsocket from './createWebsocket';
import ReduxWebSocketError from './ReduxWebSocketError';

/**
 * ReduxWebSocket
 * @class
 *
 * Manages a WebSocket connection.
 */
export default class ReduxWebSocket {
  options: Options;

  // WebSocket connection.
  websocket: WebSocket | null = null;

  /**
   * Constructor
   * @constructor
   *
   * @param {Options} options
   */
  constructor(options: Options) {
    this.options = options;
  }

  /**
   * WebSocket connect event handler.
   *
   * @param {MiddlewareAPI} store
   * @param {Action} action
   */
  connect = ({ dispatch }: MiddlewareAPI, { payload }: Action) => {
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
