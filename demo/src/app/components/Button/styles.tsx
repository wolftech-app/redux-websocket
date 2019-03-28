import styled from 'styled-components';
import { lighten } from 'polished';

import * as Typography from '../../styles/js/typography';
import Colors from '../../styles/js/colors';

export default styled.button`
  ${Typography.TypeStyleArcturus}

  background-color: ${Colors.MARS};
  border: none;
  border-radius: 3px;
  color: ${Colors.SUN};
  display: block;
  outline: none;
  padding: 5px 10px;
  text-transform: uppercase;

  &:hover {
    background-color: ${lighten(0.02, Colors.MARS)};
    cursor: pointer;
  }

  &:disabled {
    background-color: ${Colors.QUARK};
  }
`;
