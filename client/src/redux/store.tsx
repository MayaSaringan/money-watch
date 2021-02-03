import {createStore } from 'redux'; 
import itemsReducer from './reducers/items'; 

  
const store = createStore(
  itemsReducer);

export type RootState = ReturnType<typeof itemsReducer>;
export default store;
