import {Dispatch} from 'redux'; 
import {Category} from '../Services/Service'
 
export const updateItems = (items : any, summaries: any, amazonOrders : any = {}) =>  {
 
  let payload = {
    items:items ,
    summaries:summaries,
    amazonOrders:amazonOrders
  }
  console.log(payload)
  return {
    type: 'UPDATE_ITEMS',
    payload: payload ,
  } 
};
 