import React, { useEffect } from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { fetchEvents, Event } from '../../../lib/events';
import moment from 'moment';
import TablePaginationActions from '@material-ui/core/TablePagination/TablePaginationActions';
import { Link, Table } from '@material-ui/core';
import { useStylesTable } from './ListTableEvents.css';
import ShareIcon from '@material-ui/icons/Share';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';

export default function ListTableEvents() {
  const classes = useStylesTable();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [rows, setRows] = React.useState<Event[]>([]);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  useEffect(() => {
    fetchEvents()
    .then(events => {
      setRows(events);
    });
    console.log('use effect did not work');
  }, [rowsPerPage])

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="custom pagination table">
        <TableBody>
          {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {moment(row.date).format('DD/MM/YYYY')}
              </TableCell>
              <TableCell component="th" scope="row">
                {moment(row.date).format('HH:mm')}
              </TableCell>
              <TableCell component="th" scope="row">
                  <Link  component="button" onClick={() => console.log("t")}><SupervisedUserCircleIcon/></Link>
              </TableCell>
              <TableCell component="th" scope="row">
                  <Link  component="button" onClick={() => console.log("t")}><ShareIcon/></Link>
              </TableCell>
            </TableRow>
          ))}
          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
