# Demo Application

This folder includes the demo react application for redux-websocket. It can be used as a reference for how to implement redux-websocket in your own app and for testing new feature development.

## Scripts

|Command|Description|
|--|--|
|`npm run build`|Build production app|
|`npm start`|Start webpack dev server for local development|

## Local Development Setup

- In the root folder run `npm link` to build redux-websocket and create a symlink to the local build.

- Run `npm run build:watch` to start watching src files to trigger a rebuild automatically.

- In another terminal go to the demo folder and run `npm install` to install demo app dependencies.

- Link the local build of redux-websocket by running `npm link @giantmachines/redux-websocket`.

- Start the demo app with `npm start`

- The demo app will now be running with your local build of redux-websocket. As you make changes to the library source code it will automatically be rebuilt and cause a refresh of the demo app.
