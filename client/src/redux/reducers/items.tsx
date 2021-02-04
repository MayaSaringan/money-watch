const initialState: any = {
  items: {},
  summaries: {},
  amazonOrders:{}
}
export default function( state = initialState, action: any){
 console.log(action.payload)
  switch(action.type){
    case 'UPDATE_ITEMS':{
      return {
        ...state,
        items: {
          ...state.items,
          ...action.payload.items,
        },
        summaries: {
          ...state.summaries,
          ...action.payload.summaries
        },
        amazonOrders: {
          ...state.amazonOrders,
          ...action.payload.amazonOrders
        }
      }
    }
    default:
      return state;
  }
}