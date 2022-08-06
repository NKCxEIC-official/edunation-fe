import { combineReducers } from "redux";
import dataReducer from "./data/reducers";
import userReducer from "./user/reducers";

const rootReducer = combineReducers({
  user: userReducer,
  appData: dataReducer,
});

export default rootReducer;
