import {
  WEBSOCKET_CONNECT,
  WEBSOCKET_SEND,
} from '@giantmachines/redux-websocket';

export const websocketSend = (payload) => ({
  type: WEBSOCKET_SEND,
  payload,
});

export const websocketConnect = (payload) => ({
  type: WEBSOCKET_CONNECT,
  payload,
});
