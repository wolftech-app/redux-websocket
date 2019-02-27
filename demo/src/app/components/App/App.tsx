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
  Header,
  Link,
} from './styles';

const App = () => (
  <AppWrapper>
    <Header>
      <Title>redux-websocket</Title>

      <Link href={'https://github.com/giantmachines/redux-websocket'} target="_blank">Github</Link>
    </Header>

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
        <DevTools />
      </DevToolsPanel>
    </PanelContainer>
  </AppWrapper>
);

export default App;
