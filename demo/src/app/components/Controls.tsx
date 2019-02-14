import * as React from 'react';
import styled from 'styled-components';

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

const ControlsContainer = styled.div``;

const TextArea = styled.textarea`
  margin-bottom: 10px;
  padding: 10px;
  resize: vertical;
  width: 100%;
`;

const Input = styled.input`
  display: block;
  margin-bottom: 10px;
  padding: 5px 10px;
  width: 100%;
`;

const InputGroup = styled.div`
  margin-bottom: 20px;
`;

class Controls extends React.Component<Props, State> {
  public constructor(props) {
    super(props);
    this.state = {
      message: '',
      webSocketUrl: 'wss://websocket-echo-server.herokuapp.com',
    }
  }

  public componentDidMount() {
    const { webSocketUrl } = this.state;
    this.props.connect(webSocketUrl);
  }

  public handleMessageChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target;
    this.setState({ message: value });
  }

  public handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    this.setState({ webSocketUrl: value });
  }

  public render() {
    const { message, webSocketUrl } = this.state;

    return (
      <ControlsContainer>
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
      </ControlsContainer>
    );
  }
}

export default Controls;
