import styled from 'styled-components';
import Colors from '../../styles/js/colors';
import * as Typography from '../../styles/js/typography';

interface StatusBubbleProps {
  active: boolean;
}

export const Container = styled.div`
  display: flex;
  align-items: center;
`;

export const StatusBubble = styled.div<StatusBubbleProps>`
  background-color: ${Colors.JULIET};
  border: 2px solid ${Colors.QUARK};
  border-radius: 50%;
  flex-shrink: 0;
  height: 24px;
  position: relative;
  width: 24px;

  &::after {
    background-color: ${({ active }) => (active ? Colors.PUCK : Colors.PROSPERO)};
    border-radius: 50%;
    content: '';
    height: 16px;
    left: 2px;
    position: absolute;
    top: 2px;
    width: 16px;
  }
`;

export const StatusText = styled.span<StatusBubbleProps>`
  ${Typography.TypeStyleCanopus}
  color: ${({ active }) => (active ? Colors.PUCK : Colors.PROSPERO)};
  margin-left: 5px;
  font-size: 16px;
`;
