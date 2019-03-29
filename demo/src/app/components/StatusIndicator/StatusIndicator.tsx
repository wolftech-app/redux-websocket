import * as React from 'react';

import { Container, StatusBubble, StatusText } from './styles';

interface Props {
  active: boolean;
  className?: string;
  text: string;
}

const StatusIndicator = ({ active, className, text }: Props) => (
  <Container className={className}>
    <StatusBubble active={active} />

    <StatusText active={active}>
      {text}
    </StatusText>
  </Container>
);

export default StatusIndicator;
