import { Dispatch, MiddlewareAPI } from 'redux';

import {
  beginReconnect,
  broken,
  closed,
  error,
  message,
  open,
  reconnectAttempt,
  reconnected,
} from './actions';
import { Action } from './types';
import * as actionTypes from './actionTypes';

interface ReduxWebSocketOptions {
  instanceName?: string;
  reconnectInterval: number;
  reconnectOnClose: boolean;
  onOpen?: (s: WebSocket) => void;
}

/**
 * ReduxWebSocket
 * @class
 *
 * Manages a WebSocket connection.
 */
export default class ReduxWebSocket {
  // Class options.
  private options: ReduxWebSocketOptions;

  // WebSocket connection.
  private websocket: WebSocket | null = null;

  // Keep track of how many times we've attempted to reconnect.
  private reconnectCount: number = 0;

  // We'll create an interval to try and reconnect if the socket connection breaks.
  private reconnectionInterval: NodeJS.Timeout | null = null;

  // Keep track of the last URL we connected to, so that when we automatically
  // try to reconnect, we can connect to the correct URL.
  private lastSocketUrl: string | null = null;

  // Keep track of if the WebSocket connection has ever successfully opened.
  private hasOpened = false;

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
   * WebSocket connect event handler.
   *
   * @param {MiddlewareAPI} store
   * @param {Action} action
   */
  connect = ({ dispatch }: MiddlewareAPI, action: Action) => {
    if (action.type !== actionTypes.WEBSOCKET_CONNECT) {
      return;
    }

    const { payload } = action;

    this.close();

    this.lastSocketUrl = payload.url;
    this.websocket = 'protocols' in payload
      ? new WebSocket(payload.url, payload.protocols)
      : new WebSocket(payload.url);

    this.websocket.addEventListener('close', event => this.handleClose(dispatch, event));
    this.websocket.addEventListener('error', () => this.handleError(dispatch));
    this.websocket.addEventListener('open', (event) => {
      this.handleOpen(dispatch, this.options.onOpen, event);
    });
    this.websocket.addEventListener('message', event => this.handleMessage(dispatch, event));
  }

  /**
   * WebSocket disconnect event handler.
   *
   * @throws {Error} Socket connection must exist.
   */
  disconnect = () => {
    if (this.websocket) {
      this.close();
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
  send = (_store: MiddlewareAPI, action: Action) => {
    if (action.type !== actionTypes.WEBSOCKET_SEND) {
      return;
    }

    const { instanceName } = this.options;

    if (this.websocket && 'payload' in action) {
      try {
        this.websocket.send(JSON.stringify(action.payload));
      } catch (err) {
        _store.dispatch(error(action, err, { instanceName }));
      }
    } else {
      const err = new Error(
        'Socket connection not initialized. Dispatch WEBSOCKET_CONNECT first',
      );

      _store.dispatch(error(action, err, { instanceName }));
    }
  }

  /**
   * Handle a close event.
   *
   * @param {Dispatch} dispatch
   * @param {Event} event
   */
  private handleClose = (dispatch: Dispatch, event: Event) => {
    const { instanceName } = this.options;

    dispatch(closed(event, { instanceName }));

    // Conditionally attempt reconnection if enabled and applicable
    const { reconnectOnClose } = this.options;
    if (reconnectOnClose && this.canAttemptReconnect()) {
      this.handleBrokenConnection(dispatch);
    }
  }

  /**
   * Handle an error event.
   *
   * @param {Dispatch} dispatch
   * @param {Event} event
   */
  private handleError = (dispatch: Dispatch) => {
    const { instanceName } = this.options;

    dispatch(error(null, new Error('`redux-websocket` error'), { instanceName }));

    if (this.canAttemptReconnect()) {
      this.handleBrokenConnection(dispatch);
    }
  }

  /**
   * Handle an open event.
   *
   * @param {Dispatch} dispatch
   * @param {(s: WebSocket) => void | undefined} onOpen
   * @param {Event} event
   */
  private handleOpen = (
    dispatch: Dispatch,
    onOpen: ((s: WebSocket) => void) | undefined,
    event: Event,
  ) => {
    const { instanceName } = this.options;

    // Clean up any outstanding reconnection attempts.
    if (this.reconnectionInterval) {
      clearInterval(this.reconnectionInterval);

      this.reconnectionInterval = null;
      this.reconnectCount = 0;

      dispatch(reconnected({ instanceName }));
    }

    // Hook to allow consumers to get access to the raw socket.
    if (onOpen && this.websocket != null) {
      onOpen(this.websocket);
    }

    // Now we're fully open and ready to send messages.
    dispatch(open(event, { instanceName }));

    // Track that we've been able to open the connection. We can use this flag
    // for error handling later, ensuring we don't try to reconnect when a
    // connection was never able to open in the first place.
    this.hasOpened = true;
  }

  /**
   * Handle a message event.
   *
   * @param {Dispatch} dispatch
   * @param {MessageEvent} event
   */
  private handleMessage = (dispatch: Dispatch, event: MessageEvent) => {
    const { instanceName } = this.options;

    dispatch(message(event, { instanceName }));
  }

  /**
   * Close the WebSocket connection.
   * @private
   *
   * @param {number} [code]
   * @param {strin} [reason]
   */
  private close = (code?: number, reason?: string) => {
    if (this.websocket) {
      this.websocket.close(code || 1000, reason || 'WebSocket connection closed by redux-websocket.');

      this.websocket = null;
      this.hasOpened = false;
    }
  }

  /**
   * Handle a broken socket connection.
   * @private
   *
   * @param {Dispatch} dispatch
   */
  private handleBrokenConnection = (dispatch: Dispatch) => {
    const { instanceName, reconnectInterval } = this.options;

    this.websocket = null;

    // First, dispatch actions to notify Redux that our connection broke.
    dispatch(broken({ instanceName }));
    dispatch(beginReconnect({ instanceName }));

    this.reconnectCount = 1;

    dispatch(reconnectAttempt(this.reconnectCount, { instanceName }));

    // Attempt to reconnect immediately by calling connect with assertions
    // that the arguments conform to the types we expect.
    this.connect(
      { dispatch } as MiddlewareAPI,
      { type: actionTypes.WEBSOCKET_CONNECT, payload: { url: this.lastSocketUrl } } as Action,
    );

    // Attempt reconnecting on an interval.
    this.reconnectionInterval = setInterval(() => {
      this.reconnectCount += 1;

      dispatch(reconnectAttempt(this.reconnectCount, { instanceName }));

      // Call connect again, same way.
      this.connect(
        { dispatch } as MiddlewareAPI,
        { type: actionTypes.WEBSOCKET_CONNECT, payload: { url: this.lastSocketUrl } } as Action,
      );
    }, reconnectInterval);
  }

  // Only attempt to reconnect if the connection has ever successfully opened,
  // and we're not currently trying to reconnect.
  //
  // This prevents ongoing reconnect loops to connections that have not
  // successfully opened before, such as net::ERR_CONNECTION_REFUSED errors.
  //
  // This also prevents starting multiple reconnection attempt loops.
  private canAttemptReconnect(): boolean {
    return this.hasOpened && this.reconnectionInterval == null;
  }
}
