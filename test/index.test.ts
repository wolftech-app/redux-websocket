// import { Options } from '../src/types';
import middleware from '../src';
import ReduxWebSocket from '../src/ReduxWebSocket';

jest.mock('../src/ReduxWebSocket');

const reduxWebSocketMock = <jest.Mock<ReduxWebSocket>>ReduxWebSocket;
const connectMock = jest.fn();
const disconnectMock = jest.fn();
const sendMock = jest.fn();

reduxWebSocketMock.mockImplementation(options => ({
  options,
  websocket: null,
  connect: connectMock,
  disconnect: disconnectMock,
  send: sendMock,
}));

describe('middleware', () => {
  beforeEach(() => {
    reduxWebSocketMock.mockClear();
    connectMock.mockClear();
    disconnectMock.mockClear();
    sendMock.mockClear();
  });

  it('creates a new ReduxWebSocket instance', () => {
    middleware();

    expect(reduxWebSocketMock).toHaveBeenCalled();
  });

  it('passes default options to the ReduxWebSocket constructor', () => {
    middleware();

    expect(reduxWebSocketMock).toHaveBeenCalledWith({
      prefix: 'REDUX_WEBSOCKET',
    });
  });

  it('passes custom options to the ReduxWebSocket constructor', () => {
    middleware({ prefix: 'CUSTOM' });

    expect(reduxWebSocketMock).toHaveBeenCalledWith({
      prefix: 'CUSTOM',
    });
  });

  it('can create multiple instances of ReduxWebSocket', () => {
    middleware({ prefix: 'ONE' });
    middleware({ prefix: 'TWO' });

    expect(reduxWebSocketMock).toHaveBeenCalledTimes(2);
    expect(reduxWebSocketMock).toHaveBeenCalledWith({
      prefix: 'ONE',
    });
    expect(reduxWebSocketMock).toHaveBeenCalledWith({
      prefix: 'TWO',
    });
  });

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
});
