import * as React from 'react';
import { Button } from './styles';

interface Props {
  children: React.ReactNode;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export default ({ children, onClick }: Props) => (
  <Button onClick={onClick}>
    {children}
  </Button>
);
