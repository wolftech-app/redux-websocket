import {
  WEBSOCKET_CLOSED,
  WEBSOCKET_CONNECT,
  WEBSOCKET_MESSAGE,
  WEBSOCKET_OPEN,
  WEBSOCKET_SEND,
} from '@giantmachines/redux-websocket';

import defaultState, { State } from './defaultState';

export const getConnected = state => state.connected;

const reducer = (state = defaultState, action): State => {
  switch (action.type) {
    case WEBSOCKET_CONNECT:
      return {
        ...state,
        url: action.payload.url,
      };

    case WEBSOCKET_OPEN:
      return {
        ...state,
        connected: true,
      };

    case WEBSOCKET_CLOSED:
      return {
        ...state,
        connected: false,
      };

    case WEBSOCKET_MESSAGE:
      return {
        ...state,
        messages: [
          ...state.messages,
          {
            data: JSON.parse(action.payload.event.data),
            origin: action.payload.event.origin,
            timestamp: action.payload.timestamp,
            type: 'INCOMING',
          },
        ],
      };

    case WEBSOCKET_SEND:
      return {
        ...state,
        messages: [
          ...state.messages,
          {
            data: action.payload,
            origin: window.location.origin,
            timestamp: new Date(),
            type: 'OUTGOING',
          },
        ],
      };

    default:
      return state;
  }
};

export default reducer;
