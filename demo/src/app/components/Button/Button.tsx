import * as React from 'react';
import Button from './styles';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export default ({ children, onClick, ...restProps }: Props) => (
  <Button onClick={onClick} {...restProps}>
    {children}
  </Button>
);
