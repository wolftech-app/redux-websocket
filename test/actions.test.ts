import * as actions from '../src/actions';
import * as actionTypes from '../src/actionTypes';

describe('actions', () => {
  describe('closed', () => {
    it('should return the correct action', () => {
      const PREFIX = 'ACTION_PREFIX';
      const act = actions.closed({ test: 'value' } as any, PREFIX);

      expect(act).toEqual({
        type: `${PREFIX}::${actionTypes.WEBSOCKET_CLOSED}`,
        meta: { timestamp: expect.any(Date) },
        payload: {
          test: 'value',
        },
      });
    });
  });

  describe('connect', () => {
    it('should return the correct action', () => {
      const PREFIX = 'ACTION_PREFIX';
      const act = actions.connect('fake url', PREFIX);

      expect(act).toEqual({
        type: `${PREFIX}::${actionTypes.WEBSOCKET_CONNECT}`,
        meta: { timestamp: expect.any(Date) },
        payload: {
          url: 'fake url',
        },
      });
    });
  });

  describe('disconnect', () => {
    it('should return the correct action', () => {
      const PREFIX = 'ACTION_PREFIX';
      const act = actions.disconnect(PREFIX);

      expect(act).toEqual({
        type: `${PREFIX}::${actionTypes.WEBSOCKET_DISCONNECT}`,
        meta: { timestamp: expect.any(Date) },
      });
    });
  });

  describe('message', () => {
    it('should return the correct action', () => {
      const PREFIX = 'ACTION_PREFIX';
      const act = actions.message({ test: 'value' } as any, PREFIX);

      expect(act).toEqual({
        type: `${PREFIX}::${actionTypes.WEBSOCKET_MESSAGE}`,
        meta: { timestamp: expect.any(Date) },
        payload: {
          test: 'value',
        },
      });
    });
  });

  describe('open', () => {
    it('should return the correct action', () => {
      const PREFIX = 'ACTION_PREFIX';
      const act = actions.open({ test: 'value' } as any, PREFIX);

      expect(act).toEqual({
        type: `${PREFIX}::${actionTypes.WEBSOCKET_OPEN}`,
        meta: { timestamp: expect.any(Date) },
        payload: {
          test: 'value',
        },
      });
    });
  });

  describe('send', () => {
    it('should return the correct action', () => {
      const PREFIX = 'ACTION_PREFIX';
      const act = actions.send({ test: 'value' } as any, PREFIX);

      expect(act).toEqual({
        type: `${PREFIX}::${actionTypes.WEBSOCKET_SEND}`,
        meta: { timestamp: expect.any(Date) },
        payload: {
          test: 'value',
        },
      });
    });
  });
});
