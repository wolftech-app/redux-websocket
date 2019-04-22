// import { Options } from '../src/types';
import * as actions from '../src/actions';
import middleware from '../src';
import ReduxWebSocket from '../src/ReduxWebSocket';

jest.mock('../src/ReduxWebSocket');

const reduxWebSocketMock = <jest.Mock<ReduxWebSocket>>ReduxWebSocket;
const connectMock = jest.fn();
const disconnectMock = jest.fn();
const sendMock = jest.fn();
const mockStore = () => {
  const store = { getState: () => {}, dispatch: (i: any) => i };
  const wrapper = middleware()(store);
  const dispatch = wrapper(i => i);

  return { store, wrapper, dispatch };
};

reduxWebSocketMock.mockImplementation(options => ({
  close: () => {},
  connect: connectMock,
  disconnect: disconnectMock,
  handleBrokenConnection: () => {},
  hasOpened: false,
  lastSocketUrl: '',
  options,
  reconnectCount: 0,
  reconnectionInterval: null,
  send: sendMock,
  websocket: null,
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
      reconnectInterval: 2000,
    });
  });

  it('passes custom options to the ReduxWebSocket constructor', () => {
    middleware({ prefix: 'CUSTOM' });

    expect(reduxWebSocketMock).toHaveBeenCalledWith({
      prefix: 'CUSTOM',
      reconnectInterval: 2000,
    });
  });

  it('can create multiple instances of ReduxWebSocket', () => {
    middleware({ prefix: 'ONE' });
    middleware({ prefix: 'TWO' });

    expect(reduxWebSocketMock).toHaveBeenCalledTimes(2);
    expect(reduxWebSocketMock).toHaveBeenCalledWith({
      prefix: 'ONE',
      reconnectInterval: 2000,
    });
    expect(reduxWebSocketMock).toHaveBeenCalledWith({
      prefix: 'TWO',
      reconnectInterval: 2000,
    });
  });

  it('should handle a REDUX_WEBSOCKET::CONNECT action', () => {
    const { store, dispatch } = mockStore();
    const dispatchedAction = {
      type: 'REDUX_WEBSOCKET::CONNECT',
      meta: { timestamp: expect.any(Date) },
      payload: {
        url: 'ws://example.com',
      },
    };

    const val = dispatch(actions.connect('ws://example.com'));

    expect(val).toEqual(dispatchedAction);
    expect(connectMock).toHaveBeenCalledTimes(1);
    expect(connectMock).toHaveBeenCalledWith(store, dispatchedAction);
  });


  it('should handle a REDUX_WEBSOCKET::DISCONNECT action', () => {
    const { store, dispatch } = mockStore();
    const dispatchedAction = {
      type: 'REDUX_WEBSOCKET::DISCONNECT',
      meta: { timestamp: expect.any(Date) },
    };

    const val = dispatch(actions.disconnect());

    expect(val).toEqual(dispatchedAction);
    expect(disconnectMock).toHaveBeenCalledTimes(1);
    expect(disconnectMock).toHaveBeenCalledWith(store, dispatchedAction);
  });

  it('should handle a REDUX_WEBSOCKET::SEND action', () => {
    const { store, dispatch } = mockStore();
    const dispatchedAction = {
      type: 'REDUX_WEBSOCKET::SEND',
      meta: { timestamp: expect.any(Date) },
      payload: {
        test: 'message',
      },
    };

    const val = dispatch(actions.send({ test: 'message' }));

    expect(val).toEqual(dispatchedAction);
    expect(sendMock).toHaveBeenCalledTimes(1);
    expect(sendMock).toHaveBeenCalledWith(store, dispatchedAction);
  });

  it('should not break on random actions', () => {
    const { dispatch } = mockStore();

    dispatch({ type: `REDUX_WEBSOCKET::${Math.random().toString(36).substring(2, 15)}` });
    dispatch({ type: 'something-else-entirely' });

    expect(connectMock).not.toHaveBeenCalled();
    expect(disconnectMock).not.toHaveBeenCalled();
    expect(sendMock).not.toHaveBeenCalled();
  });
});
