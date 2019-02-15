import * as React from 'react';

import {
  Container,
  InputGroup,
  Input,
  TextArea,
} from './styles';

interface Props {
  connect: (url: string) => void;
  disconnect: () => void;
  onSendMessage: (message) => void;
}

interface State {
  message: string;
  webSocketUrl: string;
}

interface Controls {
  webSocketUrl: string;
}

class Controls extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      message: '',
      webSocketUrl: 'wss://websocket-echo-server.herokuapp.com',
    }
  }

  componentDidMount() {
    const { webSocketUrl } = this.state;
    this.props.connect(webSocketUrl);
  }

  handleMessageChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    this.setState({ message: value });
  }

  handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    this.setState({ webSocketUrl: value });
  }

  render() {
    const { message, webSocketUrl } = this.state;

    return (
      <Container>
        <InputGroup>
          <Input
            type="text"
            onChange={this.handleUrlChange}
            value={webSocketUrl}
          />
          <button onClick={() => this.props.connect(webSocketUrl)}>
            Connect
          </button>
          <button onClick={this.props.disconnect}>
            Disconnect
          </button>
        </InputGroup>

        <InputGroup>
          <TextArea
            onChange={this.handleMessageChange}
            placeholder="Input JSON formated message here..."
            value={message}
            rows={10}
          />
          <button onClick={() => this.props.onSendMessage(message)}>
            Send message
          </button>
        </InputGroup>
      </Container>
    );
  }
}

export default Controls;
