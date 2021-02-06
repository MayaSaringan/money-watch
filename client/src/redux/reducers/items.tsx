const initialState: any = {
  items: {},
  summaries: {},
  amazonOrders:{}
}
export default function( state = initialState, action: any){
  switch(action.type){
    case 'UPDATE_ITEMS':{
      return {
        ...state,
        items: {
          ...action.payload.items,
        },
        summaries: {
          ...action.payload.summaries
        },
        amazonOrders: {
          ...action.payload.amazonOrders
        }
      }
    }
    
    default:
      return state;
  }
}