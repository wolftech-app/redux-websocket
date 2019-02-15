import * as React from 'react';
import { createDevTools } from 'redux-devtools';
import Inspector from 'redux-devtools-inspector';

const DevTools = createDevTools(
  <Inspector />
);

const DevToolsComponent = () => (
  <DevTools />
);

export const { instrument } = DevTools;
export default DevToolsComponent;
