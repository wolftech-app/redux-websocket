/* eslint-env browser */

import { Dispatch } from 'redux';

import {
  closed,
  message,
  open,
} from './actions';

/**
 * Instantiate a WebSocket, with it's event listener functions wrapped in
 * a call to `dispatch`.
 */
export default (dispatch: Dispatch, url: string) => {
  // Instantiate the websocket.
  const ws = new WebSocket(url);
// @ts-ignore
  ws.onopen = (event: Event) => console.log('LIB: we.onOpen event', event) || dispatch(open(event));
  ws.onclose = (event: Event) => dispatch(closed(event));
// @ts-ignore
  ws.onmessage = (event: MessageEvent) => console.log('LIB: we.onMessage event', message(event)) || dispatch(message(event));

  return ws;
};
