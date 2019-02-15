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
