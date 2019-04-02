import styled from 'styled-components';
import { lighten } from 'polished';

import * as Typography from '../../styles/js/typography';
import Colors from '../../styles/js/colors';

export default styled.button`
  ${Typography.TypeStyleArcturus}
  background-color: ${Colors.MARS};
  border-radius: 2px;
  border: none;
  color: ${Colors.SUN};
  display: inline-block;
  outline: none;
  padding: 7px 15px 6px 15px;
  text-transform: uppercase;
  transition-property: background-color, color;
  transition: 0.1s ease-in-out;

  &:hover {
    background-color: ${lighten(0.02, Colors.MARS)};
    cursor: pointer;
  }

  &:disabled {
    background-color: ${Colors.QUARK};
    color: ${Colors.JULIET};
  }
`;
