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
  it('should throw if connection not yet open', () => {
    // Mock everything out all the way down to the dispatch.
    const wrapper = middleware({ getState: () => {}, dispatch: i => i });
    const dispatch = wrapper(i => i);

    expect(() => {
      dispatch({ type: 'WEBSOCKET:DISCONNECT' });
    }).toThrow();
  });

  it('should close an open connection', () => {
    // Mock everything out all the way down to the dispatch.
    const wrapper = middleware({ getState: () => {}, dispatch: i => i });
    const dispatch = wrapper(i => i);
    const ws = createWebsocket(dispatch, 'ws://fake.com');

    const { close } = ws;

    (close as any).mockClear();

    // First create a socket connection.
    dispatch({ type: 'WEBSOCKET:CONNECT', payload: { url: 'fake url' } });

    // Then close it.
    dispatch({ type: 'WEBSOCKET:DISCONNECT' });

    expect(close).toHaveBeenCalledTimes(1);
    expect(close).toHaveBeenCalledWith();
  });
});
