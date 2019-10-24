import {
  WEBSOCKET_CLOSED,
  WEBSOCKET_CONNECT,
  WEBSOCKET_DISCONNECT,
  WEBSOCKET_MESSAGE,
  WEBSOCKET_OPEN,
  WEBSOCKET_SEND,
  WEBSOCKET_ERROR,
} from './actionTypes';

type ActionType =
  | typeof WEBSOCKET_CLOSED
  | typeof WEBSOCKET_CONNECT
  | typeof WEBSOCKET_DISCONNECT
  | typeof WEBSOCKET_MESSAGE
  | typeof WEBSOCKET_OPEN
  | typeof WEBSOCKET_SEND;

interface Meta {
  timestamp: string;
  instanceName?: string;
}

interface ClosedAction {
  type: typeof WEBSOCKET_CLOSED;
  meta: Meta;
}

interface ConnectAction {
  type: typeof WEBSOCKET_CONNECT;
  payload: {
    url: string;
    protocols?: string | string[];
  };
  meta: Meta;
}

interface DisconnectAction {
  type: typeof WEBSOCKET_DISCONNECT;
  meta: Meta;
}

interface MessageAction {
  type: typeof WEBSOCKET_MESSAGE;
  payload: string;
  meta: Meta;
}

interface OpenAction {
  type: typeof WEBSOCKET_OPEN;
  meta: Meta;
}

interface SendAction {
  type: typeof WEBSOCKET_SEND;
  meta: Meta;
  payload: any;
}

interface ErrorAction {
  type: typeof WEBSOCKET_ERROR;
  error: true;
  meta: Meta & {
    message: string;
    name: string;
    originalAction: any;
  };
}

type Action =
  | ClosedAction
  | ConnectAction
  | DisconnectAction
  | MessageAction
  | OpenAction
  | SendAction
  | ErrorAction;

type Options = {
  prefix?: string
  instanceName?: string;
  reconnectInterval?: number
  reconnectOnClose?: boolean
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
