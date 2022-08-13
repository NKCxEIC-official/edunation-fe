/* eslint-disable */
import { START_LOADING, STOP_LOADING } from '../constants';

const initialState = { loading: false };

export function LoadingReducer(state = initialState, action) {
  if (action.type === START_LOADING) {
    return {
      ...state,
      loading: true,
    };
  }

  if (action.type === STOP_LOADING) {
    return {
      ...state,
      loading: false,
    };
  }

  return state;
}
