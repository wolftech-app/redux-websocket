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
