import styled from 'styled-components';

interface MessageLogContainerProps {
  type: string;
}

export const Container = styled.div<MessageLogContainerProps>`
  border-right: ${props => props.type === 'INCOMING' ? '5px solid red' : null};
  border-left: ${props => props.type === 'OUTGOING' ? '5px solid blue' : null};
  display: flex;
  justify-content: ${props => props.type === 'OUTGOING' ? 'flex-start' : 'flex-end'};
  margin-bottom: 10px;
`;

export const Message = styled.pre`
  font-size: 12px;
  white-space: pre-wrap;
  word-wrap: break-word;
`
