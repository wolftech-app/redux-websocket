import { connect } from 'react-redux';

import MessageLog from '../components/MessageLog';

const mapStateToProps = state => ({
  messages: state.messages,
});

export default connect(mapStateToProps)(MessageLog);
