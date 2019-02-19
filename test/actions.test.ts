import * as actions from '../src/actions';
import * as actionTypes from '../src/actionTypes';

describe('actions', () => {
  describe('closed', () => {
    it('should return the correct action', () => {
      const act = actions.closed({ test: 'value' } as any);

      expect(act).toEqual({
        type: actionTypes.WEBSOCKET_CLOSED,
        payload: {
          event: { test: 'value' },
          timestamp: expect.any(Date),
        },
      });
    });
  });

  describe('connect', () => {
    it('should return the correct action', () => {
      const act = actions.connect({ test: 'value' } as any);

      expect(act).toEqual({
        type: actionTypes.WEBSOCKET_CONNECT,
        payload: {
          event: { test: 'value' },
          timestamp: expect.any(Date),
        },
      });
    });
  });

  describe('disconnect', () => {
    it('should return the correct action', () => {
      const act = actions.disconnect({ test: 'value' } as any);

      expect(act).toEqual({
        type: actionTypes.WEBSOCKET_DISCONNECT,
        payload: {
          event: { test: 'value' },
          timestamp: expect.any(Date),
        },
      });
    });
  });

  describe('message', () => {
    it('should return the correct action', () => {
      const act = actions.message({ test: 'value' } as any);

      expect(act).toEqual({
        type: actionTypes.WEBSOCKET_MESSAGE,
        payload: {
          event: { test: 'value' },
          timestamp: expect.any(Date),
        },
      });
    });
  });

  describe('open', () => {
    it('should return the correct action', () => {
      const act = actions.open({ test: 'value' } as any);

      expect(act).toEqual({
        type: actionTypes.WEBSOCKET_OPEN,
        payload: {
          event: { test: 'value' },
          timestamp: expect.any(Date),
        },
      });
    });
  });

  describe('send', () => {
    it('should return the correct action', () => {
      const act = actions.send({ test: 'value' } as any);

      expect(act).toEqual({
        type: actionTypes.WEBSOCKET_SEND,
        payload: {
          event: { test: 'value' },
          timestamp: expect.any(Date),
        },
      });
    });
  });
});
