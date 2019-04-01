import * as React from 'react';

import { Container, StatusBubble, StatusText } from './styles';

interface Props {
  active: boolean;
  className?: string;
  text: string;
  type?: 'INFO' | 'WARN';
}

const StatusIndicator = ({
  active,
  className,
  text,
  type = 'INFO',
}: Props) => (
  <Container className={className}>
    <StatusBubble active={active} type={type} />

    <StatusText active={active} type={type}>
      {text}
    </StatusText>
  </Container>
);

export default StatusIndicator;
