import {
  WEBSOCKET_CLOSED,
  WEBSOCKET_MESSAGE,
  WEBSOCKET_OPEN,
} from '@giantmachines/redux-websocket';

import defaultState from './defaultState';

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case WEBSOCKET_OPEN:
      return {
        ...state,
        connected: true,
      };

    case WEBSOCKET_CLOSED:
      return {
        ...state,
        connected: false,
      }

    case WEBSOCKET_MESSAGE:
      return {
        ...state,
        messages: [
          action.payload,
          ...state.messages,
        ].slice(0,50),
      };

    default:
      return state;
  }
}

export default reducer;
