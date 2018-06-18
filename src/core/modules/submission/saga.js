import {
  put,
  call,
  fork,
  all,
  take,
} from 'redux-saga/effects';

import {
  submissionActionCreators,
  SUBMISSION_REQUEST,
  DOCUMENT_REQUEST,
  USER_STATUS_REQUEST
} from './actions';

import { KycService } from '../../../services';

export function* asyncSubmissionRequest({ payload, resolve, reject }) {
  const { token, offset, count, approvalStatus } = payload;
  try {
    const response = yield call(KycService,
      {
        api: `/admin/submission_list?token=${token}&count=${count}&offset=${offset}${approvalStatus ? '&approvalStatus=' + approvalStatus : ''}`,
        method: 'GET',
        params: {}
      });
    if (response.status === 200) {
      yield put(submissionActionCreators.getSubmissionListSuccess({ list: response.data }));
      resolve(response);
    } else {
      reject(response.msg);
    }
  } catch (e) {
    reject(e);
  }
}

export function* asyncDocumentRequest({ payload, resolve, reject }) {
  const { token, useremail, type } = payload;
  try {
    const response = yield call(KycService,
      {
        api: `/admin/userdocuments?token=${token}&useremail=${useremail}${type ? '&type=' + type : ''}`,
        method: 'GET',
        params: {}
      });
    if (response.status === 200) {
      resolve(response);
    } else {
      reject(response.msg);
    }
  } catch (e) {
    reject(e);
  }
}

export function* asyncUserStatusRequest({ payload, resolve, reject }) {
  const { token, useremail, approvalStatus, approvalDescription } = payload;
  try {
    const response = yield call(KycService,
      {
        api: `/admin/approve_user`,
        method: 'POST',
        params: {
          token: token,
          useremail: useremail,
          approvalStatus: approvalStatus,
          approvalDescription: approvalDescription
        }
      });
    if (response.status === 200) {
      resolve(response);
    } else {
      reject(response.msg);
    }
  } catch (e) {
    reject(e);
  }
}

export function* watchSubmissionRequest() {
  while (true) {
    const action = yield take(SUBMISSION_REQUEST);
    yield* asyncSubmissionRequest(action);
  }
}

export function* watchDocumentRequest() {
  while (true) {
    const action = yield take(DOCUMENT_REQUEST);
    yield* asyncDocumentRequest(action);
  }
}

export function* watchUserStatusRequest() {
  while (true) {
    const action = yield take(USER_STATUS_REQUEST);
    yield* asyncUserStatusRequest(action);
  }
}

export default function* () {
  yield all([
    fork(watchSubmissionRequest),
    fork(watchDocumentRequest),
    fork(watchUserStatusRequest)
  ]);
}
