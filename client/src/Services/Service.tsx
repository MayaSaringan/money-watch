import debugVars from '../debug'
import {Item, Category} from '../Types'
import Papa from 'papaparse';
 
var ID = function () {
  return '_' + Math.random().toString(36).substr(2, 9);
}; 

export const loadLocalCSV = () => {
  return new Promise((res:any, rej:any) => {
    return fetch('/csv/debit.csv').then( (response:any) => {
      let reader = null;
      if (response){
        reader = response.body.getReader();
      }
      let decoder = new TextDecoder('utf-8');

      reader.read().then((result:any)=> {
        let val =decoder.decode(result.value)
        console.log("TEST")
        Papa.parse(val, {
          complete: ((parsedCsv:any) => { 
            let newItems:any = {}
            let newSummaries:any = {}
            let newAmazonOrders:any = {} 
            parsedCsv.data.forEach( (csvArr:any) => {
              newItems = { ...newItems, [ID()]: new Item(csvArr[1], new Date(csvArr[0]), csvArr[3], null, null, null, null, "")}
            })
           console.log(newItems)
            res({items:newItems, summaries:newSummaries, amazonOrders: newAmazonOrders})

          })
       }); 
      });
  });
})
}
 
export const processItems = (data:any) => {
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
  
  return {items:newItems, summaries:newSummaries, amazonOrders: newAmazonOrders}
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

export const sendItems = (newItem:any) => {
  return new Promise((res:any, rej:any) => {
    
    let item = {
      title:newItem.title,
      cost:newItem.cost,
      date:newItem.date,
      notes:newItem.notes,
      category:newItem.category,
      p1Cost: newItem.splitRule == "1:1" ? (newItem.cost/2).toFixed(3): (newItem.splitRule == "1:0" ? newItem.cost: 0),
      p2Cost:newItem.splitRule == "1:1" ? (newItem.cost/2).toFixed(3): (newItem.splitRule == "0:1" ? newItem.cost: 0),
      amazonOrderID: newItem.amazonOrderID
    }
    fetch(debugVars.addItemsEndpoint,
      {
        method:'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key:  ID(),
          value: {
          title:item.title,
          cost:item.cost,
          date:item.date,
          notes:item.notes,
          category:item.category,
          p1Cost:item.p1Cost,
          p2Cost:item.p2Cost,
          amazonOrderID: item.amazonOrderID
        } })
      })
    .then(res=>  res.json() )
    .then(data =>  res(data))
  })
}

export const updateItems = (key:any,newItem:any) => {
  return new Promise((res:any, rej:any) => {
    
    let item = {
      title:newItem.title,
      cost:newItem.cost,
      date:newItem.date,
      notes:newItem.notes,
      category:newItem.category,
      p1Cost: newItem.p1Cost,
      p2Cost: newItem.p2Cost,
      amazonOrderID: newItem.amazonOrderID
    }
    fetch(debugVars.editItemsEndpoint,
      {
        method:'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: key,
          value: {
          title:item.title,
          cost:item.cost,
          date:item.date,
          notes:item.notes,
          category:item.category,
          p1Cost:item.p1Cost,
          p2Cost:item.p2Cost,
          amazonOrderID: item.amazonOrderID
        } })
      })
    .then(res=>  res.json() )
    .then(data =>  res(data))
  })
}

export const deleteItem = (key:any ) => {
  return new Promise((res:any, rej:any) => {
     
    fetch(debugVars.deleteItemsEndpoint,
      {
        method:'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ key: key  })
      })
    .then(res=>  {
      console.log("DADFDF")
    //  console.log(res.json())
      return res.json()} )
    .then(data => { 
      console.log("ADSFADSF")
      console.log(data)
      res(data)})
  })
}