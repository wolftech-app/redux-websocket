import * as React from 'react';
import Button from '../Button';
import DropDown from '../DropDown';
import Label from '../Label';

import exampleMessages from './exampleMessages';

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

  handleExampleMessageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;
    this.setState({ message: value});
  }

  handleMessageChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    this.setState({ message: value });
  }

  handleSendMessage = () => {
    const { onSendMessage } = this.props;
    const { message } = this.state;

    try {
      onSendMessage(JSON.parse(message));
    } catch {
      alert('Please enter valid JSON!');
    }
  }

  handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    this.setState({ webSocketUrl: value });
  }

  render() {
    const { disconnect } = this.props;
    const { message, webSocketUrl } = this.state;

    return (
      <Container>
        <InputGroup>
          <Input
            type="text"
            onChange={this.handleUrlChange}
            value={webSocketUrl}
          />
          <Button onClick={() => this.props.connect(webSocketUrl)}>
            Connect
          </Button>
          <Button onClick={disconnect}>
            Disconnect
          </Button>
        </InputGroup>

        <InputGroup>
          <Label text="Example Messages" />
          <DropDown
            options={exampleMessages}
            onChange={this.handleExampleMessageChange}
            placeholder="Testing"
          />
        </InputGroup>

        <InputGroup>
          <TextArea
            onChange={this.handleMessageChange}
            placeholder="Input JSON formated message here..."
            value={message}
            rows={10}
          />
          <Button onClick={this.handleSendMessage}>
            Send message
          </Button>
        </InputGroup>
      </Container>
    );
  }
}

export default Controls;
