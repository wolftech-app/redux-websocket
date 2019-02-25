import { connect } from 'react-redux';
import StatusIndicator from '../components/StatusIndicator';
import { getConnected } from '../store/reducer';

const mapStateToProps = state => ({
  connected: getConnected(state),
});

export default connect(mapStateToProps)(StatusIndicator);
