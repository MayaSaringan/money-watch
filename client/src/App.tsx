import React , {useState, useEffect} from 'react';
import { createMuiTheme, Theme, ThemeProvider , useTheme, withStyles} from '@material-ui/core/styles';
import Box from "@material-ui/core/Box"
import Grid from "@material-ui/core/Grid"
import withWidth, { WithWidth } from '@material-ui/core/withWidth';

import { connect } from "react-redux";
import { Provider } from "react-redux";
import configureStore from "./redux/store";
import {updateItems} from './redux/actions'
 
import * as service from './Services/Service'
import Column from './Components/Column'
import ItemsDisplay from './Components/ItemsDisplay'
import SummariesDisplay from './Components/SummariesDisplay'
import AmazonOrdersDisplay from './Components/AmazonOrdersDisplay'
import ItemInput from "./Components/ItemInput"

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
      default: '#1c2025',
      paper: '#282C34'
    },
  }
})

const App = withWidth()(withStyles((theme)=>{
  return {
    root: {
      display:'flex',flexDirection:'column',alignItems:'center',width:'100%', backgroundColor:theme.palette.background.default
    },
    section:{
      display:'flex', flexDirection:'column', flex:1, width:'100%',alignSelf:'center',padding:20
    },
    spanningSection:{
      flex:1,  display:'flex', flexDirection:'row'
    },
    flexWrapSection:{
      flex:1,  display:'flex', flexDirection:'row', flexWrap:'wrap'
    },
    colSection:{
      flex:1,  display:'flex', flexDirection:'column' 
    },
    expand:{
      flex:1
    }
}})(({classes, width, updateItems, items, summaries, amazonOrders}:any) => { 
  const [updated, setUpdated] = useState(false)
  
  useEffect(()=>{
  /*  service.loadLocalCSV().then((data:any) => {
    //  console.log(data)
      updateItems(data.items, data.summaries, data.amazonOrders)
      setUpdated(true)
    })*/
  },[])

  useEffect(()=>{ 
    if (!updated){
      service.requestItems().then((data:any) => {
        updateItems(data.items, data.summaries, data.amazonOrders)
        console.log("UPDATED")
        setUpdated(true)
      })
    }
  },[updated, updateItems])

  const sendItem = (newItem : any) => 
    new Promise( (res, rej) => {
      service.sendItems(newItem)
      .then(data => {
          res(data)
          setUpdated(false)
      })
    }) 
 

  const updateItem  = (key:any,newItem : any) => 
    new Promise( (res, rej) => {
      service.updateItems(key,newItem)
      .then(data => {
          res(data)
          setUpdated(false)
      })
    }) 

  const deleteItem  = (key:any  ) =>  {
    console.log("BEFORE "+Object.keys(items).length)
      service.deleteItem(key )
      .then((data) => {
        let processedItems = service.processItems(data)  
        updateItems(processedItems.items, processedItems.summaries, processedItems.amazonOrders)
        console.log("UPDATED")
        console.log("AFter "+Object.keys(processedItems.items).length)
       // setUpdated(true)
       
      }) 
  }
  return (
    <Box color="text.primary">
      <div className={classes.root}>
        <div style={{flexDirection:'row', display:'flex', alignItems:'center'}}>
          <img height={75} src="https://img.icons8.com/plasticine/100/000000/money-bag.png"/>
          <h1>MONEY-WATCH</h1>
          <img src="https://img.icons8.com/emoji/96/000000/magnifying-glass-tilted-right-emoji.png" height={75} />
        </div> 
          <div style={{width:'100%', display:'flex', flexDirection:'column',maxWidth:1800, }}>
              <Grid >
                <div  className={classes.expand} style={{padding:20}}>
                  <h2 style={{marginTop:0}}>Input</h2>
                  <ItemInput onSubmit={sendItem} className={classes.expand} horizontal />
                </div>
              </Grid>
              <div className={classes.flexWrapSection}>
                <Grid xs={12} sm={12} md={8} lg={8}>
                  <div  className={classes.expand} style={{padding:20}}>
                    <h2  style={{marginTop:0}}>Items</h2>
                    <ItemsDisplay onEdit={updateItem } onRequestDelete={deleteItem} items={items}/>
                  </div>
                </Grid>
                <Grid xs={12}  sm={12} md={4} lg={4} >
                  <div  className={classes.expand} style={{padding:20}}>
                    <h2 style={{marginTop:0}}>Summaries</h2>
                    <SummariesDisplay summaries={summaries}/>
                  </div>
                  <div  className={classes.expand} style={{padding:20}}>
                    <h2 style={{marginTop:0}}>Amazon Orders</h2>
                    <AmazonOrdersDisplay amazonOrders={amazonOrders} items={items}/>
                  </div>
                </Grid>
              </div>
           
          </div>
          <p>Logo from LogoMakr.com:logomakr.com/1S7GoC</p>
      
        
      </div>
      </Box>
  );
}));



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
