import React , {useState, useEffect} from 'react';
import { withStyles} from '@material-ui/core/styles';
const Column = withStyles({
    root:{
      flex:1,  display:'flex', flexDirection:'column' 
    }
})(( props:any) => {
  return (
    <div className={props.classes.root} {...props}> 
      {props.children}
    </div>
  )
})
export default Column;