import React , {useState, useEffect} from 'react';
import logo from './appLogo.png'; 
import './App.css';
import { createMuiTheme, Theme, ThemeProvider , useTheme, withStyles} from '@material-ui/core/styles';
import debugVars from './debug'
import * as service from './Services/Service'
import {Category, Item } from "./Services/Service"  

import {updateItems} from './redux/actions'
import { connect } from "react-redux";
import { Provider } from "react-redux";

import configureStore from "./redux/store";
 
import ItemsDisplay from './Components/ItemsDisplay'
import SummariesDisplay from './Components/SummariesDisplay'
import AmazonOrdersDisplay from './Components/AmazonOrdersDisplay'
import ItemInput from "./Components/ItemInput"
import Box from "@material-ui/core/Box"
import Typography from '@material-ui/core/Typography';
const lightTheme = createMuiTheme({ 
  palette:{
    type: 'light'
  }
})
const darkTheme = createMuiTheme({ 
  palette:{
    type: 'dark',
    primary: {
      main: '#1976d2'
    },
    secondary:{
      main: '#dc004e'
    },
    background:{
      default: '#0c0d12',
      paper: '#303754'
    },
  }
})
const ID = function () {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return '_' + Math.random().toString(36).substr(2, 9);
};
const App = withStyles((theme)=>{
  return {
    root: {
      display:'flex',flexDirection:'column',alignItems:'center',width:'100%', backgroundColor:theme.palette.background.default
    },
    
}})(({classes,updateItems, items, summaries, amazonOrders}:any) => { 
  const [updated, setUpdated] = useState(false)
   
  React.useEffect(()=>{ 
    if (!updated){
      service.requestItems().then((data:any) => {

        updateItems(data.items, data.summaries, data.amazonOrders)
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
          amazonOrderID: newItem.amazonOrderID
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
  const theme = useTheme();

  return (
    <Box color="text.primary">
      <div className={classes.root}>
        <div style={{flexDirection:'row', display:'flex', alignItems:'center'}}>
          <img src={logo} width={50} height={50} alt="Logo" style={{padding:10}}/>
          <h1>MONEY-WATCH</h1>
        </div>
        <ItemInput onSubmit={sendItem} />
        <div   style={{display:'flex', flexDirection:'column', flex:1, width:'100%'}}  >
        <div   style={{maxWidth:1500, alignSelf:'center' }}  >
      
          <div style={{width:'100%', display:'flex', flexDirection:'column'}}>
            <div style={{flex:1,  display:'flex', flexDirection:'row', padding:20}}>
              <SummariesDisplay summaries={summaries}/>
            </div>
            <div style={{flex:1,  display:'flex', flexDirection:'row', padding:20}}>
              <AmazonOrdersDisplay amazonOrders={amazonOrders} items={items}/>
            </div>
            <div style={{flex:1, display:'flex', flexDirection:'row', padding:20}}>
                <ItemsDisplay items={items}/>
            </div>
          </div>
          <p>Logo from LogoMakr.com:logomakr.com/1S7GoC</p>
      
      </div>
        </div>
        
      </div>
      </Box>
  );
})



const mapStateToProps = (state :any)=> ({
  ...state
});

const mapDispatchToProps =( dispatch:any )=> ({
  updateItems: (items :any, summaries:any, amazonOrders:any={}) => dispatch(updateItems(items,summaries, amazonOrders))
});
const WrappedApp = connect(mapStateToProps, mapDispatchToProps)(App)
function Temp (){
 return (
   <Provider store={configureStore }>
     <ThemeProvider theme={darkTheme}>
       <WrappedApp/>
     </ThemeProvider>
   </Provider>
 )
}
export default Temp
