import { action as actionHelper, createAction } from 'typesafe-actions';

import {
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

interface BaseOptions {
  instanceName?: string;
}

const createMetaFromOptions = (options: BaseOptions = {}) => {
  const { instanceName } = options;

  return {
    timestamp: new Date(),
    ...(instanceName ? { instanceName } : undefined),
  };
};

/*
 * ------------------------------------
 * Action creators dispatched by users.
 * ------------------------------------
 */
export const connect = createAction(
  WEBSOCKET_CONNECT,
  action => (
    url: string,
    options?: BaseOptions & { protocols?: string | string[] },
  ) => {
    const { protocols = undefined } = options || {};
    const payload = {
      url,
      ...(protocols ? { protocols } : undefined),
    };

    return action(payload, createMetaFromOptions(options));
  },
);

export const disconnect = createAction(
  WEBSOCKET_DISCONNECT,
  action => (options?: BaseOptions) => (
    action(undefined, createMetaFromOptions(options))
  ),
);

export const send = createAction(
  WEBSOCKET_SEND,
  action => (msg: any, options?: BaseOptions) => (
    action(msg, createMetaFromOptions(options))
  ),
);

/*
 * ------------------------------------
 * Action creators dispatched by redux-websocket.
 * ------------------------------------
 */
export const beginReconnect = createAction(
  WEBSOCKET_BEGIN_RECONNECT,
  action => (options?: BaseOptions) => (
    action(undefined, createMetaFromOptions(options))
  ),
);

export const reconnectAttempt = createAction(
  WEBSOCKET_RECONNECT_ATTEMPT,
  action => (count: number, options?: BaseOptions) => (
    action({ count }, createMetaFromOptions(options))
  ),
);

export const reconnected = createAction(
  WEBSOCKET_RECONNECTED,
  action => (options?: BaseOptions) => (
    action(undefined, createMetaFromOptions(options))
  ),
);

export const open = createAction(
  WEBSOCKET_OPEN,
  action => (event: Event, options?: BaseOptions) => (
    action(event, createMetaFromOptions(options))
  ),
);

export const broken = createAction(
  WEBSOCKET_BROKEN,
  action => (options?: BaseOptions) => (
    action(undefined, createMetaFromOptions(options))
  ),
);

export const closed = createAction(
  WEBSOCKET_CLOSED,
  action => (event: Event, options?: BaseOptions) => (
    action(event, createMetaFromOptions(options))
  ),
);

export const message = createAction(
  WEBSOCKET_MESSAGE,
  action => (event: MessageEvent, options?: BaseOptions) => {
    const payload = {
      event,
      message: event.data,
      origin: event.origin,
    };

    return action(payload, createMetaFromOptions(options));
  },
);

export const error = (
  originalAction: any,
  err: Error,
  options?: BaseOptions,
) => {
  const meta = {
    message: err.message,
    name: err.name,
    originalAction,
    ...createMetaFromOptions(options),
  };

  return actionHelper(WEBSOCKET_ERROR, err, meta, true);
};
