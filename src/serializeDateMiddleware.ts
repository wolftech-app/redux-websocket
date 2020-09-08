import { Dispatch, MiddlewareAPI, AnyAction } from 'redux';

import { Action } from './types';

/**
 * Create a middleware to serialize the timestamp on meta
 *
 * @returns {Middleware}
 */
export default (_store: MiddlewareAPI) => (next: Dispatch<AnyAction>) => (
  action: Action
) => {
  if (action.meta && action.meta.timestamp && action.meta.isReduxWebsocket) {
    action.meta.timestamp = JSON.stringify(action.meta.timestamp);
  }

  return next(action);
};
