import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';

import SuperTable from './SuperTable'

const Display = ({ items, onEdit, onRequestDelete }:any) => { 
  
  return (
  <SuperTable
    items={[...Object.keys(items).map(key =>  { return {...items[key ], key:key}}) ]}
    headers={[ 
      { id: 'title', label: 'Transaction' },
      { id: 'cost',  label: 'Cost' },
      { id: 'date',  label: 'Date' },
      { id: 'category',  label: 'Type' },
      { id: 'p1Cost',  label: 'P1Cost' },
      { id: 'p2Cost',  label: 'P2Cost' },
      { id: 'amazonOrderId',  label: 'Group' },
     ]}
    tableTitle={"Items"}
    onEdit={onEdit}
    onRequestDelete={onRequestDelete}
  />)
}

 
export default Display
