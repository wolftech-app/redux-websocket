import { connect } from 'react-redux';

// import { websocketConnect, websocketDisconnect, websocketSend } from '../store/actions';
import App from '../components/App';

const mapDispatchToProps = {
  clear: () => ({ type: 'INTERNAL::CLEAR_MESSAGE_LOG' }),
};

export default connect(null, mapDispatchToProps)(App);
