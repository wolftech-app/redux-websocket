import createWebsocket from '../src/createWebsocket';

describe('createWebsocket', () => {
  const dispatch = jest.fn(i => i).mockName('dispatch');
  const ws = createWebsocket(dispatch, 'ws://fake.com', { prefix: 'REDUX_WEBSOCKET' });
  const payload = { test: 'value' };

  beforeEach(() => {
    dispatch.mockClear();
  });

  describe('onopen', () => {
    const expected = {
      type: 'REDUX_WEBSOCKET::OPEN',
      meta: { timestamp: expect.any(Date) },
      payload: {
        test: 'value',
      },
    };

    it('should return the dispatched action', () => {
      if (ws.onopen) {
        const result = ws.onopen(payload as any);

        expect(result).toEqual(expected);
      }
    });

    it('should dispatch the correct action.', () => {
      if (ws.onopen) {
        ws.onopen(payload as any);

        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith(expected);
      }
    });
  });

  describe('onclose', () => {
    const expected = {
      type: 'REDUX_WEBSOCKET::CLOSED',
      meta: { timestamp: expect.any(Date) },
      payload,
    };

    it('should return the dispatched action', () => {
      if (ws.onclose) {
        const result = ws.onclose(payload as any);

        expect(result).toEqual(expected);
      }
    });

    it('should dispatch the correct action.', () => {
      if (ws.onclose) {
        ws.onclose(payload as any);

        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith(expected);
      }
    });
  });

  describe('onmessage', () => {
    const expected = {
      type: 'REDUX_WEBSOCKET::MESSAGE',
      meta: { timestamp: expect.any(Date) },
      payload,
    };

    it('should return the dispatched action', () => {
      if (ws.onmessage) {
        const result = ws.onmessage(payload as any);

        expect(result).toEqual(expected);
      }
    });

    it('should dispatch the correct action.', () => {
      if (ws.onmessage) {
        ws.onmessage(payload as any);

        expect(dispatch).toHaveBeenCalledTimes(1);
        expect(dispatch).toHaveBeenCalledWith(expected);
      }
    });
  });
});
