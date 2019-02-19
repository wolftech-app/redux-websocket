import * as React from 'react';

import ControlsContainer from '../../containers/ControlsContainer';
import DevTools from '../DevTools/DevTools';
import MessagesContainer from '../../containers/MessagesContainer';

import {
  AppWrapper,
  DevToolsPanel,
  Title,
  Panel,
  PanelContainer,
  PanelGroup,
} from './styles';

const App = () => (
  <AppWrapper>
    <Title>
      redux-websocket
    </Title>
    <PanelContainer>
      <PanelGroup>
        <Panel>
          <ControlsContainer />
        </Panel>
        <Panel>
          <MessagesContainer />
        </Panel>
      </PanelGroup>
      <DevToolsPanel>
        <DevTools/>
      </DevToolsPanel>
    </PanelContainer>
  </AppWrapper>
);

export default App;
