import * as React from 'react';
import * as Prism from 'prismjs';
import { MessageState } from '../../store/defaultState';

import {
  AutoScrollCheckBox,
  AutoScrollLabel,
  Container,
  Message,
  MessageContainer,
  MessageLogContainer,
  MessageLogWrapper,
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
  componentDidUpdate(prevProps: Props, _prevState: State, snapshot: State) {
    const { messages: prevMessages } = prevProps;
    const { messages } = this.props;
    const container = this.containerRef.current;

    if (prevMessages.length !== messages.length) {
      Prism.highlightAllUnder(container);
    }

    if (snapshot && snapshot.autoScroll) {
      container.scrollTop = container.scrollHeight;
    }
  }

  /**
   * Get snapshot before update.
   *
   * @param prevProps
   * @returns {State}
   */
  getSnapshotBeforeUpdate(prevProps: Props): State {
    const { messages: prevMessages } = prevProps;
    const { messages } = this.props;

    if (prevMessages.length !== messages.length) {
      return this.state;
    }

    return null;
  }

  /**
   * Handle container scroll
   *
   * @param event
   */
  handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const container = event.currentTarget;
    const { scrollTop, scrollHeight, offsetHeight } = container;
    const isScrolledToBottom = scrollTop === scrollHeight - offsetHeight;

    this.setState({
      autoScroll: isScrolledToBottom,
    });
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
    const { autoScroll } = this.state;
    const { messages } = this.props;

    return (
      <MessageLogWrapper>
        <AutoScrollLabel htmlFor="auto-scroll">
          <AutoScrollCheckBox
            id="auto-scroll"
            type="checkbox"
            checked={autoScroll}
            onChange={() => this.setState({ autoScroll: !autoScroll })}
          />
          Auto scroll
        </AutoScrollLabel>

        <MessageLogContainer
          ref={this.containerRef}
          onScroll={this.handleScroll}
        >
          {this.renderMessages(messages)}
        </MessageLogContainer>
      </MessageLogWrapper>
    );
  }
}
