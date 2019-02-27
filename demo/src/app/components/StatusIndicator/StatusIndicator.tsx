import * as React from 'react';

import { Container, StatusBubble, StatusText } from './styles';

interface Props {
  connected: boolean;
}

const renderStatusText = (connected: boolean): string => connected ? 'Connected' : 'Disconnected';

const StatusIndicator = ({ connected }: Props) => (
  <Container>
    <StatusBubble connected={connected} />

    <StatusText>
      {renderStatusText(connected)}
    </StatusText>
  </Container>
);

export default StatusIndicator;
