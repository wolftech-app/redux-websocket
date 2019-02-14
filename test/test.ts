import middleware from '../src';
import createWebsocket from '../src/createWebsocket';

jest.mock('../src/createWebsocket', () => {
  const test = {
    close: jest.fn().mockName('close'),
    send: jest.fn().mockName('send'),
  };

  return { default: () => test };
});

describe('middleware', () => {
  it('should dispatch the correct actions on initialization', () => {
    // Mock everything out all the way down to the dispatch.
    const wrapper = middleware({ getState: () => {}, dispatch: i => i });
    const dispatch = wrapper(i => i);

    // Dispatch a mock action.
    dispatch({ type: 'WEBSOCKET:CONNECT', payload: { url: 'fake' } });

    // Get the mocked websocket connection.
    const ws = createWebsocket(i => i, 'fake url');

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
  });

  it('should close correctly', () => {
    // Mock everything out all the way down to the dispatch.
    const wrapper = middleware({ getState: () => {}, dispatch: i => i });
    const dispatch = wrapper(i => i);

    // Dispatch a mock action.
    dispatch({ type: 'WEBSOCKET:DISCONNECT' });

    // Get the mocked websocket connection.
    const ws = createWebsocket(i => i, 'fake url');

    expect(ws.close).toHaveBeenCalledTimes(1);
    expect(ws.close).toHaveBeenCalledWith();
  });
});
