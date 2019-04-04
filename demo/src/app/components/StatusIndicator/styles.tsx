import styled, { css, keyframes } from 'styled-components';

import Colors from '../../styles/js/colors';
import * as Typography from '../../styles/js/typography';

interface StatusStyleProps {
  active: boolean;
  type: 'INFO' | 'WARN';
}

const getColorActiveType = ({ active, type }) => {
  switch (type) {
    case 'INFO':
      return active ? Colors.PUCK : Colors.PROSPERO;
    case 'WARN':
      return active ? Colors.KUIPER_BELT : Colors.PROSPERO;
    default:
      return Colors.PROSPERO;
  }
};

const getAnimation = (type: string, color: string) => keyframes`
  0% { ${type}: ${Colors.PROSPERO}; }
  10% { ${type}: ${color}; }
  20% { ${type}: ${Colors.PROSPERO}; }

  60% { ${type}: ${color}; }
  80% { ${type}: ${Colors.PROSPERO}; }
  100% { ${type}: ${color}; }
`;

const animateBackground = (color: string) => css`
  animation: ${getAnimation('background-color', color)} 0.7s step-start;
`;

const animateColor = (color: string) => css`
  animation: ${getAnimation('color', color)} 0.7s step-start;
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
`;

export const StatusBubble = styled.div<StatusStyleProps>`
  background-color: ${getColorActiveType};
  border-radius: 50%;
  box-shadow: 0 0 0 4px #505F6D, 0 0 0 6px #2F3F4F;
  flex-shrink: 0;
  height: 15px;
  margin: 4px;
  position: relative;
  width: 15px;
  ${props => (props.active ? animateBackground(getColorActiveType(props)) : null)}
`;

export const StatusText = styled.span<StatusStyleProps>`
  ${Typography.TypeStyleCanopus}
  color: ${getColorActiveType};
  margin-left: 5px;
  font-size: 16px;
  font-style: ${({ type }) => (type === 'WARN' ? 'italic' : 'normal')};
  font-weight: ${({ type }) => (type === 'WARN' ? '500' : '400')};
  ${props => (props.active ? animateColor(getColorActiveType(props)) : null)}
`;
