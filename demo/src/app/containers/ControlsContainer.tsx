import { connect } from 'react-redux';
import Controls from '../components/Controls';
import { getConnected } from '../store/reducer';
import { websocketConnect, websocketDisconnect, websocketSend } from '../store/actions';

const mapStateToProps = state => ({
  connected: getConnected(state),
});

const mapDispatchToProps = dispatch => ({
  connect: (url: string) => dispatch(websocketConnect({ url })),
  disconnect: () => dispatch(websocketDisconnect),
  onSendMessage: (message: string) => {
    dispatch(websocketSend(message));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Controls);
