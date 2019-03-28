import middleware from '../src';
import ReduxWebsocket from '../src/reduxWebsocket';
import { Options } from '../src/types';

jest.mock('../src/reduxWebsocket');

const reduxWebsocketMock = <jest.Mock<ReduxWebsocket>>ReduxWebsocket;
const connectMock = jest.fn();
const disconnectMock = jest.fn();
const sendMock = jest.fn();

reduxWebsocketMock.mockImplementation(options => ({
  options,
  websocket: null,
  connect: connectMock,
  disconnect: disconnectMock,
  send: sendMock,
}));

beforeEach(() => {
  reduxWebsocketMock.mockClear();
  connectMock.mockClear();
  disconnectMock.mockClear();
  sendMock.mockClear();
});

describe('middleware', () => {
  it('should handle a REDUX_WEBSOCKET::CONNECT action', () => {
    // Mock everything out all the way down to the dispatch.
    const store = { getState: () => {}, dispatch: (i: any) => i };
    const wrapper = middleware()(store);
    const dispatch = wrapper(i => i);
    const action = {
      type: 'REDUX_WEBSOCKET::CONNECT',
      payload: { url: 'ws://example.com' },
    };

    const val = dispatch(action);

    expect(val).toEqual(action);
    expect(connectMock).toHaveBeenCalledTimes(1);
    expect(connectMock).toHaveBeenCalledWith(store, action);
  });

  it('should handle a REDUX_WEBSOCKET::DISCONNECT action', () => {
    // Mock everything out all the way down to the dispatch.
    const store = { getState: () => {}, dispatch: (i: any) => i };
    const wrapper = middleware()(store);
    const dispatch = wrapper(i => i);
    const action = { type: 'REDUX_WEBSOCKET::DISCONNECT' };

    const val = dispatch(action);

    expect(val).toEqual(action);
    expect(disconnectMock).toHaveBeenCalledTimes(1);
    expect(disconnectMock).toHaveBeenCalledWith(store, action);
  });

  it('should handle a REDUX_WEBSOCKET::SEND action', () => {
    // Mock everything out all the way down to the dispatch.
    const store = { getState: () => {}, dispatch: (i: any) => i };
    const wrapper = middleware()(store);
    const dispatch = wrapper(i => i);
    const action = { type: 'REDUX_WEBSOCKET::SEND' };

    const val = dispatch(action);

    expect(val).toEqual(action);
    expect(sendMock).toHaveBeenCalledTimes(1);
    expect(sendMock).toHaveBeenCalledWith(store, action);
  });

  it('should not break on random actions', () => {
    // Mock everything out all the way down to the dispatch.
    const store = { getState: () => {}, dispatch: (i: any) => i };
    const wrapper = middleware()(store);
    const dispatch = wrapper(i => i);

    dispatch({ type: 'REDUX_WEBSOCKET::RANDOM' });
    dispatch({ type: 'RANDOM::ACTION' });

    expect(connectMock).not.toHaveBeenCalled();
    expect(disconnectMock).not.toHaveBeenCalled();
    expect(sendMock).not.toHaveBeenCalled();
  });

  it('uses default config when non is provided', () => {
    const defaultConfig: Options = {
      prefix: 'REDUX_WEBSOCKET',
    };
    const store = { getState: () => {}, dispatch: (i: any) => i };
    // Instantiate middleware without options
    const wrapper = middleware()(store);
    const dispatch = wrapper(i => i);

    dispatch({ type: 'REDUX_WEBSOCKET::CONNECT' });

    expect(reduxWebsocketMock).toHaveBeenCalledWith(defaultConfig);
    expect(connectMock).toHaveBeenCalledTimes(1);
  });

  it('uses a custom config when provided', () => {
    const customPrefix = 'MY_WEBSOCKET';
    const customConfig: Options = {
      prefix: customPrefix,
    };
    const store = { getState: () => {}, dispatch: (i: any) => i };
    // Instantiate middleware with options
    const wrapper = middleware(customConfig)(store);
    const dispatch = wrapper(i => i);

    dispatch({ type: `${customPrefix}::CONNECT` });

    expect(reduxWebsocketMock).toHaveBeenCalledWith(customConfig);
    expect(connectMock).toHaveBeenCalledTimes(1);
  });
});
