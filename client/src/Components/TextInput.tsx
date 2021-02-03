import React from 'react';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import MuiSelect from '@material-ui/core/Select';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
const getText = (evt:any) => evt.target.value
const Input = (props:any) => {
  if (props.type == "date") {
    return <DatePicker {...props}/>
  }else if (props.type == "select") {
    return <Select {...props}/>
  }else if (props.type == "text-select") {
    return <TextAndSelect {...props}/>
  }
  return  <TextInput {...props}/>
}

const TextInput = ({label, onChange, value}:any) => {
  return (
    <TextField
      id="standard-basic"
      label={label}
      variant="outlined"
      value={value}
      onChange={(evt:any)=>onChange && onChange(getText(evt))}
    />

  )
}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      minWidth: 120,
    },
    selectEmpty: {
    },
  }),
);

const  TextAndSelect = ({label, onChange, value, values}:any) => {
  const classes = useStyles();
  return (
    <TextField 
      className={classes.formControl}
      id="standard-basic"
      select
      label={label}
      variant="outlined"
      value={value}
      onChange={(evt:any)=>onChange && onChange(getText(evt))}
    >
      {values.map((option:any) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </TextField>
  )
}
const  Select = ({label, onChange, value, values}:any) => {
  const classes = useStyles();
  return (
    <FormControl variant="outlined"  className={classes.formControl}>
      <InputLabel id="demo-simple-select-outlined-label">{label}</InputLabel>
      <MuiSelect
        labelId="demo-simple-select-outlined-label"
        id="demo-simple-select-outlined"
        value={value}
        onChange={(evt:any)=>onChange && onChange(getText(evt))}
        label={label}
      >
        {
          values && values.map((value:any) => {
            return (
              <MenuItem value={value ? value : ""}>
                {value ? value : ""}
              </MenuItem>
            )
          })
        }
      </MuiSelect>
    </FormControl>
  )
}


const DatePicker = ({label, onChange, value}:any) => {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        autoOk
        variant="inline"
        inputVariant="outlined"
        label={label}
        format="MM/dd/yyyy"
        InputAdornmentProps={{ position: "start" }}
        value={value}
        onChange={(date)=>onChange && onChange(date)}
        KeyboardButtonProps={{
          'aria-label': 'change date',
        }} 
      />
    </MuiPickersUtilsProvider>
  )
}
export default Input;