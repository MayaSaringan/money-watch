import 'date-fns';
import React, {useState} from 'react';
import TextInput from './TextInput'
import Switch from './Switch'
import Card from '@material-ui/core/Card';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { connect } from "react-redux";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      minWidth: 120,
    },
    selectEmpty: {
    },
  }),
);

const mapStateToProps = (state :any)=> ({
  ...state
});
 
const ItemInput = ({items, amazonOrders, onSubmit }:any ) => {
  const classes = useStyles();
  const [title, setTitle] = useState("")
  const [cost, setCost] = useState("")
  const [date, setDate] = useState(new Date())
  const [category, setCategory] =useState("")
  const [splitRule, setSplitRule] = useState("")
  const [notes, setNotes] = useState("")
  const [isAmazonOrder, setIsAmazonOrder] = useState(false)
  const [amazonOrderID, setAmazonOrderID] = useState("")
  console.log([title, cost, date, category, splitRule, notes])
  let titleList:any = []
  Object.keys(items).forEach(key => {
    let item = items[key]
    if ( !titleList.includes(item.title)){
      titleList.push(item.title)
    }
  }) 
  console.log(amazonOrders)
  return (
    <Card style={{padding:30}}>
      <div style={{flexDirection:'column', display:'flex'}}>
        <div style={{flexDirection:'row', display:'flex'}}>
        <TextInput
          type="text-select"
          value={title}
          onChange={setTitle}
          label={"title"}
          values={titleList}
        />
        <TextInput
          value={cost}
          onChange={setCost}
          label={"cost"}
        />
        <TextInput
          type="date"
          value={date}
          onChange={setDate}
          label={"date"}
        />
        </div>
        <div style={{flexDirection:'row', display:'flex'}}>
        <TextInput
          type="select"
          values={[
             "Groceries",
             "Recreation",
             "Miscellaneous"
          ]}
          value={category}
          onChange={setCategory}
          label={"category"}
        />
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
        <TextInput
          value={notes}
          onChange={setNotes}
          label={"notes"}
        />
        </div>
        <div style={{flexDirection:'row', display:'flex'}}>
        <Switch
          value={isAmazonOrder}
          onChange={setIsAmazonOrder}
        />
        {isAmazonOrder && 
          <TextInput
            type="text-select"
            value={amazonOrderID}
            onChange={setAmazonOrderID}
            label={"Amazon Order #"}
            values={Object.keys(amazonOrders)}
          />
        }
        </div>
        <div>
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
     
      
    </Card>

  )
}
export default connect<any,any,any>(mapStateToProps, )(ItemInput)