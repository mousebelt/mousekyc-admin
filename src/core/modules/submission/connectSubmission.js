import { connect } from 'react-redux';
import { submissionActionCreators } from './actions';

function mapStateToProps({ submission }) {
  return {
    submission,
  };
}

const mapDispatchToProps = submissionActionCreators;

export function connectSubmission(configMapStateToProps = mapStateToProps) {
  return connect(
    configMapStateToProps,
    mapDispatchToProps,
  );
}
