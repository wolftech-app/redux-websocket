import * as React from 'react';

import Button from '../Button';

import exampleMessages from './exampleMessages';

import {
  ConnectedStatusIndicator,
  ConnectButton,
  Container,
  DisconnectButton,
  DisconnectedStatusIndicator,
  ExampleMessageDropDown,
  Input,
  InputGroup,
  Label,
  TextArea,
  SimulateDisconnectButton,
  StatusContents,
} from './styles';

interface Props {
  connected: boolean;
  connect: (url: string) => void;
  disconnect: () => void;
  onSendMessage: (message: any) => void;
}

interface State {
  message: string;
  webSocketUrl: string;
}

/**
 * Controls component.
 * @class
 */
class Controls extends React.Component<Props, State> {
  // State.
  state = {
    message: '',
    webSocketUrl: 'wss://websocket-echo-server.herokuapp.com',
  }

  /**
   * Component did mount.
   */
  componentDidMount() {
    const { connect } = this.props;
    const { webSocketUrl } = this.state;

    connect(webSocketUrl);
  }

  /**
   * Handle the example message changing.
   */
  handleExampleMessageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { value: message } = event.target;

    this.setState({ message });
  }

  /**
   * Handle the message field chaning.
   */
  handleMessageChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value: message } = event.target;

    this.setState({ message });
  }

  /**
   * Handle sending a message.
   */
  handleSendMessage = () => {
    const { onSendMessage } = this.props;
    const { message } = this.state;

    try {
      onSendMessage(JSON.parse(message));
    } catch {
      // eslint-disable-next-line no-alert
      alert('Please enter valid JSON!');
    }
  }

  /**
   * Handle the URL field changing.
   */
  handleUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value: webSocketUrl } = event.target;

    this.setState({ webSocketUrl });
  }

  /**
   * Simulate a disconnection.
   */
  simulateDisconnect = () => {
    // eslint-disable-next-line no-underscore-dangle
    (window as any).__socket.close();
  }

  /**
   * Render.
   *
   * @returns {React.ReactNode}
   */
  render(): React.ReactNode {
    const { connect, connected, disconnect } = this.props;
    const { message, webSocketUrl } = this.state;

    return (
      <Container>
        <InputGroup>
          <Label>
            Server

            <Input
              type="text"
              placeholder="Input server URL here…"
              onChange={this.handleUrlChange}
              value={webSocketUrl}
            />
          </Label>
        </InputGroup>

        <InputGroup>
          <Label>Status</Label>

          <StatusContents>
            <ConnectedStatusIndicator
              active={connected}
              text="Connected"
            />

            <DisconnectedStatusIndicator
              active={!connected}
              text="Disconnected"
              type="WARN"
            />

            <ConnectButton
              disabled={connected}
              onClick={() => connect(webSocketUrl)}
            >
              Connect
            </ConnectButton>

            <DisconnectButton
              disabled={!connected}
              onClick={disconnect}
            >
              Disconnect
            </DisconnectButton>

            <SimulateDisconnectButton onClick={this.simulateDisconnect}>
              Simulate Disconnect
            </SimulateDisconnectButton>
          </StatusContents>
        </InputGroup>

        <InputGroup>
          <Label>
            Example Messages

            <ExampleMessageDropDown
              options={exampleMessages}
              onChange={this.handleExampleMessageChange}
            />
          </Label>
        </InputGroup>

        <InputGroup>
          <TextArea
            onChange={this.handleMessageChange}
            placeholder="Input JSON formated message here…"
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
