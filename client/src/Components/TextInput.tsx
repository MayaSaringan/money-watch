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
import MuiAutoComplete  from '@material-ui/lab/Autocomplete';

const getText = (evt:any) => evt.target.value
const Input = (props:any) => {
  if (props.type == "date") {
    return <DatePicker {...props}/>
  }else if (props.type == "select") {
    return <Select {...props}/>
  }else if (props.type == "text-select") {
    return <AutoComplete {...props}/>
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
      autoComplete="off" 
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

const  AutoComplete = ({label, onChange, value, values}:any) => {
  const classes = useStyles(); 
  const [textBoxValue, setTextBoxValue] = React.useState(values[0] || null)
  const [textInputValue, setTextInputValue] = React.useState(value)
  React.useEffect(() => {
    setTextBoxValue(values[0] || null)
    setTextInputValue(value)
  }, [value])
  return (
    
    <MuiAutoComplete  
     freeSolo

      value={textBoxValue}
      onChange={(evt:any, newValue:string)=>{
        setTextBoxValue(newValue)
        onChange && onChange(newValue)
      }}
      inputValue={textInputValue}
      onInputChange={(event:any, newInputValue:any) => {
        setTextInputValue(newInputValue)
       onChange && onChange(newInputValue)
      }}
      id={label}
      options={values}
      style={{ width: 300 }}
      renderInput={(params:any) =>{ 
        const inputProps = params.inputProps;
        //disable google suggestions
        inputProps.autoComplete = "off"
        return <TextField autoComplete="off" {...params} inputProps={inputProps} label={label} variant="outlined" />
      }}
    />
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