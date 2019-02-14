import middleware from '../src';
import { createWebsocket } from '../src/websocket';

jest.mock('../src/websocket', () => {
  const test = {};

  return {
    createWebsocket: () => test,
  };
});

describe('middleware', () => {
  it('should dispatch the correct actions on initialization', () => {
    // Mock everything out all the way down to the dispatch.
    const wrapper = middleware({ getState: () => {}, dispatch: i => i });
    const dispatch = wrapper(i => i);

    // Dispatch a mock action.
    dispatch({ type: 'WEBSOCKET:CONNECT' });

    // Get the mocked websocket connection.
    const ws = createWebsocket({});

    if (ws.onopen) {
      const result = ws.onopen({ test: 'value' } as any);

      expect(result).toEqual({
        payload: {
          event: {
            test: 'value',
          },
          timestamp: expect.any(Date),
        },
        type: 'WEBSOCKET:OPEN',
      });
    }

    if (ws.onclose) {
      const result = ws.onclose({ test: 'value' } as any);

      expect(result).toEqual({
        payload: {
          event: {
            test: 'value',
          },
          timestamp: expect.any(Date),
        },
        type: 'WEBSOCKET:CLOSED',
      });
    }

    if (ws.onmessage) {
      const result = ws.onmessage({ test: 'value', data: 'test' } as any);

      expect(result).toEqual({
        payload: {
          data: 'test',
          event: {
            data: 'test',
            test: 'value',
          },
          timestamp: expect.any(Date),
        },
        type: 'WEBSOCKET:MESSAGE',
      });
    }

    if (ws.onconnecting) {
      const result = ws.onconnecting({ test: 'value', data: 'test' } as any);

      expect(result).toEqual({
        payload: {
          websocket: ws,
          event: {
            data: 'test',
            test: 'value',
          },
          timestamp: expect.any(Date),
        },
        type: 'WEBSOCKET:CONNECTING',
      });
    }
  });
});
