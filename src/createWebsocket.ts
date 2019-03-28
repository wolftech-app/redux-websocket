/* eslint-env browser */

import { Dispatch } from 'redux';

import {
  closed,
  message,
  open,
} from './actions';
import { Options } from './types';

/**
 * Instantiate a WebSocket, with it's event listener functions wrapped in
 * a call to `dispatch`.
 */
export default (dispatch: Dispatch, url: string, options: Options) => {
  const { prefix } = options;

  // Instantiate the websocket.
  const ws = new WebSocket(url);
  ws.onopen = (event: Event) => dispatch(open(event, prefix));
  ws.onclose = (event: Event) => dispatch(closed(event, prefix));
  ws.onmessage = (event: MessageEvent) => dispatch(message(event, prefix));

  return ws;
};
