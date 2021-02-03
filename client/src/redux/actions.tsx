import {Dispatch} from 'redux'; 
import {Category} from '../Services/Service'
 
export const updateItems = (items : any, summaries: any) =>  {
 
  let payload = {
    items:items ,
    summaries:summaries
  }
  console.log(payload)
  return {
    type: 'UPDATE_ITEMS',
    payload: payload ,
  } 
};
 