# redux-websocket [![codecov](https://codecov.io/gh/giantmachines/redux-websocket/branch/master/graph/badge.svg)](https://codecov.io/gh/giantmachines/redux-websocket) [![npm version](https://badge.fury.io/js/%40giantmachines%2Fredux-websocket.svg)](https://badge.fury.io/js/%40giantmachines%2Fredux-websocket) ![npm](https://img.shields.io/npm/dm/@giantmachines/redux-websocket)

`redux-websocket` is a Redux middleware for managing data over a WebSocket connection.

This middleware uses actions to interact with a WebSocket connection including connecting, disconnecting, sending messages, and receiving messages. All actions follow the [Flux Standard Action](https://github.com/acdlite/flux-standard-action) model.

### Features

- Written in TypeScript.
- All exported action creators are created with [typesafe-actions](https://github.com/piotrwitek/typesafe-actions).
- Interact with a WebSocket connection by dispatching actions.
- Connect to multiple WebSocket streams by creating multiple middleware instances.
- Handle WebSocket events with Redux middleware, integrate with Saga, and use reducers to persist state.
- Automatically handle reconnection.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API](#api)
    - [connect](#connect)
    - [send](#send)
    - [disconnect](#disconnect)
- [Library dispatched actions](#library-dispatched-actions)

## Installation

```sh
$ npm i @giantmachines/redux-websocket
```

[⇧ back to top](#table-of-contents)

## Configuration

Configure your Redux store to use the middleware with `applyMiddleware`. This package exports a function to create an instance of a middleware, which allows for configuration options, detailed below. Furthermore, you can create multiple instances of this middleware in order to connect to multiple WebSocket streams.

```js
import { applyMiddleware, compose, createStore } from 'redux';
import reduxWebsocket from '@giantmachines/redux-websocket';

import reducer from './store/reducer';

// Create the middleware instance.
const reduxWebsocketMiddleware = reduxWebsocket();

// Create the Redux store.
const store = createStore(
  reducer,
  applyMiddleware(websocketMiddleware)
);
```

You may also pass options to the `reduxWebsocket` function.

[⇧ back to top](#table-of-contents)

#### Available options

```js
interface Options {
  // Use this option to add a unique name into the `meta` key in each action,
  // per middleware instance. This is useful when you're creating multiple
  // instances of the middleware, and need to handle actions dispatched by
  // each middleware instance separately.
  instanceName?: string,

  // Defaults to 2000. Amount of time to wait between reconnection attempts.
  reconnectInterval?: number,

  // Defaults to false. If set to true, will attempt to reconnect when conn is closed without error event
  // e.g. when server closes connection
  reconnectOnClose?: boolean,

  // Callback when the WebSocket connection is open. Useful for when you
  // need a reference to the WebSocket instance.
  onOpen?: (socket: WebSocket) => void,
}
```

## Usage

`redux-websocket` will dispatch some actions automatically, based on events emitted by the internal WebSocket instance. Some actions will need to be dispatched by you. `redux-websocket` comes with action creator functions, documented below. You don't _have_ to use these functions, but we recommend it. If you do not want to use the action creator functions, the actions themselves are all documented below as well.

## API

> ⚠️ If you have created your middleware with the `instanceName` option, make sure you pass that name in the options argument to all of these action creators.

### `connect`

Use this action creator to open up a WebSocket connection.

```js
import { connect } from '@giantmachines/redux-websocket';

connect(url: string, options?: { protocols?: string | string[], instanceName?: string });
```

#### Returns:

```js
{
    type: 'REDUX_WEBSOCKET::CONNECT',
    meta: {
        timestamp: string,
        instanceName?: string,
    },
    payload: {
        url: string,
        protocols?: string | string[],
    },
}
```

[⇧ back to top](#table-of-contents)

---

### `send`

Use this action to send a message out. Pass any JSON serializable value.

```js
import { send } from '@giantmachines/redux-websocket';

send(msg: any, options?: { instanceName?: string });
```

#### Returns:

```js
{
    type: 'REDUX_WEBSOCKET::SEND',
    meta: {
        timestamp: string,
        instanceName?: string,
    },
    payload: any,
}
```

[⇧ back to top](#table-of-contents)

---

### `disconnect`

This action will immediately close your WebSocket connection. You can use `connect` to open it again.

```js
import { disconnect } from '@giantmachines/redux-websocket';

disconnect(options?: { instanceName?: string });
```

#### Returns:

```js
{
    type: 'REDUX_WEBSOCKET::DISCONNECT',
    meta: {
        timestamp: string,
        instanceName?: string,
    },
}
```

[⇧ back to top](#table-of-contents)

## Library dispatched actions

These actions are dispatched automatically by `redux-websocket`.

##### ⬅️ `REDUX_WEBSOCKET::OPEN`

Dispatched when the WebSocket connection successfully opens, including after automatic reconnect.

###### Structure

```js
{
    type: 'REDUX_WEBSOCKET::OPEN',
    meta: {
        timestamp: string,
        instanceName?: string,
    },
}
```

---

##### ⬅️ `REDUX_WEBSOCKET::CLOSED`

Dispatched when the WebSocket connection successfully closes, both when you ask the middleware to close the connection, and when the connection drops.

###### Structure

```js
{
    type: 'REDUX_WEBSOCKET::CLOSED',
    meta: {
        timestamp: string,
        instanceName?: string,
    },
}
```

---

##### ⬅️ `REDUX_WEBSOCKET::MESSAGE`

Dispatched when the WebSocket connection receives a message. The payload includes a `message` key, which is JSON, and an `origin` key, which is the address of the connection from which the message was recieved.

###### Structure

```js
{
    type: 'REDUX_WEBSOCKET::MESSAGE',
    meta: {
        timestamp: string,
        instanceName?: string,
    },
    payload: {
        message: string,
        origin: string,
    },
}
```

---

##### ⬅️ `REDUX_WEBSOCKET::BROKEN`

Dispatched when the WebSocket connection is dropped. This action will always be dispatched _after_ the `CLOSED` action.

###### Structure

```js
{
    type: 'REDUX_WEBSOCKET::BROKEN',
    meta: {
        timestamp: string,
        instanceName?: string,
    },
}
```

---

##### ⬅️ `REDUX_WEBSOCKET::BEGIN_RECONNECT`

Dispatched when the middleware is starting the reconnection process.

###### Structure

```js
{
    type: 'REDUX_WEBSOCKET::BEGIN_RECONNECT',
    meta: {
        timestamp: string,
        instanceName?: string,
    },
}
```

---

##### ⬅️ `REDUX_WEBSOCKET::RECONNECT_ATTEMPT`

Dispatched every time the middleware attempts a reconnection. Includes a `count` as part of the payload.

###### Structure

```js
{
    type: 'REDUX_WEBSOCKET::RECONNECT_ATTEMPT',
    meta: {
        timestamp: string,
        instanceName?: string,
    },
    payload: {
        count: number,
    },
}
```

---

##### ⬅️ `REDUX_WEBSOCKET::RECONNECTED`

Dispatched when the middleware reconnects. This action is dispached right before an `OPEN` action.

###### Structure

```js
{
    type: 'REDUX_WEBSOCKET::RECONNECTED',
    meta: {
        timestamp: string,
        instanceName?: string,
    },
}
```

---

##### ⬅️ `REDUX_WEBSOCKET::ERROR`

General purpose error action.

###### Structure

```js
{
    type: 'REDUX_WEBSOCKET::ERROR',
    error: true,
    meta: {
        timestamp: string,
        message: string,
        name: string,
        originalAction: Action | null,
        instanceName?: string,
    },
    payload: Error,
}
```

[⇧ back to top](#table-of-contents)
