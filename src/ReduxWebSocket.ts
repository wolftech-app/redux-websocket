import { Dispatch, MiddlewareAPI } from 'redux';

import {
  beginReconnect,
  broken,
  closed,
  message,
  open,
  reconnectAttempt,
  reconnected,
} from './actions';
import { Action } from './types';

interface ReduxWebSocketOptions {
  prefix: string
  reconnectInterval: number
  onOpen?: (s: WebSocket) => void
}

/**
 * ReduxWebSocket
 * @class
 *
 * Manages a WebSocket connection.
 */
export default class ReduxWebSocket {
  // Class options.
  options: ReduxWebSocketOptions;

  // WebSocket connection.
  websocket: WebSocket | null = null;

  // Keep track of how many times we've attempted to reconnect.
  reconnectCount: number = 0;

  // We'll create an interval to try and reconnect if the socket connection breaks.
  reconnectionInterval: NodeJS.Timeout | null = null;

  // Keep track of the last URL we connected to, so that when we automatically
  // try to reconnect, we can connect to the correct URL.
  lastSocketUrl: string | null = null;

  /**
   * Constructor
   * @constructor
   *
   * @param {ReduxWebSocketOptions} options
   */
  constructor(options: ReduxWebSocketOptions) {
    this.options = options;
  }

  /**
   * Handle a broken socket connection.
   *
   * @param {Dispatch} dispatch
   */
  handleBrokenConnection = (dispatch: Dispatch) => {
    const { prefix, reconnectInterval } = this.options;

    this.websocket = null;

    // First, dispatch actions to notify Redux that our connection broke.
    dispatch(broken(prefix));
    dispatch(beginReconnect(prefix));

    this.reconnectCount = 1;

    dispatch(reconnectAttempt(this.reconnectCount, prefix));

    // Attempt to reconnect immediately by calling connect with assertions
    // that the arguments conform to the types we expect.
    this.connect(
      { dispatch } as MiddlewareAPI,
      { payload: { url: this.lastSocketUrl } } as Action,
    );

    // Attempt reconnecting on an interval.
    this.reconnectionInterval = setInterval(() => {
      this.reconnectCount += 1;

      dispatch(reconnectAttempt(this.reconnectCount, prefix));

      // Call connect again, same way.
      this.connect(
        { dispatch } as MiddlewareAPI,
        { payload: { url: this.lastSocketUrl } } as Action,
      );
    }, reconnectInterval);
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

    const { prefix, onOpen } = this.options;

    this.lastSocketUrl = payload.url;
    this.websocket = new WebSocket(payload.url);

    this.websocket.onmessage = (event: MessageEvent) => dispatch(message(event, prefix));
    this.websocket.onopen = (event: Event) => {
      // Clean up any outstanding reconnection attempts.
      if (this.reconnectionInterval) {
        clearInterval(this.reconnectionInterval);

        this.reconnectionInterval = null;
        this.reconnectCount = 0;

        dispatch(reconnected(prefix));
      }

      // Hook to allow consumers to get access to the raw socket.
      if (onOpen && this.websocket != null) {
        onOpen(this.websocket);
      }

      // Now we're fully open and ready to send messages.
      dispatch(open(event, prefix));
    };
    this.websocket.onclose = (event: Event) => {
      const isNull = this.websocket == null;

      dispatch(closed(event, prefix));

      if (!isNull) {
        this.handleBrokenConnection(dispatch);
      }
    };
  }

  /**
   * WebSocket disconnect event handler.
   *
   * @throws {Error} Socket connection must exist.
   */
  disconnect = () => {
    if (this.websocket) {
      this.websocket.close();

      this.websocket = null;
    } else {
      throw new Error(
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
   * @throws {Error} Socket connection must exist.
   */
  send = (_store: MiddlewareAPI, { payload }: Action) => {
    if (this.websocket) {
      this.websocket.send(JSON.stringify(payload));
    } else {
      throw new Error(
        'Socket connection not initialized. Dispatch WEBSOCKET_CONNECT first',
      );
    }
  }
}
