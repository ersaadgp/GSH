import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import rootReducer from '../reducers';

const persistConfig = {
  key: 'auth',
  storage: storage,
  whitelist: ['auth'],
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const pReducer = persistReducer(persistConfig, rootReducer);
const middleware = composeEnhancers(applyMiddleware(thunk));
const store = createStore(pReducer, middleware);
const persistor = persistStore(store);

export { persistor, store };
