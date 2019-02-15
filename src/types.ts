import { WEBSOCKET_OPEN, WEBSOCKET_CLOSED, WEBSOCKET_MESSAGE } from './actionTypes';

export interface Config {
  url: string;
}

type ActionType =
  | typeof WEBSOCKET_OPEN
  | typeof WEBSOCKET_CLOSED
  | typeof WEBSOCKET_MESSAGE;

// Huh? https://github.com/babel/babel/issues/6065#issuecomment-453901877
// eslint-disable-next-line no-undef
export { ActionType };
