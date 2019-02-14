// eslint-disable-next-line import/no-cycle
import {
  WEBSOCKET_CLOSED,
  WEBSOCKET_MESSAGE,
  WEBSOCKET_OPEN,
} from './index';

// These actions are more concerned with connection state
// and are trigged async by the WebSocketMiddleware

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
