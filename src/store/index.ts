import { combineReducers } from 'redux';
import store, { IStoreReducer } from './reducer';

export interface IRootState {
  store: IStoreReducer,
}

export default combineReducers<IRootState>({
  store
});
