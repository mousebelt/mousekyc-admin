import {
  SUBMISSION_REQUEST_SUCCESS
} from './actions';
import { initialState } from '../initialState';

export default function auth(state = initialState.auth, action = {}) {
  const { type, payload } = action;

  switch (type) {
    case SUBMISSION_REQUEST_SUCCESS: {
      return {
        ...state,
        submissionList: payload.list
      }
      break;
    }
    default: {
      return state;
    }
  }
}
