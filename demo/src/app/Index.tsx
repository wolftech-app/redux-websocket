import { applyMiddleware, compose, createStore } from 'redux';
import { Provider } from 'react-redux';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import reducer from './store/reducer';
import websocket from '@giantmachines/redux-websocket';

import { instrument } from './components/DevTools';
import { WEBSOCKET_PREFIX } from './constants';
import AppContainer from './containers/AppContainer';

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
    <AppContainer />
  </Provider>,
  document.getElementById('root'),
);
