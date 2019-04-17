import {
  REDUX_WEBSOCKET_CONNECT,
  REDUX_WEBSOCKET_DISCONNECT,
  REDUX_WEBSOCKET_SEND,
} from './actionTypes';

export const websocketSend = payload => ({
  type: REDUX_WEBSOCKET_SEND,
  payload,
});

export const websocketConnect = payload => ({
  type: REDUX_WEBSOCKET_CONNECT,
  payload,
});

export const websocketDisconnect = {
  type: REDUX_WEBSOCKET_DISCONNECT,
};
