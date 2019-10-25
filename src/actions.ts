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

const createMetaObj = (instanceName?: string) => ({
  timestamp: new Date(),
  ...(instanceName ? { instanceName } : undefined),
});

/*
 * ------------------------------------
 * Action creators dispatched by users.
 * ------------------------------------
 */
export const connect = createAction(
  WEBSOCKET_CONNECT,
  action => (
    url: string,
    options: { protocols?: string | string[]; instanceName?: string } = {},
  ) => {
    const { protocols, instanceName } = options;
    const payload = {
      url,
      ...(protocols ? { protocols } : undefined),
    };
    const meta = createMetaObj(instanceName);

    return action(payload, meta);
  },
);

export const disconnect = createAction(
  WEBSOCKET_DISCONNECT,
  action => (options: { instanceName?: string } = {}) => {
    const { instanceName } = options;
    const meta = createMetaObj(instanceName);

    return action(undefined, meta);
  },
);

export const send = createAction(
  WEBSOCKET_SEND,
  action => (msg: any, options: { instanceName?: string } = {}) => {
    const { instanceName } = options;
    const meta = createMetaObj(instanceName);

    return action(msg, meta);
  },
);

/*
 * ------------------------------------
 * Action creators dispatched by redux-websocket.
 * ------------------------------------
 */
export const beginReconnect = createAction(
  WEBSOCKET_BEGIN_RECONNECT,
  action => (options: { instanceName?: string } = {}) => {
    const { instanceName } = options;
    const meta = createMetaObj(instanceName);

    return action(undefined, meta);
  },
);

export const reconnectAttempt = createAction(
  WEBSOCKET_RECONNECT_ATTEMPT,
  action => (count: number, options: { instanceName?: string } = {}) => {
    const { instanceName } = options;
    const meta = createMetaObj(instanceName);

    return action({ count }, meta);
  },
);

export const reconnected = createAction(
  WEBSOCKET_RECONNECTED,
  action => (options: { instanceName?: string } = {}) => {
    const { instanceName } = options;
    const meta = createMetaObj(instanceName);

    return action(undefined, meta);
  },
);

export const open = createAction(
  WEBSOCKET_OPEN,
  action => (event: Event, options: { instanceName?: string } = {}) => {
    const { instanceName } = options;
    const meta = createMetaObj(instanceName);

    return action(event, meta);
  },
);

export const broken = createAction(
  WEBSOCKET_BROKEN,
  action => (options: { instanceName?: string } = {}) => {
    const { instanceName } = options;
    const meta = createMetaObj(instanceName);

    return action(undefined, meta);
  },
);

export const closed = createAction(
  WEBSOCKET_CLOSED,
  action => (event: Event, options: { instanceName?: string } = {}) => {
    const { instanceName } = options;
    const meta = createMetaObj(instanceName);

    return action(event, meta);
  },
);

export const message = createAction(
  WEBSOCKET_MESSAGE,
  action => (event: MessageEvent, options: { instanceName?: string } = {}) => {
    const { instanceName } = options;
    const meta = createMetaObj(instanceName);
    const payload = {
      event,
      message: event.data,
      origin: event.origin,
    };

    return action(payload, meta);
  },
);

export const error = (
  originalAction: any,
  err: Error,
  options: { instanceName?: string } = {},
) => {
  const { instanceName } = options;
  const meta = {
    message: err.message,
    name: err.name,
    originalAction,
    ...createMetaObj(instanceName),
  };

  return actionHelper(WEBSOCKET_ERROR, err, meta, true);
};
