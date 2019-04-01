import styled from 'styled-components';
import Colors from '../../styles/js/colors';
import * as Typography from '../../styles/js/typography';

interface StatusStyleProps {
  active: boolean;
  type: 'INFO' | 'WARN';
}

export const Container = styled.div`
  display: flex;
  align-items: center;
`;

/* eslint-disable indent */
export const StatusBubble = styled.div<StatusStyleProps>`
  background-color: ${Colors.JULIET};
  border: 2px solid ${Colors.QUARK};
  border-radius: 50%;
  flex-shrink: 0;
  height: 24px;
  position: relative;
  width: 24px;

  &::after {
    background-color: ${({ active, type }) => {
      switch (type) {
        case 'INFO':
          return active ? Colors.PUCK : Colors.PROSPERO;
        case 'WARN':
          return active ? Colors.COMET : Colors.PROSPERO;
        default:
          return Colors.PROSPERO;
      }
    }};
    border-radius: 50%;
    content: '';
    height: 16px;
    left: 2px;
    position: absolute;
    top: 2px;
    width: 16px;
  }
`;
/* eslint-enable indent */

export const StatusText = styled.span<StatusStyleProps>`
  ${Typography.TypeStyleCanopus}
  color: ${({ active, type }) => {
    switch (type) {
      case 'INFO':
        return active ? Colors.PUCK : Colors.PROSPERO;
      case 'WARN':
        return active ? Colors.COMET : Colors.PROSPERO;
      default:
        return Colors.PROSPERO;
    }
  }};
  margin-left: 5px;
  font-size: 16px;
  font-style: ${({ type }) => (type === 'WARN' ? 'italic' : 'normal')};
`;
