import { combineReducers } from "redux";
import userReducer from './user/reducers';

const rootReducer = () => {
    return combineReducers({
        user: userReducer
    });
}

export default rootReducer;