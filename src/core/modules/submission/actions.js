import { createAction } from 'redux-actions';
import { createPromiseAction } from '../utils';

/**
 * Action Types
 */

export const SUBMISSION_REQUEST = 'submission/SUBMISSION_REQUEST';
export const SUBMISSION_REQUEST_SUCCESS = 'submission/SUBMISSION_REQUEST_SUCCESS';

/**
 * Action Creators
 */
export const submissionActionCreators = {
  getSubmissionList: createPromiseAction(SUBMISSION_REQUEST),
  getSubmissionListSuccess: createAction(SUBMISSION_REQUEST_SUCCESS),
};
