import * as React from 'react';
import * as ReactDOM from 'react-dom';
import Index from './components/Index';

import websocket from '@giantmachines/redux-websocket';
import { Provider } from 'react-redux';
import { applyMiddleware, compose, createStore } from 'redux';
import DevTools, { instrument } from './components/DevTools';
import reducer from './store/reducer';

import './styles/style.scss';

const store = createStore(reducer, compose(
  applyMiddleware(websocket),
  instrument()
));

ReactDOM.render(
  <Provider store={store}>
    <Index />
    <DevTools/>
  </Provider>,
  document.getElementById('root')
);

declare let module: any;

if (module.hot) {
  module.hot.accept();
}
