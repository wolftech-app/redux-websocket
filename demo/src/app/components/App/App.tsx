import * as React from 'react';

import ControlsContainer from '../../containers/ControlsContainer';
import DevTools from '../DevTools/DevTools';
import MessagesContainer from '../../containers/MessagesContainer';

import {
  AppWrapper,
  ControlPanel,
  DevToolsPanel,
  Header,
  Link,
  MessageLogPanel,
  PanelContainer,
  PanelGroup,
  Title,
} from './styles';

const App = () => (
  <AppWrapper>
    <PanelContainer>
      <PanelGroup>
        <ControlPanel>
          <Header>
            <Title>redux-websocket</Title>

            <Link href="https://github.com/giantmachines/redux-websocket" target="_blank">Github</Link>
          </Header>

          <ControlsContainer />
        </ControlPanel>

        <MessageLogPanel>
          <MessagesContainer />
        </MessageLogPanel>
      </PanelGroup>

      <DevToolsPanel>
        <DevTools />
      </DevToolsPanel>
    </PanelContainer>
  </AppWrapper>
);

export default App;
