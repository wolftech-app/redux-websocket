import * as React from 'react';

import ControlsContainer from '../../containers/ControlsContainer';
import DevTools from '../DevTools/DevTools';
import MessagesContainer from '../../containers/MessagesContainer';

import {
  AppWrapper,
  Title,
  Panel,
  PanelContainer,
} from './styles';

const App = () => (
  <AppWrapper>
    <Title>
      redux-websocket
    </Title>
    <PanelContainer>
      <Panel>
        <ControlsContainer />
      </Panel>
      <Panel>
        <MessagesContainer />
      </Panel>
      <Panel>
        <DevTools/>
      </Panel>
    </PanelContainer>
  </AppWrapper>
);

export default App;
