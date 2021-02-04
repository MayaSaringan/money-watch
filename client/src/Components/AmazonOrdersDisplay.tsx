import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
const Display = ({ amazonOrders, items }:any) => { 
  
  return ( 
      <TableContainer component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell  rowSpan={2}>order</TableCell>
            <TableCell  colSpan={2}  align="right">items</TableCell>
          </TableRow>
          <TableRow>
            <TableCell align="right">ID</TableCell>
            <TableCell align="right">cost</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          { Object.keys( amazonOrders).map((i:any ) =>{
          let order = amazonOrders[i]
          let totalOrderCost = 0
          return (
            <>
            {   amazonOrders[i].map((itemKey:any, idx: any) =>{
              let item = items[itemKey]
              totalOrderCost+=parseFloat(item.cost)
              return (
                <TableRow key={order.title}>
                {idx == 0 && (<TableCell component="th" scope="row" rowSpan={amazonOrders[i].length}>{i}</TableCell>)}
                  <TableCell align="right">{ itemKey}</TableCell>
                  <TableCell align="right">{item.cost}</TableCell>
                </TableRow>
              )})}
              <TableRow key={order.title}>
                <TableCell align="right" colSpan={2}>Total Cost:</TableCell>
                <TableCell align="right">{totalOrderCost}</TableCell>
              </TableRow>
            </>
            
          )})}
        </TableBody>
      </Table>
    </TableContainer>
   
  );
}

 
export default Display
