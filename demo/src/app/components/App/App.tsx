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
  PanelHeader,
  Title,
} from './styles';

const App = () => (
  <AppWrapper>
    <PanelContainer>
      <PanelGroup>
        <ControlPanel>
          <Header>
            <Title>@giantmachines/redux-websocket</Title>

            <Link href="https://github.com/giantmachines/redux-websocket" target="_blank">
              GitHub
            </Link>
          </Header>

          <PanelHeader>
            Control Panel
          </PanelHeader>

          <ControlsContainer />
        </ControlPanel>

        <MessageLogPanel>
          <PanelHeader>
            Message Log
          </PanelHeader>

          <MessagesContainer />
        </MessageLogPanel>
      </PanelGroup>

      <DevToolsPanel>
        <PanelHeader>
          Redux Log
        </PanelHeader>

        <DevTools />
      </DevToolsPanel>
    </PanelContainer>
  </AppWrapper>
);

export default App;
