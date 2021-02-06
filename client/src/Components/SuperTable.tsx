import React ,{useState} from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { lighten, makeStyles, withStyles } from '@material-ui/core/styles';
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
import DeleteIcon from '@material-ui/icons/Delete'; 
import EditIcon from '@material-ui/icons/Edit';
import CheckIcon from '@material-ui/icons/Check';

import TextInput from './TextInput'
import * as sorting from '../Utilities/Sorting'  

const EnhancedTableHead = withStyles({
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
})(({ headers, classes, orderBy , order, onSortChange }:any) => { 
  return (
    <TableHead>
      <TableRow>
        {headers.map((headCell: any) => (
          <TableCell
            key={headCell.id}
            align={'center'}
            padding={'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={(evt) => {
                let newOrderBy = headCell.id
                let newOrder=  order=='asc' ? 'desc':'asc' 
                onSortChange && onSortChange(newOrderBy, newOrder)
              }}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell
          key={"actions"}
          align={'center'}
          padding={'default'}
        >
        </TableCell>
      </TableRow>
    </TableHead>
  );
})

const useToolbarStyles = makeStyles((theme:any) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',
  },
}));
const EnhancedTableToolbar = ( { numSelected, tableTitle }:any) => {
  const classes = useToolbarStyles(); 

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} color="inherit" variant="subtitle1" component="div">
          {numSelected} selected
        </Typography>
      ) : (
        <Typography className={classes.title} variant="h6" id="tableTitle" component="div">
          {tableTitle}
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : null}
    </Toolbar>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  
}));

const SuperTable = ({ items, headers, tableTitle, onEdit , onRequestDelete}:any) => { 
  const classes = useStyles();
  const [selected, setSelected] = React.useState<any >([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(20); 
  const [itemsToRender, setItemsToRender] = React.useState(items) 
  const [count, setCount] = React.useState( Object.keys(items).length )
  const [order, setOrder] = React.useState('id');
  const [orderBy, setOrderBy] = React.useState('asc');
  const [editingCell , setEditingCell  ] = React.useState<any>( null)

  
  const [title, setTitle] = useState("")
  const [cost, setCost] = useState("")
  const [date, setDate] = useState(new Date())
  const [category, setCategory] =useState("")
  const [p1Cost, setP1Cost] = useState("")
  const [p2Cost, setP2Cost] = useState("") 
  const [amazonOrderID, setAmazonOrderID] = useState("")

  React.useEffect(() => {
    setItemsToRender(items)
    setCount(Object.keys(items).length)
  }, [items])

  const handleChangePage = (event:any, newPage:any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event:any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const isSelected = (name:any) => name && selected.indexOf(name) !== -1;

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, itemsToRender.length - page * rowsPerPage);
 
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar numSelected={selected.length} tableTitle={tableTitle} />
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={ 'medium'}
            aria-label="enhanced table"
          >
            <EnhancedTableHead
              headers={headers}
              onSortChange={(by:string, ascOrDesc:string) => { 
                setOrder(ascOrDesc)
                setOrderBy(by)
              }}
              order={order}
              orderBy={orderBy}
            />
            <TableBody>
              {sorting.stableSort(itemsToRender, sorting.getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row:any, index:any) => { 
                  const isItemSelected = isSelected(row.key);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  const d = row.date
                  const ye = new Intl.DateTimeFormat('en', { year: 'numeric' }).format(d);
                  const mo = new Intl.DateTimeFormat('en', { month: 'short' }).format(d);
                  const da = new Intl.DateTimeFormat('en', { day: '2-digit' }).format(d);

                  if (editingCell === row.key){
                    return (
                      <TableRow
                        hover
                        tabIndex={-1}
                        key={row.key}
                      >
                        <TableCell align="right">
                          <TextInput
                            value={title}
                            onChange={setTitle}
                            label={"title"}
                          />
                        </TableCell>
                        <TableCell align="right">
                          <TextInput
                            value={cost}
                            onChange={setCost}
                            label={"cost"}
                          />
                        </TableCell>
                        <TableCell align="right">
                          <TextInput
                            value={date}
                            onChange={setDate}
                            label={"date"}
                          />
                        </TableCell>
                        <TableCell align="right">
                          <TextInput
                            value={category}
                            onChange={setCategory}
                            label={"category"}
                          />
                        </TableCell>
                        <TableCell align="right">
                          <TextInput
                            value={ p1Cost}
                            onChange={setP1Cost}
                          />
                        </TableCell>
                        <TableCell align="right">
                          <TextInput
                            value={ p2Cost}
                            onChange={setP2Cost}
                          />
                        </TableCell>
                        <TableCell align="right">
                          <TextInput
                            value={ amazonOrderID}
                            onChange={setAmazonOrderID}
                          />
                        </TableCell>
                        <TableCell align="right">
                          <div >
                            <IconButton
                              color="primary"
                              aria-label="add to shopping cart"
                              onClick={()=>{
                                setEditingCell(null)
                                onEdit && onEdit(row.key,{
                                  title, cost, date, category, p1Cost, p2Cost, amazonOrderID
                                })
                                setTitle("")
                                setCost("")
                                setDate(row.date)
                                setCategory("")
                                setP1Cost("")
                                setP2Cost("")
                                setAmazonOrderID("")
                              }}
                            >
                              <CheckIcon style={{fontSize:15}}/>
                            </IconButton>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  }
                  else {
                    return (
                      <TableRow
                        hover
                        tabIndex={-1}
                        key={row.key}
                      >
                        <TableCell align="right">{row.title}</TableCell>
                        <TableCell align="right">{row.cost}</TableCell>
                        <TableCell align="right">{`${mo}-${da}-${ye}`}</TableCell>
                        <TableCell align="right">{row.category}</TableCell>
                        <TableCell align="right">{row.p1Cost}</TableCell>
                        <TableCell align="right">{row.p2Cost}</TableCell>
                        <TableCell align="right">{row.amazonOrderID}</TableCell>
                        <TableCell align="right">
                          <div >
                            <IconButton
                              color="primary"
                              onClick={()=>{
                                setEditingCell(row.key)
                                setTitle(row.title)
                                setCost(row.cost)
                                setDate(row.date)
                                setCategory(row.category)
                                setP1Cost(row.p1Cost)
                                setP2Cost(row.p2Cost)
                                setAmazonOrderID(row.amazonOrderID)
                              }}
                            >
                              <EditIcon style={{fontSize:15}}/>
                            </IconButton>
                            <IconButton
                              color="primary"
                              onClick={()=>{
                                onRequestDelete && onRequestDelete(row.key)
                              }}
                            >
                              <DeleteIcon style={{fontSize:15}}/>
                            </IconButton>
                          </div>
                        </TableCell>
                      </TableRow>
                    );
                  }
                  
                })}
              {emptyRows > 0 && (
                <TableRow style={{ height:53 * emptyRows }}>
                  <TableCell colSpan={headers.length} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[20,40,60]}
          component="div"
          count={count}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
}

 
export default SuperTable
