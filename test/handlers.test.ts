import { handleWebsocketConnect, handleWebsocketDisconnect, handleWebsocketSend } from '../src/handlers';
import createWebsocket from '../src/createWebsocket';

jest.mock('../src/createWebsocket', () => ({
  default: jest.fn().mockName('createWebsocket'),
}));

describe('handlers', () => {
  describe('handleWebsocketConnect', () => {
    it('should call close if a socket is passed', () => {
      const close = jest.fn().mockName('close');
      const dispatch = jest.fn().mockName('dispatch');

      handleWebsocketConnect(
        { close } as any,
        { dispatch } as any,
        { type: 'test', payload: { url: 'ws://example.com' } },
      );

      expect(close).toHaveBeenCalledTimes(1);
      expect(close).toHaveBeenCalledWith();

      close.mockClear();

      handleWebsocketConnect(
        null as any,
        { dispatch } as any,
        { type: 'test', payload: { url: 'ws://example.com' } },
      );

      expect(close).not.toHaveBeenCalled();
    });

    it('should call createWebsocket with the correct arguments', () => {
      const close = jest.fn().mockName('close');
      const dispatch = jest.fn().mockName('dispatch');

      handleWebsocketConnect(
        { close } as any,
        { dispatch } as any,
        { type: 'test', payload: { url: 'ws://example.com' } },
      );

      expect(createWebsocket).toHaveBeenCalledWith(dispatch, 'ws://example.com');
    });
  });

  describe('handleWebsocketDisconnect', () => {
    it('should close the connection', () => {
      const close = jest.fn().mockName('close');

      handleWebsocketDisconnect({ close } as any);

      expect(close).toHaveBeenCalledTimes(1);
      expect(close).toHaveBeenCalledWith();

      expect(() => {
        handleWebsocketDisconnect({} as any);
      }).toThrow();
    });
  });

  describe('handleWebsocketSend', () => {
    it('should call send with a JSON string', () => {
      const send = jest.fn().mockName('send');

      handleWebsocketSend(
        { send } as any,
        null as any,
        { type: 'test', payload: { test: 'value' } },
      );

      expect(send).toHaveBeenCalledTimes(1);
      expect(send).toHaveBeenCalledWith(JSON.stringify({ test: 'value' }));
    });
  });
});
