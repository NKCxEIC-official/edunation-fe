import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { AuthReducer } from './reducers/AuthReducer';
import { LoadingReducer } from './reducers/LoadingReducer';

const middleware = applyMiddleware(thunk);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const reducers = combineReducers({
  Auth: AuthReducer,
  Loader: LoadingReducer,
});

const store = createStore(reducers, composeEnhancers(middleware));

export default store;
