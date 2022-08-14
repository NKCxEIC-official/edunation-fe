import { START_LOADING, STOP_LOADING } from '../constants';

export function startLoadingAction() {
  return (dispatch) => {
    dispatch({
      type: START_LOADING,
    });
  };
}

export function stopLoadingAction() {
  return (dispatch) => {
    dispatch({
      type: STOP_LOADING,
    });
  };
}
