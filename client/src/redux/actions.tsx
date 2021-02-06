 
export const updateItems = (items : any, summaries: any, amazonOrders : any = {}) =>  {
 
  let payload = {
    items:items ,
    summaries:summaries,
    amazonOrders:amazonOrders
  }
  return {
    type: 'UPDATE_ITEMS',
    payload: payload ,
  } 
};
 