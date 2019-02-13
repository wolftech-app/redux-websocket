import * as React from 'react';
import { connect } from 'react-redux';
import { websocketConnect, websocketSend } from '../store/actions';

interface Props {
  onSendMessage: (message) => void;
  onMount: () => void;
}

interface State {
  input: string;
}

class Index extends React.Component<Props, State> {
  public constructor(props) {
    super(props);
    this.state = {
      input: '',
    }
  }

  public componentDidMount() {
    this.props.onMount();
  }

  public handleInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  public render() {
    const inputText = this.state.input;

    return (
      <div>
        <h1>
          redux-web-socket
        </h1>
        <input type="text" onChange={this.handleInputChange}/>
        <button onClick={() => this.props.onSendMessage(inputText)}>
          Send message
        </button>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onSendMessage: (message) => dispatch(websocketSend(message)),
    onMount: () => dispatch(websocketConnect({ url: 'wss://websocket-echo-server.herokuapp.com' })),
  }
}

export default connect(null, mapDispatchToProps)(Index);
