import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; //import localStorage, we can use sessionStorage as well if needed

import userReducer from './user/user.reducer';
import CategoriesReducer from './categories/categories.reducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: [] //Reducers to persist in localStorage
};

const rootReducer = combineReducers({
  user: userReducer,
  categories: CategoriesReducer
});

export default persistReducer(persistConfig, rootReducer); //return root reducer with enabled localStorage