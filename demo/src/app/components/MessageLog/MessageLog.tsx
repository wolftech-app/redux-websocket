import * as Prism from 'prismjs';
import * as React from 'react';
import * as debounce from 'debounce';

import { MessageState } from '../../store/defaultState';

import {
  AutoScrollCheckBox,
  AutoScrollLabel,
  Message,
  MessageContainer,
  MessageContents,
  MessageLogContainer,
  MessageLogWrapper,
  MetaContainer,
  MetaData,
  MetaType,
} from './styles';

interface Props {
  messages: MessageState[];
}

interface State {
  autoScroll: boolean;
  isHovered: boolean
}

/**
 * MessageLog Component
 */
export default class MessageLog extends React.Component<Props, State> {
  debouncedScroll: (container: HTMLDivElement) => void;

  // Create a container ref so we can automatically scroll it.
  containerRef = React.createRef<HTMLDivElement>();

  /**
   * Constructor
   * @constructor
   *
   * @param {Props} props
   */
  constructor(props: Props) {
    super(props);

    this.state = {
      autoScroll: true,
      isHovered: false,
    };

    this.debouncedScroll = debounce((container: HTMLDivElement) => {
      // eslint-disable-next-line no-param-reassign
      container.scrollTop = container.scrollHeight;
    }, 200);
  }

  /**
   * Get snapshot before update.
   *
   * @param prevProps
   *
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
   * Component did update.
   * Highlight code blocks and handle scrolling log to bottom.
   *
   * @param {Props} prevProps
   * @param {State} _prevState
   * @param {State} snapshot
   */
  componentDidUpdate(prevProps: Props, _prevState: State, snapshot: State): void {
    const { messages: prevMessages } = prevProps;
    const { messages } = this.props;
    const container = this.containerRef.current;

    if (prevMessages.length !== messages.length) {
      Prism.highlightAllUnder(container);
    }

    if (snapshot && snapshot.autoScroll) {
      this.debouncedScroll(container);
    }
  }

  /**
   * Handle container scroll
   *
   * @param event
   */
  handleScroll = (event: React.UIEvent<HTMLDivElement>): void => {
    // Only handle scroll events when the user is causing the scroll event
    // with the mouse. This prevents the smooth scroll behavior, which is
    // triggered by a button click in another element, from causing autoScroll
    // to get set to false.
    const { isHovered } = this.state;

    if (!isHovered) {
      return;
    }

    const container = event.currentTarget;
    const { scrollTop, scrollHeight, offsetHeight } = container;
    const isScrolledToBottom = scrollTop === scrollHeight - offsetHeight;

    this.setState({
      autoScroll: isScrolledToBottom,
    });
  }

  /**
   * Render messages.
   *
   * @param {MessageState[]}
   *
   * @returns {React.ReactNode}
   */
  renderMessages = (messages: MessageState[]): React.ReactNode => (
    messages.map((message) => {
      const {
        data,
        origin,
        timestamp,
        type,
      } = message;

      return (
        <Message key={timestamp.getTime()}>
          <MetaContainer type={type}>
            <MetaType>{type}</MetaType>
            <MetaData>{origin}</MetaData>
            <MetaData>{timestamp.toISOString()}</MetaData>
          </MetaContainer>

          <MessageContainer type={type}>
            <MessageContents type={type}>
              <code className="language-js">
                {JSON.stringify(data, null, 2)}
              </code>
            </MessageContents>
          </MessageContainer>
        </Message>
      );
    })
  )

  /**
   * Render
   *
   * @returns {React.ReactElement<typeof MessageLogWrapper>}
   */
  render(): React.ReactElement<typeof MessageLogWrapper> {
    const { autoScroll } = this.state;
    const { messages } = this.props;

    return (
      <MessageLogWrapper>
        <MessageLogContainer
          ref={this.containerRef}
          onScroll={this.handleScroll}
          onMouseOver={() => this.setState({ isHovered: true })}
          onMouseOut={() => this.setState({ isHovered: false })}
          onFocus={() => {}}
          onBlur={() => {}}
        >
          {this.renderMessages(messages)}
        </MessageLogContainer>

        <AutoScrollLabel htmlFor="auto-scroll">
          <AutoScrollCheckBox
            id="auto-scroll"
            type="checkbox"
            checked={autoScroll}
            onChange={() => this.setState({ autoScroll: !autoScroll })}
          />
          Auto scroll
        </AutoScrollLabel>
      </MessageLogWrapper>
    );
  }
}
