import middleware from '../src';

// TODO: scaling back these test suntil we can figure out a
// good way to test the reduxWebsocket class.

jest.mock('../src/reduxWebsocket');

describe('middleware', () => {
  it('should handle a REDUX_WEBSOCKET::CONNECT action for the first time', () => {
    // Mock everything out all the way down to the dispatch.
    const store = { getState: () => {}, dispatch: (i: any) => i };
    const wrapper = middleware(store);
    const dispatch = wrapper(i => i);
    const action = {
      type: 'REDUX_WEBSOCKET::CONNECT',
      payload: { url: 'ws://example.com' },
    };

    const val = dispatch(action);

    expect(val).toEqual(action);
  });

  it('should handle a REDUX_WEBSOCKET::CONNECT action for the second time', () => {
    // Mock everything out all the way down to the dispatch.
    const store = { getState: () => {}, dispatch: (i: any) => i };
    const wrapper = middleware(store);
    const dispatch = wrapper(i => i);
    const action = {
      type: 'REDUX_WEBSOCKET::CONNECT',
      payload: { url: 'ws://example.com' },
    };

    const val = dispatch(action);

    expect(val).toEqual(action);
  });

  it('should handle a REDUX_WEBSOCKET::DISCONNECT action', () => {
    // Mock everything out all the way down to the dispatch.
    const store = { getState: () => {}, dispatch: (i: any) => i };
    const wrapper = middleware(store);
    const dispatch = wrapper(i => i);
    const action = { type: 'REDUX_WEBSOCKET::DISCONNECT' };

    const val = dispatch(action);

    expect(val).toEqual(action);
  });

  it('should handle a REDUX_WEBSOCKET::SEND action', () => {
    // Mock everything out all the way down to the dispatch.
    const store = { getState: () => {}, dispatch: (i: any) => i };
    const wrapper = middleware(store);
    const dispatch = wrapper(i => i);
    const action = { type: 'REDUX_WEBSOCKET::SEND' };

    const val = dispatch(action);

    expect(val).toEqual(action);
  });
});
