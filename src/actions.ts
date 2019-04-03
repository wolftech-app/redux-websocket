import {
  WEBSOCKET_CLOSED,
  WEBSOCKET_CONNECT,
  WEBSOCKET_DISCONNECT,
  WEBSOCKET_MESSAGE,
  WEBSOCKET_OPEN,
  WEBSOCKET_SEND,
  WEBSOCKET_ERROR,
} from './actionTypes';
import { Action } from './types';

type BuiltAction<T> = {
  type: string,
  payload: {
    event: T,
    timestamp: Date,
  }
}

function buildAction<T>(actionType: string, event: T): BuiltAction<T> {
  return {
    type: actionType,
    payload: {
      event,
      timestamp: new Date(),
    },
  };
}

export const closed = (event: Event, prefix: string) => buildAction(`${prefix}::${WEBSOCKET_CLOSED}`, event);
export const connect = (event: Event, prefix: string) => buildAction(`${prefix}::${WEBSOCKET_CONNECT}`, event);
export const disconnect = (event: Event, prefix: string) => buildAction(`${prefix}::${WEBSOCKET_DISCONNECT}`, event);
export const message = (event: MessageEvent, prefix: string) => buildAction(`${prefix}::${WEBSOCKET_MESSAGE}`, event);
export const open = (event: Event, prefix: string) => buildAction(`${prefix}::${WEBSOCKET_OPEN}`, event);
export const send = (event: Event, prefix: string) => buildAction(`${prefix}::${WEBSOCKET_SEND}`, event);

export const error = (originalAction: Action, err: Error, prefix: string) => ({
  type: `${prefix}::${WEBSOCKET_ERROR}`,
  payload: {
    message: err.message,
    name: err.name,
    originalAction,
  },
});
