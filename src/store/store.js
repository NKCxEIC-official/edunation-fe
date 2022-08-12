import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import PostsReducer from "./reducers/PostsReducer";
import ChatReducer from "./reducers/ChatReducer";
import FRListReducer from "./reducers/FRListReducer";
import TicketReducer from "./reducers/ticketReducer";
import FavoriteReducer from "./reducers/favoriteReducer";
import SolutionReducer from "./reducers/solutionsReducer";
import similarCaseReducer from "./reducers/similarCaseReducer";
import FAReducer from "./reducers/FAReducer";
import ClosedTicketReducer from "./reducers/ClosedTicketReducer";
import thunk from "redux-thunk";
import { AuthReducer } from "./reducers/AuthReducer";
import SnackBarReducer from "./reducers/SnackBarReducer";
import NotesReducer from "./reducers/NotesReducer";
import WorkVisitReducer from "./reducers/WorkVisitReducer";
import V2FRReducer from "./reducers/V2FRReducer";
import SchedulerReducer from "./reducers/SchedulerList";
import VideoCallReducer from "./reducers/VideoCallReducer";
import ChildListReducer from "./reducers/ChildListReducer";
import AssetListReducer from "./reducers/AssetListReducer";
import NotificationReducer from "./reducers/NotificationReducer";
import ScheduleVisitReducer from "./reducers/ScheduleVisitReducer";

const loggerMiddleware = (store) => (next) => (action) => {
	console.log("dispatching action", action);
	console.log("before dispatching state", store.getState());
	let result = next(action);
	setTimeout(() => {
		console.log("dispatch time out");
	}, 5000);
	console.log("next state", store.getState());
	return result;
};

const middleware = applyMiddleware(thunk);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = combineReducers({
  posts: PostsReducer,
  ticket: TicketReducer,
  fav: FavoriteReducer,
  sol: SolutionReducer,
  auth: AuthReducer,
  frData: FRListReducer,
  WhatsappChat: ChatReducer,
  snackbar: SnackBarReducer,
  childList: ChildListReducer,
  faData: FAReducer,
  similar: similarCaseReducer,
  closed: ClosedTicketReducer,
  note: NotesReducer,
  workVisit: WorkVisitReducer,
  v2FR: V2FRReducer,
  schedulerList: SchedulerReducer,
  videoCall: VideoCallReducer,
  assets: AssetListReducer,
  NotificationList:NotificationReducer,
  scheduleVisit : ScheduleVisitReducer
});

const store = createStore(reducers, composeEnhancers(middleware));

export default store;
