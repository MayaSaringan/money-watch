import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField'; 
const Display = ({ items }:any) => { 
  
  return ( 
      <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>order</TableCell>
            <TableCell align="right">cost</TableCell>
            <TableCell align="right">date</TableCell>
            <TableCell align="right">status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { Object.keys( items).map((i) =>{
          let item = items[i]
          const d = item.date
          const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
          const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
          const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
          return (
            <TableRow key={item.title}>
              <TableCell component="th" scope="row">
                {item.title}
              </TableCell>
              <TableCell align="right">{ item.cost}</TableCell>
              <TableCell align="right">{`${mo}-${da}-${ye}`}</TableCell>
              <TableCell align="right">{item.category}</TableCell>
              <TableCell align="right">{item.p1Cost}</TableCell>
              <TableCell align="right">{item.p2Cost}</TableCell>
              <TableCell align="right">{item.notes}</TableCell>
            </TableRow>
          )})}
        </TableBody>
      </Table>
    </TableContainer>
   
  );
}

 
export default Display
