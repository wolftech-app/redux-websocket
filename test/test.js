/* eslint-env mocha */

import expect from 'expect';
import td from 'testdouble';

import { createWebsocket } from '../src/websocket';
import middleware from '../src/';

class Socket {
  constructor(url) {
    this.url = url;
  }
}

global.WebSocket = Socket;

describe('middleware', () => {
  it('should be a curried function that calls next(action)', () => {
    const action = {};
    const next = td.func('next');

    middleware()(next)(action);

    td.verify(next(action));
  });

  context('createWebsocket', () => {
    it('should accept a default payload', () => {
      const payload = { url: 'ws://localhost' };
      const ws = createWebsocket(payload);

      expect(ws).toBeA(Socket);
      expect(ws.url).toEqual(payload.url);
    });

    it('accepts an alternative WebSocket', () => {
      const ws = createWebsocket({ websocket: Socket });

      expect(ws).toBeA(Socket);
    });
  });
});
