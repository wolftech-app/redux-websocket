import * as React from 'react';
import { Label } from './styles';

interface Props {
  children?: React.ReactNode;
  htmlFor?: string;
  text: string;
}

export default ({children, htmlFor, text}: Props) => (
  <Label htmlFor={htmlFor}>
    {text}
    {children}
  </Label>
);
