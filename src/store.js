import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import persReducer from './slices/persSlice';
import storage from 'redux-persist/lib/storage'



const persistConfig = {
    key: 'root',
    storage: storage
};

const rootReducer = combineReducers({ 
    pers: persistReducer(persistConfig, persReducer),
});
  
export const store = createStore(rootReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);
