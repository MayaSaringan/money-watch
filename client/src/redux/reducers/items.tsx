const initialState: any = {
  items: {},
  summaries: {}
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
        }
      }
    }
    default:
      return state;
  }
}