import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import createHistory from 'history/createBrowserHistory';
import Authenticate from './reducers/Authenticate';
import Account from './reducers/Account';
import League from './reducers/League'

const storeCreator = () => {
    const history = createHistory();

    const rootReducer = combineReducers({Authenticate, Account, League});
   
    const composeEnhancers =
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  
    const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)));

    return {store, history};
};

export default storeCreator();