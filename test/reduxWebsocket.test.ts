import ReduxWebsocket from '../src/reduxWebsocket';
import createWebsocket from '../src/createWebsocket';
import { Options } from '../src/types';

jest.mock('../src/createWebsocket');

const createWebsocketMock = <jest.Mock>createWebsocket;

describe('ReduxWebsocket', () => {
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
      const inst = new ReduxWebsocket(options);
      const action = {
        type: 'REDUX_WEBSOCKET::CONNECT',
        payload: {
          url: 'ws://fake.com',
        },
      };

      inst.connect(store, action);

      expect(createWebsocketMock).toHaveBeenCalledWith(dispatch, action.payload.url, options);
    });

    it('closes the websocket if it exists', () => {
      const store = { dispatch: (i: any) => i, getState: () => {} };
      const reduxWebsocket = new ReduxWebsocket(options);
      const action = {
        type: 'REDUX_WEBSOCKET::CONNECT',
        payload: {
          url: 'ws://fake.com',
        },
      };

      const closeMock = jest.fn(() => {});
      reduxWebsocket.websocket = new WebSocket('ws://fake.com');
      reduxWebsocket.websocket.close = closeMock;

      reduxWebsocket.connect(store, action);

      expect(closeMock).toHaveBeenCalledTimes(1);
    });
  });

  describe('disconnect', () => {
    it('closes the websocket if it exists', () => {
      const reduxWebsocket = new ReduxWebsocket(options);
      const closeMock = jest.fn(() => {});

      reduxWebsocket.websocket = new WebSocket('ws://fake.com');
      reduxWebsocket.websocket.close = closeMock;

      reduxWebsocket.disconnect();

      expect(closeMock).toHaveBeenCalledTimes(1);
    });

    it('throws an error if there is no websocket', () => {
      const reduxWebsocket = new ReduxWebsocket(options);

      expect(reduxWebsocket.disconnect).toThrow();
    });
  });

  describe('send', () => {
    it('sends a stringified message', () => {
      const store = { dispatch: (i: any) => i, getState: () => {} };
      const reduxWebsocket = new ReduxWebsocket(options);
      const sendMock = jest.fn(() => {});
      const action = {
        type: 'REDUX_WEBSOCKET::SEND',
        payload: {
          name: 'John',
          age: 20,
        },
      };

      reduxWebsocket.websocket = new WebSocket('ws://fake.com');
      reduxWebsocket.websocket.send = sendMock;

      reduxWebsocket.send(store, action);

      expect(sendMock).toHaveBeenCalledTimes(1);
      expect(sendMock).toHaveBeenCalledWith(JSON.stringify(action.payload));
    });
  });
});
