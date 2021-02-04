import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MuiSwitch from '@material-ui/core/Switch'

export default function Switch({label, onChange, value}:any ) {
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
  });
  
  return (
    <FormGroup row>
      <FormControlLabel
        control={<MuiSwitch checked={value} onChange={(evt:any)=> onChange && onChange(evt.target.checked)} name={label} />}
        label={label}
      />
    </FormGroup>
  );
}