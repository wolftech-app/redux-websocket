import {
  WEBSOCKET_CLOSED,
  WEBSOCKET_CONNECT,
  WEBSOCKET_DISCONNECT,
  WEBSOCKET_MESSAGE,
  WEBSOCKET_OPEN,
  WEBSOCKET_SEND,
} from './actionTypes';

export interface Config {
  url: string;
}

export interface ActionTypes {
  readonly WEBSOCKET_CLOSED: typeof WEBSOCKET_CLOSED;
  readonly WEBSOCKET_CONNECT: typeof WEBSOCKET_CONNECT;
  readonly WEBSOCKET_DISCONNECT: typeof WEBSOCKET_DISCONNECT;
  readonly WEBSOCKET_MESSAGE: typeof WEBSOCKET_MESSAGE;
  readonly WEBSOCKET_OPEN: typeof WEBSOCKET_OPEN;
  readonly WEBSOCKET_SEND: typeof WEBSOCKET_SEND;
}

type ActionType =
  | typeof WEBSOCKET_CLOSED
  | typeof WEBSOCKET_CONNECT
  | typeof WEBSOCKET_DISCONNECT
  | typeof WEBSOCKET_MESSAGE
  | typeof WEBSOCKET_OPEN
  | typeof WEBSOCKET_SEND

// Huh? https://github.com/babel/babel/issues/6065#issuecomment-453901877
/* eslint-disable no-undef */
export {
  ActionType,
};
/* eslint-enable no-undef */
