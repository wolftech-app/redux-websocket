import * as React from 'react';

import Button from '../Button';
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

interface Props {
  clear: () => void
}

const { REDUX_WEBSOCKET_VERSION } = process.env;

const Icon = () => (
  <svg width="9" height="9" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 0v1H1v7h7V4h1v5H0V0h5zm1 0h3v3L8 2 4 6 3 5l4-4-1-1z" fill="#D8D8D8" fillRule="nonzero" />
  </svg>
);

/**
 * App component.
 *
 * @param {Props}
 *
 * @returns {React.ReactNode}
 */
const App = ({ clear }: Props): React.ReactElement<null> => (
  <AppWrapper>
    <PanelContainer>
      <PanelGroup>
        <ControlPanel>
          <Header>
            <Title>@giantmachines/redux-websocket</Title>

            <LinkContainer>
              <Badge>
                {`v${REDUX_WEBSOCKET_VERSION}`}
              </Badge>

              <Link href="https://www.giantmachines.com" target="_blank">
                Giant Machines

                <Icon />
              </Link>

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

            <Button onClick={clear} small outlined>clear</Button>
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
