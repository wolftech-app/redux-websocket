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

const Icon = () => (
  <svg width="9" height="9" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 0v1H1v7h7V4h1v5H0V0h5zm1 0h3v3L8 2 4 6 3 5l4-4-1-1z" fill="#D8D8D8" fillRule="nonzero" />
  </svg>
);

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

                <Icon />
              </Link>

              <Link href="https://www.npmjs.com/package/@giantmachines/redux-websocket" target="_blank">
                npm

                <Icon />
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
