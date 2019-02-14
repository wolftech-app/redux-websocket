// Library dispatched action types.
export const WEBSOCKET_OPEN = 'WEBSOCKET:OPEN';
export const WEBSOCKET_CLOSED = 'WEBSOCKET:CLOSED';
export const WEBSOCKET_MESSAGE = 'WEBSOCKET:MESSAGE';

// User dispatched action types.
export const WEBSOCKET_CONNECT = 'WEBSOCKET:CONNECT';
export const WEBSOCKET_DISCONNECT = 'WEBSOCKET:DISCONNECT';
export const WEBSOCKET_SEND = 'WEBSOCKET:SEND';

export const open = (event: Event) => ({
  payload: {
    event,
    timestamp: new Date(),
  },
  type: WEBSOCKET_OPEN,
});

export const closed = (event: Event) => ({
  payload: {
    event,
    timestamp: new Date(),
  },
  type: WEBSOCKET_CLOSED,
});

export const message = (event: MessageEvent) => ({
  payload: {
    data: event.data,
    event,
    timestamp: new Date(),
  },
  type: WEBSOCKET_MESSAGE,
});

export default {};
