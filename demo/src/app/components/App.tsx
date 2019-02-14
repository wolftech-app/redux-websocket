import * as React from 'react';
import styled from 'styled-components';

import ControlsContainer from '../containers/ControlsContainer';
import DevTools from './DevTools';
import MessagesContainer from '../containers/MessagesContainer';

const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  margin: 0 auto;
  max-width: 1920px;
`;

const Title = styled.h1`
  border-bottom: 2px solid black;
  margin: 0;
  padding: 10px;
`;

const PanelContainer = styled.div`
  display: flex;
  flex: 1;
`;

interface PanelProps {
  width: string;
}

const Panel = styled.div`
  flex: 1;
  overflow: auto;
  padding: 10px;

  &:last-child {
    border-left: 2px solid black;
  }

  &:first-child {
    border-right: 2px solid black;
  }
`;

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
