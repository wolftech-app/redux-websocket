import { AnyAction } from 'redux';

import { ActionType } from './types';
import { WEBSOCKET_OPEN, WEBSOCKET_CLOSED, WEBSOCKET_MESSAGE } from './actionTypes';

// Build a Redux action.
const buildAction = (
  typeName: ActionType,
  event: Event | MessageEvent,
): AnyAction => ({
  type: typeName,
  payload: {
    event,
    timestamp: new Date(),
  },
});

// Action creators.
export const open = (event: Event) => buildAction(WEBSOCKET_OPEN, event);
export const closed = (event: Event) => buildAction(WEBSOCKET_CLOSED, event);
export const message = (event: MessageEvent) => buildAction(WEBSOCKET_MESSAGE, event);

export default {};
