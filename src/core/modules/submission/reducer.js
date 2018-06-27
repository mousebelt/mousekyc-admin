import {
  SUBMISSION_REQUEST_SUCCESS
} from './actions';
import { initialState } from '../initialState';

export default function submission(state = initialState.submission, action = {}) {
  const { type, payload } = action;

  switch (type) {
    case SUBMISSION_REQUEST_SUCCESS: {
      return {
        ...state,
        list: payload.list
      }
      break;
    }
    default: {
      return state;
    }
  }
}
