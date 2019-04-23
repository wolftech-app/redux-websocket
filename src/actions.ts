import {
  DEFAULT_PREFIX,
  WEBSOCKET_BROKEN,
  WEBSOCKET_BEGIN_RECONNECT,
  WEBSOCKET_RECONNECT_ATTEMPT,
  WEBSOCKET_RECONNECTED,
  WEBSOCKET_CLOSED,
  WEBSOCKET_CONNECT,
  WEBSOCKET_DISCONNECT,
  WEBSOCKET_ERROR,
  WEBSOCKET_MESSAGE,
  WEBSOCKET_OPEN,
  WEBSOCKET_SEND,
} from './actionTypes';
import { Action } from './types';

type BuiltAction<T> = {
  type: string,
  meta: {
    timestamp: Date,
  },
  payload?: T,
}

function buildAction<T>(actionType: string, payload?: T): BuiltAction<T> {
  const base = {
    type: actionType,
    meta: { timestamp: new Date() },
  };

  return payload ? { ...base, payload } : base;
}

// Action creators for user dispatched actions.
export const connect = (url: string, prefix?: string) => buildAction(`${prefix || DEFAULT_PREFIX}::${WEBSOCKET_CONNECT}`, { url });
export const disconnect = (prefix?: string) => buildAction(`${prefix || DEFAULT_PREFIX}::${WEBSOCKET_DISCONNECT}`);
export const send = (msg: any, prefix?: string) => buildAction(`${prefix || DEFAULT_PREFIX}::${WEBSOCKET_SEND}`, msg);

// Action creators for actions dispatched by redux-websocket.
export const beginReconnect = (prefix: string) => buildAction(`${prefix}::${WEBSOCKET_BEGIN_RECONNECT}`);
export const reconnectAttempt = (count: number, prefix: string) => buildAction(`${prefix}::${WEBSOCKET_RECONNECT_ATTEMPT}`, { count });
export const reconnected = (prefix: string) => buildAction(`${prefix}::${WEBSOCKET_RECONNECTED}`);

export const closed = (event: Event, prefix: string) => buildAction(`${prefix}::${WEBSOCKET_CLOSED}`, event);
export const message = (event: MessageEvent, prefix: string) => {
  const payload = {
    event,
    message: event.data,
    origin: event.origin,
  };

  return buildAction(`${prefix}::${WEBSOCKET_MESSAGE}`, payload);
};
export const open = (event: Event, prefix: string) => buildAction(`${prefix}::${WEBSOCKET_OPEN}`, event);
export const broken = (prefix: string) => buildAction(`${prefix}::${WEBSOCKET_BROKEN}`);
export const error = (originalAction: Action | null, err: Error, prefix: string) => (
  buildAction(`${prefix}::${WEBSOCKET_ERROR}`, {
    message: err.message,
    name: err.name,
    originalAction,
  })
);
