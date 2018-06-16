import {
  put,
  call,
  fork,
  all,
  take,
} from 'redux-saga/effects';

import {
  authActionCreators,
  LOGIN_REQUEST,
  SIGNUP_REQUEST
} from './actions';

import { KycService } from '../../../services';

export function* asyncLoginRequest({ payload, resolve, reject }) {
  const { email, password } = payload;
  try {
    const response = yield call(KycService,
      {
        api: `/admin/signin`,
        method: 'POST',
        params: {
          email: email,
          password: password
        }
      });
    // @TODO: Open next lines after login api is completed
    if (response.status === 200) {
      // console.log('login response:', response);
      yield put(authActionCreators.loginSuccess({ user: response.data }));
      resolve(response);
    } else {
      reject(response.msg);
    }
  } catch (e) {
    reject(e);
  }
}

export function* asyncSignupRequest({ payload, resolve, reject }) {
  const { email, password } = payload;
  try {
    const response = yield call(KycService,
      {
        api: `/admin/signup`,
        method: 'POST',
        params: {
          email: email,
          password: password
        }
      });
    resolve(response);
  } catch (e) {
    reject(e);
  }
}


export function* watchLoginRequest() {
  while (true) {
    const action = yield take(LOGIN_REQUEST);
    yield* asyncLoginRequest(action);
  }
}

export function* watchSignupRequest() {
  while (true) {
    const action = yield take(SIGNUP_REQUEST);
    yield* asyncSignupRequest(action);
  }
}

export default function* () {
  yield all([
    fork(watchLoginRequest),
    fork(watchSignupRequest)
  ]);
}
