import * as React from 'react';
import * as ReactDOM from 'react-dom';

import websocket from '@giantmachines/redux-websocket';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import reducer from './store/reducer';

import App from './components/App';
import { instrument } from './components/DevTools';

import './styles/style.scss';

const store = createStore(reducer, compose(
  applyMiddleware(websocket),
  instrument()
));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

declare let module: any;

if (module.hot) {
  module.hot.accept();
}
