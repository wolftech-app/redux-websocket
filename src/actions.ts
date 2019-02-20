import {
  WEBSOCKET_CLOSED,
  WEBSOCKET_CONNECT,
  WEBSOCKET_DISCONNECT,
  WEBSOCKET_MESSAGE,
  WEBSOCKET_OPEN,
  WEBSOCKET_SEND,
} from './actionTypes';
import { /* Action, */ ActionType } from './types';

const buildAction = (
  actionType: ActionType,
  event: Event | MessageEvent,
// TODO (brianmcallister) - Figure out a way to type this correctly.
// See: https://medium.com/@martin_hotell/improved-redux-type-safety-with-typescript-2-8-2c11a8062575
): any => ({
  type: actionType,
  payload: {
    event,
    timestamp: new Date(),
  },
});

export const closed = (event: Event) => buildAction(WEBSOCKET_CLOSED, event);
export const connect = (event: Event) => buildAction(WEBSOCKET_CONNECT, event);
export const disconnect = (event: Event) => buildAction(WEBSOCKET_DISCONNECT, event);
export const message = (event: MessageEvent) => buildAction(WEBSOCKET_MESSAGE, event);
export const open = (event: Event) => buildAction(WEBSOCKET_OPEN, event);
export const send = (event: Event) => buildAction(WEBSOCKET_SEND, event);
