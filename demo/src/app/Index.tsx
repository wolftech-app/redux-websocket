import * as React from 'react';
import * as ReactDOM from 'react-dom';

import websocket from '@giantmachines/redux-websocket';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import reducer from './store/reducer';

import App from './components/App';
import { instrument } from './components/DevTools';
import { WEBSOCKET_PREFIX } from './constants';

import './styles/style.scss';

const websocketMiddleware = websocket({ prefix: WEBSOCKET_PREFIX });

const store = createStore(
  reducer,
  compose(
    applyMiddleware(websocketMiddleware),
    instrument(),
  ),
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
