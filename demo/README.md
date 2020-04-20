# Demo Application

This folder includes the demo react application for redux-websocket. It can be used as a reference for how to implement redux-websocket in your own app and for testing new feature development.

## Scripts

|Command|Description|
|--|--|
|`npm run build`|Build production app|
|`npm start`|Start webpack dev server for local development|
|`npm run start:server`|Start a websocket echo server|
|`npm run link`|Link local build of redux websocket to app|
|`npm run unlink`|Unlink local build of redux websocket to app|

## Local Development Setup

- From the demo folder run `npm run link` to install demo app dependencies and link local build of redux-websocket.

- From project root folder run `npm run build:watch` to start watching library source code for changes.

- In another terminal from the demo folder run `npm start` to start the demo app.

- The demo app will now be running with your local build of redux-websocket. As you make changes to the library source code it will automatically be rebuilt and cause a refresh of the demo app.

- The demo app also includes a websocket echo server that you can start by running `npm run start:server`.
