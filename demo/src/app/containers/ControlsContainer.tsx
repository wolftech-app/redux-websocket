import { connect } from 'react-redux';
import { connect as websocketConnect, disconnect, send } from '@giantmachines/redux-websocket';

import Controls from '../components/Controls';
import { getConnected } from '../store/reducer';
import { WEBSOCKET_PREFIX } from '../constants';

const mapStateToProps = state => ({
  connected: getConnected(state),
});

const mapDispatchToProps = dispatch => ({
  connect: (url: string) => dispatch(websocketConnect(url, WEBSOCKET_PREFIX)),
  disconnect: () => dispatch(disconnect(WEBSOCKET_PREFIX)),
  onSendMessage: (message: string) => dispatch(send(message, WEBSOCKET_PREFIX)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Controls);
