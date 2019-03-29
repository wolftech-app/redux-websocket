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
  border: 2px solid ${Colors.QUARK};
  border-radius: 50%;
  background: ${({ active }) => (active ? Colors.PUCK : Colors.PROSPERO)};
  box-shadow: inset 0 0 0 3px ${Colors.JULIET};
  flex-shrink: 0;
  height: 23px;
  width: 23px;
`;

export const StatusText = styled.span<StatusBubbleProps>`
  ${Typography.TypeStyleCanopus}
  color: ${({ active }) => (active ? Colors.PUCK : Colors.PROSPERO)};
  margin-left: 5px;
  font-size: 16px;
`;
