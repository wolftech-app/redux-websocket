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
import { Action } from './types';

type WithProtocols = [string[]] | [string[], string];
type WithInstanceName = [string];
type ConnectRestArgs = [] | WithProtocols | WithInstanceName;

type BuiltAction<T> = {
  type: string,
  meta: {
    instanceName?: string,
  },
  payload?: T,
}

interface UserProvidedMeta {
  instanceName?: string;
}

/**
 * Determine if the rest args to `connect` contains protocols or not.
 * @private
 */
const isWithProtocols = (args: ConnectRestArgs): args is WithProtocols => Array.isArray(args[0]);

/**
 * Create an FSA compliant action.
 *
 * @param {string} actionType
 * @param {T} payload
 *
 * @returns {BuiltAction<T>}
 */
function buildAction<T>(actionType: string, payload?: T, meta?: UserProvidedMeta): BuiltAction<T> {
  const base = {
    type: actionType,
    meta,
    // Mixin the `error` key if the payload is an Error.
    ...(payload instanceof Error ? { error: true } : null),
  };

  return payload ? { ...base, payload } : base;
}

// Action creators for user dispatched actions. These actions are all optionally
// prefixed.
export const connect = (url: string, ...args: ConnectRestArgs) => {
  let instanceName: string | undefined;
  let protocols: string[] | undefined;

  // If there's only one argument, check if it's protocols or a instanceName.
  if (args.length === 1) {
    [protocols, instanceName] = isWithProtocols(args) ? args : [undefined, args[0]];
  }

  // If there are two arguments after `url`, assume it's protocols and instanceName.
  if (args.length === 2) {
    [protocols, instanceName] = args;
  }

  return buildAction(
    WEBSOCKET_CONNECT,
    { url, protocols },
    { instanceName },
  );
};

export const disconnect = (instanceName?: string) =>
  buildAction(WEBSOCKET_DISCONNECT, undefined, { instanceName });

export const send = (msg: any, instanceName?: string) =>
  buildAction(WEBSOCKET_SEND, msg, { instanceName });

// Action creators for actions dispatched by redux-websocket. All of these must
// take a prefix. The default prefix should be used unless a user has created
// this middleware with the prefix option set.
export const beginReconnect = (instanceName: string) =>
  buildAction(WEBSOCKET_BEGIN_RECONNECT, undefined, { instanceName });

export const reconnectAttempt = (count: number, instanceName: string) =>
  buildAction(WEBSOCKET_RECONNECT_ATTEMPT, { count }, { instanceName });

export const reconnected = (instanceName: string) =>
  buildAction(WEBSOCKET_RECONNECTED, undefined, { instanceName });

export const open = (event: Event, instanceName: string) =>
  buildAction(WEBSOCKET_OPEN, event, { instanceName });

export const broken = (instanceName: string) =>
  buildAction(WEBSOCKET_BROKEN, undefined, { instanceName });

export const closed = (event: Event, instanceName: string) =>
  buildAction(WEBSOCKET_CLOSED, event, { instanceName });

export const message = (event: MessageEvent, instanceName: string) => (
  buildAction(
    WEBSOCKET_MESSAGE,
    {
      event,
      message: event.data,
      origin: event.origin,
    },
    { instanceName },
  )
);

export const error = (originalAction: Action | null, err: Error, instanceName: string) => (
  buildAction(
    WEBSOCKET_ERROR,
    err,
    {
      message: err.message,
      name: err.name,
      originalAction,
      instanceName,
    },
  )
);
