import { createAction } from 'redux-actions';
import { createPromiseAction } from '../utils';

/**
 * Action Types
 */

export const SUBMISSION_REQUEST = 'submission/SUBMISSION_REQUEST';
export const SUBMISSION_REQUEST_SUCCESS = 'submission/SUBMISSION_REQUEST_SUCCESS';
export const DOCUMENT_REQUEST = 'document/DOCUMENT_REQUEST';
export const DOCUMENT_REQUEST_SUCCESS = 'document/DOCUMENT_REQUEST_SUCCESS';
export const USER_STATUS_REQUEST = 'user/STATUS_UPDATE_REQUEST';
export const USER_STATUS_REQUEST_SUCCESS = 'user/STATUS_UPDATE_REQUEST_SUCCESS';
/**
 * Action Creators
 */
export const submissionActionCreators = {
  getSubmissionList: createPromiseAction(SUBMISSION_REQUEST),
  getSubmissionListSuccess: createAction(SUBMISSION_REQUEST_SUCCESS),
  getUserDocument: createPromiseAction(DOCUMENT_REQUEST),
  getUserDocumentSuccess: createPromiseAction(DOCUMENT_REQUEST_SUCCESS),
  updateUserStatus: createPromiseAction(USER_STATUS_REQUEST),
  updateUserStatusSuccess: createPromiseAction(USER_STATUS_REQUEST_SUCCESS)
};
