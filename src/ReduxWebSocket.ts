import { Dispatch, MiddlewareAPI } from 'redux';
import retry from 'retry';

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
import { Action, Serializer, Deserializer } from './types';

interface ReduxWebSocketOptions {
  prefix: string;
  reconnectInterval: number;
  reconnectOnClose: boolean;
  onOpen?: (s: WebSocket) => void;
  serializer?: Serializer;
  deserializer?: Deserializer;
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

  private retryOperation: retry.RetryOperation | null = null;

  /**
   * Constructor
   * @constructor
   *
   * @param {ReduxWebSocketOptions} options
   */
  constructor(options: ReduxWebSocketOptions) {
    this.options = options;
    this.retryOperation = retry.operation({
      forever: true,
      minTimeout: options.reconnectInterval,
    });
  }

  /**
   * WebSocket connect event handler.
   *
   * @param {MiddlewareAPI} store
   * @param {Action} action
   */
  connect = (middlewareApi: MiddlewareAPI, action: Action) => {
    const { dispatch } = middlewareApi;
    const { prefix } = this.options;

    if (this.retryOperation) {
      this.retryOperation.attempt((currentAttempt) => {
        console.log('ATTEMPT', currentAttempt);

        // Only dispatch beginReconnect once
        // TODO: verify that this is zero in demo, update tests setup since attempts show as 1 in tests
        if (currentAttempt === 0) {
          dispatch(beginReconnect(prefix));
        }

        // The 3rd parameter is the callback() invoked onClose/onError
        const retryCb = (err?: Error) => {
          console.log('IN CALLBACK');
          if (this.retryOperation) {
            this.retryOperation.retry(err);
          }
        };
        this.attempt(middlewareApi, action, retryCb, currentAttempt);
      });
    }
  };

  attempt = async (
    { dispatch }: MiddlewareAPI,
    { payload }: Action,
    retryCallback: (err?: Error | undefined) => void,
    currentAttempt: number
  ) => {
    this.close();

    const { deserializer, prefix, reconnectOnClose } = this.options;

    this.websocket = payload.protocols
      ? new WebSocket(payload.url, payload.protocols)
      : new WebSocket(payload.url);

    this.websocket.addEventListener('close', (event) => {
      console.log('CLOSE', event);
      if (reconnectOnClose) {
        // TODO: better error message?
        retryCallback(new Error('`redux-websocket` error'));
      }
      this.handleClose(dispatch, prefix, event);
    });
    this.websocket.addEventListener('error', () => {
      console.log('ERROR');
      retryCallback(new Error('`redux-websocket` error'));
      this.handleError(dispatch, prefix);
    });
    this.websocket.addEventListener('open', (event) => {
      // Only dispatch after succesful re-connect
      console.log({ currentAttempt });
      // TODO: verify currentAttempt > 0 or currentAttempt > 1?
      if (currentAttempt > 0) {
        console.log('calling reconnected line 115');
        dispatch(reconnected(prefix));
      }

      // reset internal state of retry instance if open/reconnected
      if (this.retryOperation) {
        this.retryOperation.reset();
      }

      this.handleOpen(dispatch, prefix, this.options.onOpen, event);
    });
    this.websocket.addEventListener('message', (event) =>
      this.handleMessage(dispatch, prefix, deserializer, event)
    );
  };

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
        'Socket connection not initialized. Dispatch WEBSOCKET_CONNECT first'
      );
    }
  };

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
      if (this.options.serializer) {
        this.websocket.send(this.options.serializer(payload));
      } else {
        throw new Error('Serializer not provided');
      }
    } else {
      throw new Error(
        'Socket connection not initialized. Dispatch WEBSOCKET_CONNECT first'
      );
    }
  };

  /**
   * Handle a close event.
   *
   * @param {Dispatch} dispatch
   * @param {string} prefix
   * @param {Event} event
   */
  private handleClose = (dispatch: Dispatch, prefix: string, event: Event) => {
    dispatch(closed(event, prefix));
  };

  /**
   * Handle an error event.
   *
   * @param {Dispatch} dispatch
   * @param {string} prefix
   * @param {Event} event
   */
  private handleError = (dispatch: Dispatch, prefix: string) => {
    dispatch(error(null, new Error('`redux-websocket` error'), prefix));
  };

  /**
   * Handle an open event.
   *
   * @param {Dispatch} dispatch
   * @param {string} prefix
   * @param {(s: WebSocket) => void | undefined} onOpen
   * @param {Event} event
   */
  private handleOpen = (
    dispatch: Dispatch,
    prefix: string,
    onOpen: ((s: WebSocket) => void) | undefined,
    event: Event
  ) => {
    // Hook to allow consumers to get access to the raw socket.
    if (onOpen && this.websocket != null) {
      onOpen(this.websocket);
    }

    // Now we're fully open and ready to send messages.
    dispatch(open(event, prefix));
  };

  /**
   * Handle a message event.
   *
   * @param {Dispatch} dispatch
   * @param {string} prefix
   * @param {MessageEvent} event
   */
  private handleMessage = (
    dispatch: Dispatch,
    prefix: string,
    deserializer: Deserializer | undefined,
    event: MessageEvent
  ) => {
    dispatch(message(event, prefix, deserializer));
  };

  /**
   * Close the WebSocket connection.
   * @private
   *
   * @param {number} [code]
   * @param {string} [reason]
   */
  private close = (code?: number, reason?: string) => {
    if (this.websocket) {
      this.websocket.close(
        code || 1000,
        reason || 'WebSocket connection closed by redux-websocket.'
      );

      this.websocket = null;
    }
  };
}
