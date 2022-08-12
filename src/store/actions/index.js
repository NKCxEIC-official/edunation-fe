import axios from "axios";
import store from "../store";

const state = store.getState();

export const solution = (data) => {
  return async function fetchTicket(dispatch, getState) {
    const authToken = state.authReducers.authData.access_token;

    const response = await axios.get(
      `https://salesworkqa.godeskless.com/api/suggest/solution/?id=${data.id}`,
      {
        headers: {
          Authorization: `Bearer ksaOjov9QswVQ2JTFVNlmY9Hr0GG68`,
        },
      }
    );
    dispatch({
      type: "SOLUTION",
      payload: response.data,
    });
  };
};
