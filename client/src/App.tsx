import React , {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import Card from '@material-ui/core/Card';
import debugVars from './debug'

import Service, {Category, Item, serviceContext} from "./Services/Service"  

import {updateItems} from './redux/actions'
import { connect } from "react-redux";
import { Provider } from "react-redux";

import configureStore from "./redux/store";
 
import ItemsDisplay from './Components/ItemsDisplay'
import SummariesDisplay from './Components/SummariesDisplay'
import ItemInput from "./Components/ItemInput"

const ID = function () {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return '_' + Math.random().toString(36).substr(2, 9);
};
const App = ({updateItems, items, summaries}:any) => { 
  const [updated, setUpdated] = useState(false)
  let timeout = null
  React.useEffect(()=>{ 
    if (!updated){
      fetch(debugVars.itemsEndpoint).then(res=>{
        return res.json()
       } 
       ).then(data => { 
         let newItems:any = {}
         let newSummaries:any = {}
         Object.keys(data).forEach(key => {
  
          let item = data[key]
          newItems = { ...newItems, [key]: new Item(item.cost, new Date(item.date), item.title,item.notes, item.category, item.p1Cost, item.p2Cost)}
          if (newSummaries[item.category]){ 
            newSummaries[item.category].cost = parseFloat(newSummaries[item.category].cost)+    parseFloat(item.cost)
            newSummaries[item.category].p1Cost =parseFloat(newSummaries[item.category].p1Cost)+ parseFloat(item.p1Cost)
            newSummaries[item.category].p2Cost = parseFloat(newSummaries[item.category].p2Cost) + parseFloat(item.p2Cost) 
          }else{ 
            newSummaries[item.category] = new Category(parseFloat(item.cost), item.p1Cost, item.p2Cost)

          }
         })
         
         updateItems(newItems, newSummaries)
         setUpdated(true)
  
       })
    }
    
  },[updated])

  const sendItem = (newItem : any) => 
  new Promise( (res, rej) => {
    let item = {
      
      title:newItem.title,
      cost:newItem.cost,
      date:newItem.date,
      notes:newItem.notes,
      category:newItem.category,
      p1Cost: newItem.splitRule == "1:1" ? (newItem.cost/2).toFixed(3): (newItem.splitRule == "1:0" ? (newItem.cost/2).toFixed(3): 0),
      p2Cost:newItem.splitRule == "1:1" ? (newItem.cost/2).toFixed(3): (newItem.splitRule == "0:1" ? (newItem.cost/2).toFixed(3): 0),
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
          p2Cost:item.p2Cost
        } })
      }).then(res=>{
      return res.json()
     } 
     ).then(data => {
       console.log(data)
        res(data)
        setUpdated(false)
      
     })
  }) 


  return (
    <div className="App" style={{display:'flex',flexDirection:'column',alignItems:'center',width:'100%'}}>
      <h1>Hello</h1>
      <ItemInput onSubmit={sendItem} />
      <div   style={{display:'flex', flexDirection:'column', flex:1, width:'100%'}}  >
      <div   style={{maxWidth:1500, alignSelf:'center' }}  >
    
        <div style={{width:'100%', display:'flex', flexDirection:'column'}}>
          <div style={{flex:1, display:'flex', flexDirection:'row', padding:20}}>
              <ItemsDisplay items={items}/>
          </div>
          <div style={{flex:1,  display:'flex', flexDirection:'row', padding:20}}>
        <SummariesDisplay summaries={summaries}/>
          </div>
        </div>
    
    </div>
      </div>
      
    </div>
  );
}



const mapStateToProps = (state :any)=> ({
  ...state
});

const mapDispatchToProps =( dispatch:any )=> ({
  updateItems: (items :any, summaries:any) => dispatch(updateItems(items,summaries))
});
const WrappedApp = connect(mapStateToProps, mapDispatchToProps)(App)
function Temp (){
 return (
   <Provider store={configureStore }>
     <WrappedApp/>
   </Provider>
 )
}
export default Temp
