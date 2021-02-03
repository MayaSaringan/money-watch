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
const Display = ({ summaries }:any) => { 
  
  return ( 
    <TableContainer component={Paper}>
    <Table aria-label="simple table">
      <TableHead>
        <TableRow>
          <TableCell >category</TableCell>
          <TableCell align="right">cost</TableCell>
          <TableCell align="right">P1 Cost</TableCell>
          <TableCell align="right">P2 Cost</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        { Object.keys( summaries).map((i) =>{
          let summ = summaries[i]
        const d = summ.date
        const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
        const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
        const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);
          return (
          <TableRow key={summ.title}>
            <TableCell component="th" scope="row">
              {i}
            </TableCell>
            <TableCell align="right">{summ.cost}</TableCell>
            <TableCell align="right">{summ.p1Cost}</TableCell>
            <TableCell align="right">{summ.p2Cost}</TableCell>
          </TableRow>
        )})}
      </TableBody>
    </Table>
  </TableContainer>
   
  );
}

 
export default Display
