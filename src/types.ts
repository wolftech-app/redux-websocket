import {
  WEBSOCKET_CLOSED,
  WEBSOCKET_CONNECT,
  WEBSOCKET_DISCONNECT,
  WEBSOCKET_MESSAGE,
  WEBSOCKET_OPEN,
  WEBSOCKET_SEND,
} from './actionTypes';

type ActionType =
  | typeof WEBSOCKET_CLOSED
  | typeof WEBSOCKET_CONNECT
  | typeof WEBSOCKET_DISCONNECT
  | typeof WEBSOCKET_MESSAGE
  | typeof WEBSOCKET_OPEN
  | typeof WEBSOCKET_SEND;

type Action =
  | { type: typeof WEBSOCKET_CLOSED, payload: any }
  | { type: typeof WEBSOCKET_CONNECT, payload: any }
  | { type: typeof WEBSOCKET_DISCONNECT, payload: any }
  | { type: typeof WEBSOCKET_MESSAGE, payload: any }
  | { type: typeof WEBSOCKET_OPEN, payload: any }
  | { type: typeof WEBSOCKET_SEND, payload: any };

type Options = {
  prefix?: string
  reconnectInterval?: number
  onOpen?: (s: WebSocket) => void
}

// Huh? https://github.com/babel/babel/issues/6065#issuecomment-453901877
/* eslint-disable no-undef */
export {
  Action,
  ActionType,
  Options,
};
/* eslint-enable no-undef */
