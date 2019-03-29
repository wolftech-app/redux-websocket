import * as React from 'react';

import ControlsContainer from '../../containers/ControlsContainer';
import DevTools from '../DevTools/DevTools';
import MessagesContainer from '../../containers/MessagesContainer';

import {
  AppWrapper,
  Badge,
  ControlPanel,
  DevToolsPanel,
  Header,
  Link,
  LinkContainer,
  MessageLogPanel,
  PanelContainer,
  PanelGroup,
  PanelHeader,
  Title,
} from './styles';

const { REDUX_WEBSOCKET_VERSION } = process.env;

const App = () => (
  <AppWrapper>
    <PanelContainer>
      <PanelGroup>
        <ControlPanel>
          <Header>
            <Title>@giantmachines/redux-websocket</Title>

            <LinkContainer>
              <Badge>
                { `v${REDUX_WEBSOCKET_VERSION.split('.').slice(0, 2).join('.')}` }
              </Badge>

              <Link href="https://github.com/giantmachines/redux-websocket" target="_blank">
                GitHub
              </Link>

              <Link href="https://www.npmjs.com/package/@giantmachines/redux-websocket" target="_blank">
                npm
              </Link>
            </LinkContainer>
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
