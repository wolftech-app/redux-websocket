import { connect } from 'react-redux';
import { websocketConnect, websocketDisconnect, websocketSend } from '../store/actions';
import Controls from '../components/Controls';


const mapDispatchToProps = dispatch => ({
  connect: (url: string) => dispatch(websocketConnect({ url })),
  disconnect: () => dispatch(websocketDisconnect),
  onSendMessage: (message: string) => {
    console.log(' in container', message);
    dispatch(websocketSend(message))
  }
})

export default connect(null, mapDispatchToProps)(Controls);
