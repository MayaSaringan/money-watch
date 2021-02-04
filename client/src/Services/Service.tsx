import debugVars from '../debug'
var ID = function () {
  return '_' + Math.random().toString(36).substr(2, 9);
};
export class Item {
  cost;
  date;
  title;
  notes;
  category;
  p1Cost;
  p2Cost;
  amazonOrderID;
  constructor(cost: number, date: Date, title: string, notes:string, category: string, p1Cost: number, p2Cost: number, amazonOrderID: string = ""){
    this.cost = cost;
    this.date = date;
    this.title = title;
    this.notes = notes;
    this.category = category;
    this.p1Cost = p1Cost;
    this.p2Cost = p2Cost;
    this.amazonOrderID = amazonOrderID;
  }
}
export class Category {
  cost;
  p1Cost;
  p2Cost;
  constructor(cost: number,p1Cost: number, p2Cost: number){
    this.cost = cost;
    this.p1Cost = p1Cost;
    this.p2Cost = p2Cost;
  }
}

export const requestItems = () => {
  return new Promise((res:any, rej:any) => {
    fetch(debugVars.itemsEndpoint).then(res=>{
      return res.json()
     } 
     ).then(data => { 
       let newItems:any = {}
       let newSummaries:any = {}
       let newAmazonOrders:any = {}
       Object.keys(data).forEach(key => {
  
        let item = data[key]
        newItems = { ...newItems, [key]: new Item(item.cost, new Date(item.date), item.title,item.notes, item.category, item.p1Cost, item.p2Cost, item.amazonOrderID)}
        if (newSummaries[item.category]){ 
          newSummaries[item.category].cost = parseFloat(newSummaries[item.category].cost)+    parseFloat(item.cost)
          newSummaries[item.category].p1Cost =parseFloat(newSummaries[item.category].p1Cost)+ parseFloat(item.p1Cost)
          newSummaries[item.category].p2Cost = parseFloat(newSummaries[item.category].p2Cost) + parseFloat(item.p2Cost) 
        }else{ 
          newSummaries[item.category] = new Category(parseFloat(item.cost), item.p1Cost, item.p2Cost)
        }
        if (item.amazonOrderID){
          
          if (!newAmazonOrders[item.amazonOrderID]){ 
            newAmazonOrders[item.amazonOrderID] = []
          }
          newAmazonOrders[item.amazonOrderID].push(key)
        }
       })
       
       res({items:newItems, summaries:newSummaries, amazonOrders: newAmazonOrders})
     })
  })
}