import actions from "./constants";

const initialState = {
  base: {},
  loading: false,
};

export default function dataReducer(state = initialState, action) {
  switch (action.type) {
    case actions.FETCH_STARTED:
      return { ...state, loading: true };
    case actions.FETCH_SUCCESS:
      return {
        ...state,
        base: { ...state.base, [action.payload.dataKey]: action.payload.dataValue },
        loading: false,
      };
    case actions.FETCH_FAILED:
      return { ...state, loading: false };
    case actions.DELETE_DATA_KEY:
      const base = state.base;
      delete base[action.payload.key];
      return { ...state, base: { ...base } };
    default:
      return state;
  }
}
