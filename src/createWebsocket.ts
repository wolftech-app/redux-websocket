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

  ws.onopen = (event: Event) => dispatch(open(event));
  ws.onclose = (event: Event) => dispatch(closed(event));
  ws.onmessage = (event: MessageEvent) => dispatch(message(event));

  return ws;
};
