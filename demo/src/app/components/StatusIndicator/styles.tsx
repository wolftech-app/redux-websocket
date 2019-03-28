import styled from 'styled-components';
import Colors from '../../styles/js/colors';
import * as Typography from '../../styles/js/typography';

interface StatusBubbleProps {
  active: boolean;
}

export const Container = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
`;

export const StatusBubble = styled.div<StatusBubbleProps>`
  width: 23px;
  height: 23px;
  border: 2px solid ${Colors.QUARK};
  border-radius: 50%;
  background: ${({ active }) => (active ? Colors.PUCK : Colors.PROSPERO)};
  box-shadow: inset 0px 0px 0 3px ${Colors.JULIET};
`;

export const StatusText = styled.span<StatusBubbleProps>`
  ${Typography.TypeStyleCanopus}
  color: ${({ active }) => (active ? Colors.PUCK : Colors.PROSPERO)};
  margin-left: 5px;
  font-size: 16px;
`;
