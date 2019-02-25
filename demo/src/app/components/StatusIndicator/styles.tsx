import styled from 'styled-components';

interface StatusBubbleProps {
  connected: boolean;
}

export const Container = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
`;

export const StatusBubble = styled.div<StatusBubbleProps>`
  width: 13px;
  height: 13px;
  border-radius: 50%;
  background: ${({ connected }) => connected ? '#1bbf1b' : '#ff0303'};
  box-shadow: inset -1px -1px 1px rgba(0,0,0,.5);
`;

export const StatusText = styled.span`
  margin-left: 5px;
  font-size: 12px;
`;
