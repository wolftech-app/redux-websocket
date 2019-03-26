import * as React from 'react';
import * as Prism from 'prismjs';
import { MessageState } from '../../store/defaultState';

import {
  Container,
  Message,
  MessageContainer,
  MessageLogContainer,
  MetaData,
  MetaContainer,
} from './styles';

import '../../styles/vendor/prism.scss';

interface Props {
  messages: MessageState[];
}

interface State {
  autoScroll: boolean;
}

/**
 * Message Log Component
 */
export default class MessageLog extends React.Component<Props, State> {
  containerRef = React.createRef<HTMLDivElement>();

  /**
   * Constructor
   */
  constructor(props) {
    super(props);

    this.state = {
      autoScroll: true,
    };
  }

  /**
   * Component did update.
   * Highlight code blocks and handle scrolling log to bottom.
   *
   * @param prevProps
   * @param _prevState
   * @param snapshot
   */
  componentDidUpdate(prevProps: Props, _prevState: State, snapshot: boolean) {
    const { autoScroll } = this.state;
    const { messages: prevMessages } = prevProps;
    const { messages } = this.props;

    if (prevMessages.length !== messages.length) {
      Prism.highlightAllUnder(this.containerRef.current);
    }

    if (autoScroll && snapshot) {
      const container = this.containerRef.current;
      container.scrollTop = container.scrollHeight;
    }
  }

  /**
   * Get snapshot before update.
   *
   * @param prevProps
   * @returns {boolean}
   */
  getSnapshotBeforeUpdate(prevProps: Props): boolean {
    const { messages: prevMessages } = prevProps;
    const { messages } = this.props;

    if (prevMessages.length !== messages.length) {
      const { current: container } = this.containerRef;
      const { scrollTop, scrollHeight, offsetHeight } = container;
      return scrollTop === scrollHeight - offsetHeight;
    }

    return null;
  }

  /**
   * Render messages
   */
  renderMessages = (messages: MessageState[]): JSX.Element[] => (
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
  )

  /**
   * Render
   */
  render() {
    const { messages } = this.props;

    return (
      <MessageLogContainer ref={this.containerRef}>
        {this.renderMessages(messages)}
      </MessageLogContainer>
    );
  }
}
