import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  },
});

export default function CustomPaginationActionsTable(props) {
  const rows = props.questions
  const classes = useStyles2();
  
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="custom pagination table">
        <TableBody>
          {(rows
          ).map(row => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.attributes.title}
              </TableCell>
              <TableCell align="right">{row.attributes.company}</TableCell>
              <TableCell align="right">{row.attributes.role}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        
      </Table>
    </TableContainer>
  );
}