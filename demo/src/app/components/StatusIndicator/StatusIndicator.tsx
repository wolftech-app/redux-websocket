import * as React from 'react';

import { Container, StatusBubble, StatusText } from './styles';

interface Props {
  active: boolean;
  text: string;
}

const StatusIndicator = ({ active, text }: Props) => (
  <Container>
    <StatusBubble active={active} />

    <StatusText active={active}>
      {text}
    </StatusText>
  </Container>
);

export default StatusIndicator;
