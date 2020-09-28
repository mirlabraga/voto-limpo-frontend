import React, { useState } from 'react';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { useEvents } from '../../../lib/events';
import moment from 'moment';
import TablePaginationActions from '@material-ui/core/TablePagination/TablePaginationActions';
import { Link, Table } from '@material-ui/core';
import { useStylesTable } from './ListTableEvents.css';
import ShareIcon from '@material-ui/icons/Share';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';
import GoogleCalendarDialog from './GoogleCalendarDialog'

interface ListTableProps {
  profileScopes: string[]
}

export default function ListTableEvents(props: ListTableProps) {
  const classes = useStylesTable();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [windowOpen, setWindowOpen] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState("");
  const rows = useEvents();

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleChangePage = (event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleGoogleMeeting = () => {
    setWindowOpen(true);
  }

  const handleClose = () => {
    setWindowOpen(false);
  };

  return (
    <div>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="custom pagination table">
          <TableBody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row: any) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {moment(row.date).format('DD/MM/YYYY')}
                </TableCell>
                <TableCell component="th" scope="row">
                  {moment(row.date).format('HH:mm')}
                </TableCell>
                <TableCell component="th" scope="row">
                    <Link  component="button" onClick={handleGoogleMeeting}><SupervisedUserCircleIcon/></Link>
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
      <GoogleCalendarDialog selectedValue={selectedValue} open={windowOpen} onClose={handleClose}/>
    </div>
  );
}
