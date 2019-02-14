/* eslint-env browser */

// eslint-disable-next-line no-unused-vars
import { Config } from './types';

/**
 * Formats args for creating the WebSocket instance
 */
const extractArgs = (config: Config) => {
  if (config.args) {
    return config.args;
  }

  if (config.url) {
    return [config.url];
  }

  return [];
};

/**
 * Create a websocket object from the incoming config
 */
// eslint-disable-next-line import/prefer-default-export
export const createWebsocket = (payload: Config): WebSocket => {
  const args = extractArgs(payload);
  const Websocket: any = payload.websocket ? payload.websocket : WebSocket;

  return new Websocket(...args);
};
