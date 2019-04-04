import ReduxWebSocket from '../src/ReduxWebSocket';
import createWebsocket from '../src/createWebsocket';
import { Action, Options } from '../src/types';

jest.mock('../src/createWebsocket');

const createWebsocketMock = <jest.Mock>createWebsocket;

describe('ReduxWebSocket', () => {
  const options: Options = {
    prefix: 'REDUX_WEBSOCKET',
  };

  beforeEach(() => {
    createWebsocketMock.mockClear();
  });

  describe('connect', () => {
    it('creates the websocket', () => {
      const dispatch = jest.fn(i => i);
      const store = { dispatch, getState: () => {} };
      const inst = new ReduxWebSocket(options);
      const action = {
        type: 'REDUX_WEBSOCKET::CONNECT',
        payload: {
          url: 'ws://fake.com',
        },
      };

      inst.connect(store, action as Action);

      expect(createWebsocketMock).toHaveBeenCalledWith(dispatch, action.payload.url, options);
    });

    it('closes the websocket if it exists', () => {
      const store = { dispatch: (i: any) => i, getState: () => {} };
      const reduxWebSocket = new ReduxWebSocket(options);
      const action = {
        type: 'REDUX_WEBSOCKET::CONNECT',
        payload: {
          url: 'ws://fake.com',
        },
      };

      const closeMock = jest.fn(() => {});
      reduxWebSocket.websocket = new WebSocket('ws://fake.com');
      reduxWebSocket.websocket.close = closeMock;

      reduxWebSocket.connect(store, action as Action);

      expect(closeMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('disconnect', () => {
    it('closes the websocket if it exists', () => {
      const reduxWebSocket = new ReduxWebSocket(options);
      const closeMock = jest.fn(() => {});

      reduxWebSocket.websocket = new WebSocket('ws://fake.com');
      reduxWebSocket.websocket.close = closeMock;

      reduxWebSocket.disconnect();

      expect(closeMock).toHaveBeenCalledTimes(1);
    });

    it('throws an error if there is no websocket', () => {
      const reduxWebSocket = new ReduxWebSocket(options);

      expect(reduxWebSocket.disconnect).toThrow();
    });
  });

  describe('send', () => {
    it('sends a stringified message', () => {
      const store = { dispatch: (i: any) => i, getState: () => {} };
      const reduxWebSocket = new ReduxWebSocket(options);
      const sendMock = jest.fn(() => {});
      const action = {
        type: 'REDUX_WEBSOCKET::SEND',
        payload: {
          name: 'John',
          age: 20,
        },
      };

      reduxWebSocket.websocket = new WebSocket('ws://fake.com');
      reduxWebSocket.websocket.send = sendMock;

      reduxWebSocket.send(store, action as Action);

      expect(sendMock).toHaveBeenCalledTimes(1);
      expect(sendMock).toHaveBeenCalledWith(JSON.stringify(action.payload));
    });
  });
});
