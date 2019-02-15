import middleware from '../src';
import { handleWebsocketConnect, handleWebsocketDisconnect, handleWebsocketSend } from '../src/handlers';

jest.mock('../src/handlers', () => ({
  handleWebsocketConnect: jest.fn(() => 'socket').mockName('handleWebsocketConnect'),
  handleWebsocketDisconnect: jest.fn().mockName('handleWebsocketDisconnect'),
  handleWebsocketSend: jest.fn().mockName('handleWebsocketSend'),
}));

describe('middleware', () => {
  it('should handle a WEBSOCKET:CONNECT action for the first time', () => {
    // Mock everything out all the way down to the dispatch.
    const store = { getState: () => {}, dispatch: (i: any) => i };
    const wrapper = middleware(store);
    const dispatch = wrapper(i => i);
    const action = { type: 'WEBSOCKET:CONNECT' };

    const val = dispatch(action);

    expect(val).toEqual(action);
    expect(handleWebsocketConnect).toHaveBeenCalledWith(
      undefined,
      store,
      action,
    );

    dispatch(action);

    expect(handleWebsocketConnect).toHaveBeenCalledWith(
      'socket',
      store,
      action,
    );
  });

  it('should handle a WEBSOCKET:CONNECT action for the second time', () => {
    // Mock everything out all the way down to the dispatch.
    const store = { getState: () => {}, dispatch: (i: any) => i };
    const wrapper = middleware(store);
    const dispatch = wrapper(i => i);
    const action = { type: 'WEBSOCKET:CONNECT' };

    const val = dispatch(action);

    expect(val).toEqual(action);
    expect(handleWebsocketConnect).toHaveBeenCalledWith(
      'socket',
      store,
      action,
    );
  });

  it('should handle a WEBSOCKET:DISCONNECT action', () => {
    // Mock everything out all the way down to the dispatch.
    const store = { getState: () => {}, dispatch: (i: any) => i };
    const wrapper = middleware(store);
    const dispatch = wrapper(i => i);
    const action = { type: 'WEBSOCKET:DISCONNECT' };

    const val = dispatch(action);

    expect(val).toEqual(action);
    expect(handleWebsocketDisconnect).toHaveBeenCalledWith(
      'socket',
      store,
      action,
    );
  });

  it('should handle a WEBSOCKET:SEND action', () => {
    // Mock everything out all the way down to the dispatch.
    const store = { getState: () => {}, dispatch: (i: any) => i };
    const wrapper = middleware(store);
    const dispatch = wrapper(i => i);
    const action = { type: 'WEBSOCKET:SEND' };

    const val = dispatch(action);

    expect(val).toEqual(action);
    expect(handleWebsocketSend).toHaveBeenCalledWith(
      'socket',
      store,
      action,
    );
  });
});
