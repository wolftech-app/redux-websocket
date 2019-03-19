import * as React from 'react';
import * as Prism from 'prismjs';
import { MessageState } from '../../store/defaultState';

import {
  Container,
  MessageContainer,
  Message,
  MetaData,
  MetaContainer,
} from './styles';

import '../../styles/vendor/prism.scss';

interface Props {
  messages: MessageState[];
}

const renderMessages = (messages: MessageState[]) => (
  messages.map((message) => {
    const {
      data,
      origin,
      timestamp,
      type,
    } = message;

    return (
      <Container key={timestamp.getTime()}>
        <MetaContainer>
          <MetaData>{origin}</MetaData>
          <MetaData>{timestamp.toISOString()}</MetaData>
        </MetaContainer>

        <MessageContainer type={type}>
          <Message>
            <code className="language-js">
              {JSON.stringify(data, null, 2)}
            </code>
          </Message>
        </MessageContainer>
      </Container>
    );
  })
);

const MessageLogComponent = (props: Props) => {
  const { messages } = props;

  React.useEffect(() => {
    Prism.highlightAll();
  }, [messages]);

  return (
    <div>
      {renderMessages(messages)}
    </div>
  );
};

export default MessageLogComponent;
