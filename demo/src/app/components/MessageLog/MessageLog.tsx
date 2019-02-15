import * as React from 'react';
import { useEffect } from 'react';
import * as Prism from 'prismjs';
import { MessageState } from '../../store/defaultState';

import { Container, Message } from './styles';

import '../../styles/vendor/prism.scss';

interface Props {
  messages: MessageState[];
}

const renderMessages = (messages: MessageState[]) => (
  messages.map(message => (
    <Container type={message.type} key={message.timestamp.getTime()}>
      <Message>
        <code className="language-js">
          {JSON.stringify(message.data, null, 2)}
        </code>
      </Message>
    </Container>
  ))
);

const MessageLogComponent = (props: Props) => {
  useEffect(() => {
    Prism.highlightAll();
  }, [props.messages]);

  return (
    <div>
      {renderMessages(props.messages)}
    </div>
  );
};

export default MessageLogComponent;
