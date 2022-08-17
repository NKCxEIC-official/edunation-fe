import noteReducers from "./noteReducer";
import authReducers from "./AuthReducer";
import ticketReducers from "./ticketReducer";
import favoriteReducers from "./favoriteReducer";
import solutionReducers from "./solutionsReducer";
import PostsReducer from "./PostsReducer";


import { combineReducers } from "redux";

const rootReducer = combineReducers({
    noteReducers,
    authReducers,PostsReducer,
    ticketReducers,favoriteReducers,solutionReducers
})

export default rootReducer;