import { applyMiddleware, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import websocket from '@giantmachines/redux-websocket';

import { instrument } from './components/DevTools';
import { WEBSOCKET_PREFIX } from './constants';
import AppContainer from './containers/AppContainer';
import reducer from './store/reducer';

import './styles/style.scss';

const websocketMiddleware = websocket({
  prefix: WEBSOCKET_PREFIX,
  onOpen: (socket: WebSocket) => {
    // @ts-ignore
    window.__socket = socket; // eslint-disable-line no-underscore-dangle
  },
});

/**
 * Create a custom middleware to make the simulate disconnect feature function
 * as a more interesting demo. Force the middleware to attempt to reconnect
 * an arbitrary number of times.
 */
const disconnectSimulatorMiddleware = () => {
  const OldWebSocket = (window as any).WebSocket;

  return (next: any) => (action: any) => {
    const { type, payload } = action;

    // If the connection breaks, block reconnection by overwriting the WebSocket
    // class with a fake class.
    if (type === `${WEBSOCKET_PREFIX}::BROKEN`) {
      (window as any).WebSocket = class FakeWebSocket {
        close = () => {}
      };
    }

    // Keep track of how many reconnnection attempts were made, and if we had
    // enough, allow a reconnect to happen by restoring the original WebSocket.
    if (type === `${WEBSOCKET_PREFIX}::RECONNECT_ATTEMPT`) {
      const { count } = payload;

      if (count > 2) {
        (window as any).WebSocket = OldWebSocket;
      }
    }

    next(action);
  };
};

const store = createStore(
  reducer,
  compose(
    applyMiddleware(
      disconnectSimulatorMiddleware,
      websocketMiddleware,
    ),
    instrument(),
  ),
);

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('root'),
);
