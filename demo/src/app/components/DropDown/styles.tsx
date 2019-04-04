import styled from 'styled-components';
import Colors from '../../styles/js/colors';
import * as Typography from '../../styles/js/typography';

export const Select = styled.select`
  ${Typography.TypeStyleStark}
  background-color: ${Colors.NEPTUNE};
  border: none;
  color: ${Colors.SUN};
  height: 26px;
  position: relative;
  width: 100%;
`;

export const Option = styled.option``;
