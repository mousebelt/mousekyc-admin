import { connect } from 'react-redux';
import { submissionActionCreators } from './actions';

function mapStateToProps({ auth }) {
  return {
    auth,
  };
}

const mapDispatchToProps = submissionActionCreators;

export function connectSubmission(configMapStateToProps = mapStateToProps) {
  return connect(
    configMapStateToProps,
    mapDispatchToProps,
  );
}
