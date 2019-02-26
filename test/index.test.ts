import middleware from '../src';
import ReduxWebsocket from '../src/reduxWebsocket';
import createWebsocket from '../src/createWebsocket';


// mock createWebsocket
jest.mock('../src/createWebsocket', () => ({
  default: jest.fn().mockName('createWebsocket'),
}));

// // mock reduxWebsocket class
jest.mock('../src/reduxWebsocket')
const reduxWebsocket = new ReduxWebsocket();
console.log(reduxWebsocket);


describe('middleware', () => {
  it('should handle a WEBSOCKET:CONNECT action for the first time', () => {
    // Mock everything out all the way down to the dispatch.
    const store = { getState: () => {}, dispatch: (i: any) => i };
    const wrapper = middleware(store);
    const dispatch = wrapper(i => i);
    const action = { type: 'WEBSOCKET:CONNECT', payload: { url: 'ws://example.com'}};
    // @ts-ignore
    // const mockConnect = reduxWebsocket.connect
    // @ts-ignore
    // console.log(reduxWebsocket);

    const val = dispatch(action);

    expect(val).toEqual(action);

    dispatch(action);

    expect(reduxWebsocket.connect).toHaveBeenCalled()
  });

  // it('should handle a WEBSOCKET:CONNECT action for the second time', () => {
  //   // Mock everything out all the way down to the dispatch.
  //   const store = { getState: () => {}, dispatch: (i: any) => i };
  //   const wrapper = middleware(store);
  //   const dispatch = wrapper(i => i);
  //   const action = { type: 'WEBSOCKET:CONNECT', payload: { url: 'ws://example.com'}};

  //   const val = dispatch(action);

  //   expect(val).toEqual(action);
  //   // expect(handleWebsocketConnect).toHaveBeenCalledWith(
  //   //   'socket',
  //   //   store,
  //   //   action,
  //   // );
  // });

  // it('should handle a WEBSOCKET:DISCONNECT action', () => {
  //   // Mock everything out all the way down to the dispatch.
  //   const store = { getState: () => {}, dispatch: (i: any) => i };
  //   const wrapper = middleware(store);
  //   const dispatch = wrapper(i => i);
  //   const action = { type: 'WEBSOCKET:DISCONNECT' };

  //   const val = dispatch(action);

  //   expect(val).toEqual(action);
  //   // expect(handleWebsocketDisconnect).toHaveBeenCalledWith(
  //   //   'socket',
  //   //   store,
  //   //   action,
  //   // );
  // });

  // it('should handle a WEBSOCKET:SEND action', () => {
  //   // Mock everything out all the way down to the dispatch.
  //   const store = { getState: () => {}, dispatch: (i: any) => i };
  //   const wrapper = middleware(store);
  //   const dispatch = wrapper(i => i);
  //   const action = { type: 'WEBSOCKET:SEND' };

  //   const val = dispatch(action);

  //   expect(val).toEqual(action);
  //   // expect(handleWebsocketSend).toHaveBeenCalledWith(
  //   //   'socket',
  //   //   store,
  //   //   action,
  //   // );
  // });
});
