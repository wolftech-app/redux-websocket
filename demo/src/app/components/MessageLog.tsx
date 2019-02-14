import * as React from 'react';
import { useEffect } from 'react';
import * as Prism from 'prismjs';
import styled from 'styled-components';
import { MessageState } from '../store/defaultState';

import '../styles/vendor/prism.scss';

interface Props {
  messages: MessageState[];
}

interface MessageLogContainerProps {
  type: string;
}

const MessageLogContainer = styled.div<MessageLogContainerProps>`
  border-right: ${props => props.type === 'INCOMING' ? '5px solid red' : null};
  border-left: ${props => props.type === 'OUTGOING' ? '5px solid blue' : null};
  display: flex;
  justify-content: ${props => props.type === 'OUTGOING' ? 'flex-start' : 'flex-end'};
  margin-bottom: 10px;
`;

const MessageContainer = styled.pre`
  font-size: 12px;
  white-space: pre-wrap;
  word-wrap: break-word;
`

const renderMessages = (messages: MessageState[]) => (
  messages.map(message => (
    <MessageLogContainer type={message.type} key={message.timestamp.getTime()}>
      <MessageContainer>
        <code className="language-js">
          {JSON.stringify(message.data, null, 2)}
        </code>
      </MessageContainer>
    </MessageLogContainer>
  ))
);

const MessageLog = (props: Props) => {
  useEffect(() => {
    Prism.highlightAll();
  }, [props.messages]);

  return (
    <div>
      {renderMessages(props.messages)}
    </div>
  );
};

export default MessageLog;
