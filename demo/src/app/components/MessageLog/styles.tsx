import styled from 'styled-components';

interface MessageLogContainerProps {
  type: string;
}

export const Container = styled.div`
  margin-bottom: 10px;
`;

export const MessageContainer = styled.div<MessageLogContainerProps>`
  border-right: ${props => (props.type === 'INCOMING' ? '5px solid red' : null)};
  border-left: ${props => (props.type === 'OUTGOING' ? '5px solid blue' : null)};
  display: flex;
  justify-content: ${props => (props.type === 'OUTGOING' ? 'flex-start' : 'flex-end')};
`;

export const Message = styled.pre`
  font-size: 12px;
  white-space: pre-wrap;
  word-wrap: break-word;
`;

export const MetaData = styled.div``;

export const MetaContainer = styled.div`
  color: #dddddd;
  text-align: center;
  font-size: 12px;
`;

export const MessageLogContainer = styled.div`
  height: 100%;
  overflow: auto;
  padding: 10px;
`;
