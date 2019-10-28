import { isFSA, isError } from 'flux-standard-action';

import * as actions from '../actions';
import * as actionTypes from '../actionTypes';

describe('actions', () => {
  describe('connect', () => {
    it('should return the correct action', () => {
      const act = actions.connect('fake url');

      expect(isFSA(act)).toBe(true);
      expect(act).toEqual({
        type: actionTypes.WEBSOCKET_CONNECT,
        meta: { timestamp: expect.any(Date) },
        payload: {
          url: 'fake url',
        },
      });
    });

    it('should return the correct action with protocols', () => {
      const act = actions.connect('fake url', { protocols: 'test' });

      expect(isFSA(act)).toBe(true);
      expect(act).toEqual({
        type: actionTypes.WEBSOCKET_CONNECT,
        meta: { timestamp: expect.any(Date) },
        payload: {
          url: 'fake url',
          protocols: 'test',
        },
      });

      const act2 = actions.connect('fake url', { protocols: ['a', 'b'] });

      expect(isFSA(act2)).toBe(true);
      expect(act2).toEqual({
        type: actionTypes.WEBSOCKET_CONNECT,
        meta: { timestamp: expect.any(Date) },
        payload: {
          url: 'fake url',
          protocols: ['a', 'b'],
        },
      });
    });

    it('should return the correct action with an instance name', () => {
      const act = actions.connect('fake url', { instanceName: 'one' });
      const act2 = actions.connect('fake url', { instanceName: 'two' });

      expect(isFSA(act)).toBe(true);
      expect(act).toEqual({
        type: actionTypes.WEBSOCKET_CONNECT,
        meta: {
          timestamp: expect.any(Date),
          instanceName: 'one',
        },
        payload: {
          url: 'fake url',
        },
      });

      expect(isFSA(act2)).toBe(true);
      expect(act2).toEqual({
        type: actionTypes.WEBSOCKET_CONNECT,
        meta: {
          timestamp: expect.any(Date),
          instanceName: 'two',
        },
        payload: {
          url: 'fake url',
        },
      });
    });
  });

  describe('disconnect', () => {
    it('should return the correct action', () => {
      const act = actions.disconnect();

      expect(isFSA(act)).toBe(true);
      expect(act).toEqual({
        type: actionTypes.WEBSOCKET_DISCONNECT,
        meta: { timestamp: expect.any(Date) },
      });
    });

    it('should return the correct action with an instance name', () => {
      const act = actions.disconnect({ instanceName: 'test' });

      expect(isFSA(act)).toBe(true);
      expect(act).toEqual({
        type: actionTypes.WEBSOCKET_DISCONNECT,
        meta: {
          timestamp: expect.any(Date),
          instanceName: 'test',
        },
      });
    });
  });

  describe('send', () => {
    it('should return the correct action', () => {
      const act = actions.send({ test: 'value' });

      expect(isFSA(act)).toBe(true);
      expect(act).toEqual({
        type: actionTypes.WEBSOCKET_SEND,
        meta: { timestamp: expect.any(Date) },
        payload: {
          test: 'value',
        },
      });
    });

    it('should return the correct action with an instance name', () => {
      const act = actions.send({ test: 'value' }, { instanceName: 'test' });

      expect(isFSA(act)).toBe(true);
      expect(act).toEqual({
        type: actionTypes.WEBSOCKET_SEND,
        meta: {
          timestamp: expect.any(Date),
          instanceName: 'test',
        },
        payload: {
          test: 'value',
        },
      });
    });
  });

  describe('beginReconnect', () => {
    it('should return the correct action', () => {
      const act = actions.beginReconnect();

      expect(isFSA(act)).toBe(true);
      expect(act).toEqual({
        type: actionTypes.WEBSOCKET_BEGIN_RECONNECT,
        meta: { timestamp: expect.any(Date) },
      });
    });

    it('should return the correct action with an instance name', () => {
      const act = actions.beginReconnect({ instanceName: 'test' });

      expect(isFSA(act)).toBe(true);
      expect(act).toEqual({
        type: actionTypes.WEBSOCKET_BEGIN_RECONNECT,
        meta: {
          timestamp: expect.any(Date),
          instanceName: 'test',
        },
      });
    });
  });

  describe('reconnectAttempt', () => {
    it('should return the correct action', () => {
      const act = actions.reconnectAttempt(1);

      expect(isFSA(act)).toBe(true);
      expect(act).toEqual({
        type: actionTypes.WEBSOCKET_RECONNECT_ATTEMPT,
        meta: { timestamp: expect.any(Date) },
        payload: {
          count: 1,
        },
      });
    });

    it('should return the correct action with an instance name', () => {
      const act = actions.reconnectAttempt(1, { instanceName: 'test' });

      expect(isFSA(act)).toBe(true);
      expect(act).toEqual({
        type: actionTypes.WEBSOCKET_RECONNECT_ATTEMPT,
        meta: {
          timestamp: expect.any(Date),
          instanceName: 'test',
        },
        payload: {
          count: 1,
        },
      });
    });
  });

  describe('reconnected', () => {
    it('should return the correct action', () => {
      const act = actions.reconnected();

      expect(isFSA(act)).toBe(true);
      expect(act).toEqual({
        type: actionTypes.WEBSOCKET_RECONNECTED,
        meta: { timestamp: expect.any(Date) },
      });
    });

    it('should return the correct action with an instance name', () => {
      const act = actions.reconnected({ instanceName: 'test' });

      expect(isFSA(act)).toBe(true);
      expect(act).toEqual({
        type: actionTypes.WEBSOCKET_RECONNECTED,
        meta: {
          timestamp: expect.any(Date),
          instanceName: 'test',
        },
      });
    });
  });

  describe('closed', () => {
    it('should return the correct action', () => {
      const act = actions.closed({ test: 'value' } as any);

      expect(isFSA(act)).toBe(true);
      expect(act).toEqual({
        type: actionTypes.WEBSOCKET_CLOSED,
        meta: { timestamp: expect.any(Date) },
        payload: {
          test: 'value',
        },
      });
    });

    it('should return the correct action with an instance name', () => {
      const act = actions.closed({ test: 'value' } as any, { instanceName: 'test' });

      expect(isFSA(act)).toBe(true);
      expect(act).toEqual({
        type: actionTypes.WEBSOCKET_CLOSED,
        meta: {
          timestamp: expect.any(Date),
          instanceName: 'test',
        },
        payload: {
          test: 'value',
        },
      });
    });
  });

  describe('message', () => {
    it('should return the correct action', () => {
      const act = actions.message({ test: 'value' } as any);

      expect(isFSA(act)).toBe(true);
      expect(act).toEqual({
        type: actionTypes.WEBSOCKET_MESSAGE,
        meta: { timestamp: expect.any(Date) },
        payload: {
          event: {
            test: 'value',
          },
          message: undefined,
          origin: undefined,
        },
      });
    });

    it('should return the correct action with an instance name', () => {
      const act = actions.message({ test: 'value' } as any, { instanceName: 'test' });

      expect(isFSA(act)).toBe(true);
      expect(act).toEqual({
        type: actionTypes.WEBSOCKET_MESSAGE,
        meta: {
          timestamp: expect.any(Date),
          instanceName: 'test',
        },
        payload: {
          event: {
            test: 'value',
          },
          message: undefined,
          origin: undefined,
        },
      });
    });
  });

  describe('open', () => {
    it('should return the correct action', () => {
      const act = actions.open({ test: 'value' } as any);

      expect(isFSA(act)).toBe(true);
      expect(act).toEqual({
        type: actionTypes.WEBSOCKET_OPEN,
        meta: { timestamp: expect.any(Date) },
        payload: {
          test: 'value',
        },
      });
    });

    it('should return the correct action with an instance name', () => {
      const act = actions.open({ test: 'value' } as any, { instanceName: 'test' });

      expect(isFSA(act)).toBe(true);
      expect(act).toEqual({
        type: actionTypes.WEBSOCKET_OPEN,
        meta: {
          timestamp: expect.any(Date),
          instanceName: 'test',
        },
        payload: {
          test: 'value',
        },
      });
    });
  });

  describe('broken', () => {
    it('should return the correct action', () => {
      const act = actions.broken();

      expect(isFSA(act)).toBe(true);
      expect(act).toEqual({
        type: actionTypes.WEBSOCKET_BROKEN,
        meta: { timestamp: expect.any(Date) },
      });
    });

    it('should return the correct action with an instance name', () => {
      const act = actions.broken({ instanceName: 'test' });

      expect(isFSA(act)).toBe(true);
      expect(act).toEqual({
        type: actionTypes.WEBSOCKET_BROKEN,
        meta: {
          timestamp: expect.any(Date),
          instanceName: 'test',
        },
      });
    });
  });

  describe('error', () => {
    it('should return the correct action', () => {
      const err = new Error('test');
      const act = actions.error({ type: 'TEST' } as any, err);

      expect(isFSA(act)).toBe(true);
      expect(isError(act)).toBe(true);
      expect(act).toEqual({
        type: actionTypes.WEBSOCKET_ERROR,
        error: true,
        meta: {
          timestamp: expect.any(Date),
          message: 'test',
          name: 'Error',
          originalAction: {
            type: 'TEST',
          },
        },
        payload: err,
      });
    });

    it('should return the correct action with an instance name', () => {
      const err = new Error('test');
      const act = actions.error({ type: 'TEST' } as any, err, { instanceName: 'test' });

      expect(isFSA(act)).toBe(true);
      expect(isError(act)).toBe(true);
      expect(act).toEqual({
        type: actionTypes.WEBSOCKET_ERROR,
        error: true,
        meta: {
          timestamp: expect.any(Date),
          message: 'test',
          name: 'Error',
          originalAction: {
            type: 'TEST',
          },
          instanceName: 'test',
        },
        payload: err,
      });
    });

    it('should return the correct action with a null action', () => {
      const err = new Error('test');
      const act = actions.error(null, err);

      expect(isFSA(act)).toBe(true);
      expect(isError(act)).toBe(true);
      expect(act).toEqual({
        type: actionTypes.WEBSOCKET_ERROR,
        error: true,
        meta: {
          timestamp: expect.any(Date),
          message: 'test',
          name: 'Error',
          originalAction: null,
        },
        payload: err,
      });
    });
  });
});
