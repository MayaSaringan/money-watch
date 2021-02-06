import 'date-fns';
import React, {useState} from 'react';
import TextInput from './TextInput'
import Switch from './Switch'
import Card from '@material-ui/core/Card';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { connect } from "react-redux";

import * as sorting from '../Utilities/Sorting'  

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      minWidth: 80,
    },
    selectEmpty: {
    },
    input:{
      padding:10
    }
  }),
);

const mapStateToProps = (state :any)=> ({
  ...state
});
 
const ItemInput = ({items, amazonOrders, onSubmit, className , horizontal}:any ) => {
  const classes = useStyles();
  const [title, setTitle] = useState("")
  const [cost, setCost] = useState("")
  const [date, setDate] = useState(new Date())
  const [category, setCategory] =useState("")
  const [splitRule, setSplitRule] = useState("")
  const [notes, setNotes] = useState("") 
  const [amazonOrderID, setAmazonOrderID] = useState("")

  React.useEffect(()=>{
    let newestDate = Object.keys(items).length === 0 ? new Date() : sorting.stableSort(Object.keys(items ).map(key =>  items[key ]), sorting.getComparator("desc", "date"))[0].date
    setDate(newestDate)
  },[items])
//console.log([title, cost, date, category, splitRule, notes])
  let titleList:any = []
  Object.keys(items).forEach(key => {
    let item = items[key]
    if ( !titleList.includes(item.title)){
      titleList.push(item.title)
    }
  }) 
 

  
  return (
    <Card style={{padding:20, }} className={className}>
      <Grid direction="row" wrap="wrap" component="div" container >
          <div className={classes.input}>
            <TextInput
              type="text-select"
              value={title}
              onChange={setTitle}
              label={"title"}
              values={titleList}
            />
          </div>
          <div className={classes.input}>
            <TextInput
              value={cost}
              onChange={setCost}
              label={"cost"}
            />
          </div>
          <div className={classes.input}>
            <TextInput
              type="date"
              value={date}
              onChange={setDate}
              label={"date"}
            />
          </div>
          <div className={classes.input}>
            <TextInput
              type="select"
              values={[
                "Groceries",
                "Recreation",
                "Miscellaneous",
                "House Items",
                "Essentials",
                "Clothing",
                "Subscription",
                "Utilities",
                "Gift"
              ]}
              value={category}
              onChange={setCategory}
              label={"category"}
            />
          </div>
          <div className={classes.input}>
            <TextInput
              type="select"
              values={[
                "1:0",
                "1:1",
                "0:1"
              ]}
              value={splitRule}
              onChange={setSplitRule}
              label={"split rule"}
            />
          </div>
          <div className={classes.input}>
            <TextInput
              type="text-select"
              value={amazonOrderID}
              onChange={setAmazonOrderID}
              label={"Amazon Order #"}
              values={Object.keys(amazonOrders)}
            />
          </div>
          <div>
          <div className={classes.input}>
            <Button
              variant="contained"
              color="primary"
              onClick={()=>{
                onSubmit && onSubmit({
                  title, cost, date, category, splitRule, notes, amazonOrderID
                }).then(() => {
                  setTitle("")
                  setCost("")
                  //setDate(new Date()) // keep previous date
                  setCategory("")
                  setSplitRule("")
                  setNotes("")
                  setAmazonOrderID("")
                })
              }}
            >
              Submit
            </Button>
          </div>
        </div>
      
      </Grid>
     
      
    </Card>

  )
}
export default connect<any,any,any>(mapStateToProps, )(ItemInput)