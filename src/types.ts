import { ActionType } from 'typesafe-actions';

import * as actions from './actions';

type Action = ActionType<typeof actions>;

type Options = {
  prefix?: string
  instanceName?: string;
  reconnectInterval?: number
  reconnectOnClose?: boolean
  onOpen?: (s: WebSocket) => void
}

/* eslint-disable-next-line no-undef */
export { Action, Options };
