import ReduxWebSocket from '../ReduxWebSocket';
import { Action } from '../types';

declare global {
  namespace NodeJS {
    interface Global {
      WebSocket: any;
    }
  }
}

describe('ReduxWebSocket', () => {
  const options = {
    prefix: 'REDUX_WEBSOCKET',
    reconnectInterval: 2000,
  };

  describe('connect', () => {
    it('creates a new WebSocket instance', () => {
      const store = { dispatch: (i: any) => i, getState: () => {} };
      const url = 'ws://fake.com';
      const action = { type: 'SEND', payload: { url } };
      global.WebSocket = jest.fn(() => ({
        addEventListener: jest.fn(),
      }));
      const reduxWebSocket = new ReduxWebSocket(options);

      reduxWebSocket.connect(store, action as Action);

      expect(global.WebSocket).toHaveBeenCalledTimes(1);
      expect(global.WebSocket).toHaveBeenCalledWith(url);
    });

    it('closes any existing connections', () => {
      const store = { dispatch: (i: any) => i, getState: () => {} };
      const url = 'ws://fake.com';
      const action = { type: 'SEND', payload: { url } };
      const closeMock = jest.fn();
      global.WebSocket = jest.fn(() => ({
        addEventListener: jest.fn(),
        close: closeMock,
      }));
      const reduxWebSocket = new ReduxWebSocket(options);

      reduxWebSocket.connect(store, action as Action);
      reduxWebSocket.connect(store, action as Action);

      expect(closeMock).toHaveBeenCalledTimes(1);
      expect(closeMock).toHaveBeenCalledWith(1000, 'WebSocket connection closed by redux-websocket.');
    });
  });

  // describe('disconnect', () => {
  //   it('closes the websocket if it exists', () => {
  //     const reduxWebSocket = new ReduxWebSocket(options);
  //     const closeMock = jest.fn(() => {});

  //     reduxWebSocket.websocket = new WebSocket('ws://fake.com');
  //     reduxWebSocket.websocket.close = closeMock;

  //     reduxWebSocket.disconnect();

  //     expect(closeMock).toHaveBeenCalledTimes(1);
  //   });

  //   it('throws an error if there is no websocket', () => {
  //     const reduxWebSocket = new ReduxWebSocket(options);

  //     expect(reduxWebSocket.disconnect).toThrow();
  //   });
  // });

  // describe('send', () => {
  //   it('sends a stringified message', () => {
  //     const store = { dispatch: (i: any) => i, getState: () => {} };
  //     const reduxWebSocket = new ReduxWebSocket(options);
  //     const sendMock = jest.fn(() => {});
  //     const action = {
  //       type: 'REDUX_WEBSOCKET::SEND',
  //       payload: {
  //         name: 'John',
  //         age: 20,
  //       },
  //     };

  //     reduxWebSocket.websocket = new WebSocket('ws://fake.com');
  //     reduxWebSocket.websocket.send = sendMock;

  //     reduxWebSocket.send(store, action as Action);

  //     expect(sendMock).toHaveBeenCalledTimes(1);
  //     expect(sendMock).toHaveBeenCalledWith(JSON.stringify(action.payload));
  //   });
  // });
});
