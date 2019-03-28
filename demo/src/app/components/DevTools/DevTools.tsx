import { createDevTools } from 'redux-devtools';
import * as React from 'react';
import Inspector from 'redux-devtools-inspector';

import DevToolsWrapper from './styles';

const DevTools = createDevTools(
  <Inspector theme="ocean" invertTheme={false} />,
);

const DevToolsComponent = () => (
  <DevToolsWrapper>
    <DevTools />
  </DevToolsWrapper>
);

export const { instrument } = DevTools;
export default DevToolsComponent;
