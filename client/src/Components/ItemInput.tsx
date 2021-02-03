import 'date-fns';
import React, {useState} from 'react';
import TextInput from './TextInput'
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
 
const ItemInput = ({items, onSubmit }:any ) => {
  const classes = useStyles();
  const [title, setTitle] = useState("")
  const [cost, setCost] = useState("")
  const [date, setDate] = useState(new Date())
  const [category, setCategory] =useState("")
  const [splitRule, setSplitRule] = useState("")
  const [notes, setNotes] = useState("")
  console.log([title, cost, date, category, splitRule, notes])
  let titleList:any = []
  Object.keys(items).forEach(key => {
    let item = items[key]
    if ( !titleList.includes(item.title)){
      titleList.push(item.title)
    }
  }) 
  return (
    <Card style={{padding:30}}>
      <div style={{flexDirection:'column', display:'flex'}}>
        <div style={{flexDirection:'row', display:'flex'}}>
        <TextInput
          type="text-select"
          value={title}
          onChange={setTitle}
          label={"title"}
          values={titleList.map((title:any)=>{ return {value:title, label:title}})}
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
             "Recreation"
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
        <div>
        <Button
          variant="contained"
          color="primary"
          onClick={()=>{
            onSubmit && onSubmit({
              title, cost, date, category, splitRule, notes
            }).then(() => {
              setTitle("")
              setCost("")
              //setDate(new Date()) // keep previous date
              setCategory("")
              setSplitRule("")
              setNotes("")
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