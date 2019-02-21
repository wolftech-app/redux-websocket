import {
  WEBSOCKET_CONNECT,
  WEBSOCKET_SEND,
  WEBSOCKET_DISCONNECT,
} from '@giantmachines/redux-websocket';
// @ts-ignore
export const websocketSend = (payload) => console.log('in action', payload) || ({
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
