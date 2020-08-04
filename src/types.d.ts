import { Middleware, MiddlewareAPI } from 'redux';
import { connect } from 'http2';
import { disconnect } from 'cluster';

type Serializer = (
  payload: any
) => string | ArrayBuffer | ArrayBufferView | Blob;

type OldOptions = {
  prefix?: string;
  reconnectInterval?: number;
  reconnectOnClose?: boolean;
  onOpen?: (s: WebSocket) => void;
  serializer?: Serializer;
};

type Options = {
  // prefix?: string;
  reconnectInterval?: number;
  reconnectOnClose?: boolean;
  onOpen?: (s: WebSocket) => void;
  serializer?: Serializer;
};

declare function createMiddleware(options?: Options): Middleware;

/**
 * Middleware
 * - Creating the ReduxWebSocket instance
 * - Routing actions to the proper ReduxWebSocket instance method
 *
 * ReduxWebSocketsManager
 * - This class would route connect, send, and disconnect actions to the proper ReduxWebSocket instance
 * { connections: { [url: string]: ReduxWebSocket } }
 *
 * ReduxWebSocket class
 * - Handles a single websocket lifecycle
 *
 * User Actions
 * - Connect
 * - Send
 * - Disconnect
 *
 * Internal Actions
 *
 * ws://localhost:8080
 * ws://localhost:8081
 *
 *
 */

createMiddleware;
new ReduxWebSocketsManager();
Whenever connect, disconnect, send are dispatched send to ReduxWebSocketsManager
ReduxWebSocketsManager onConnect ReduxWebSocketsManager.connection

class ReduxWebSocketsManager {
  // Class options.
  private connections: { [url: string]: ReduxWebSocket };
  constructor(options) {
    this.options = options;
    this.connections = {};
  }

  onConnect(connectAction: { payload: {id: string} }) {
    const connection = this.connections[connectAction.payload.url] || new ReduxWebSocket(this.options);
    connection.connect(connectAction);
  }

  onDisconnect(disconnectAction) {
    const connection = this.connections[connectAction.payload.url] || new ReduxWebSocket(this.options);
    connection.connect(connectAction);
  }

  onSend(sendAction) {
    const connection = this.connections[connectAction.payload.url] || new ReduxWebSocket(this.options);
    connection.connect(connectAction);
  }
}