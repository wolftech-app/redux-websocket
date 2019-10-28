import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { connect as websocketConnect, disconnect, send } from '@giantmachines/redux-websocket';

import Controls from '../components/Controls';
import { getConnected } from '../store/reducer';

const mapStateToProps = state => ({
  connected: getConnected(state),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  connect: (url: string) => dispatch(websocketConnect(url)),
  disconnect: () => dispatch(disconnect()),
  onSendMessage: (message: any) => dispatch(send(message)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Controls);
