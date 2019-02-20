import {
  WEBSOCKET_CONNECT,
  WEBSOCKET_SEND,
  WEBSOCKET_DISCONNECT,
} from '@giantmachines/redux-websocket';

export const websocketSend = (payload) => ({
  type: WEBSOCKET_SEND,
  payload,
});

export const websocketConnect = (payload) => ({
  type: WEBSOCKET_CONNECT,
  payload,
});

export const websocketDisconnect = {
  type: WEBSOCKET_DISCONNECT,
}
