import * as React from 'react';

import Button from './styles';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  small?: boolean,
  outlined?: boolean,
}

export default ({
  children,
  small,
  outlined,
  onClick,
  ...restProps
}: Props) => (
  <Button
    {...restProps}
    onClick={onClick}
    outlined={outlined}
    small={small}
  >
    {children}
  </Button>
);
