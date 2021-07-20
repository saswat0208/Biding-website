/* eslint-disable react/prop-types */
// import React from 'react';
// import {
//   Table,
//   TableRow,
//   TableHead,
//   TableBody,
//   TableCell,
//   Chip,
// } from '@material-ui/core';
// import { makeStyles } from '@material-ui/core';

// const useStyles = makeStyles((theme) => ({
// }));


// export default function TableComponent({ data }) {
//   console.log(data);
//   const classes = useStyles();
//   const keys = Object.keys(data[0]).map((i) => i.toUpperCase());
//   keys.shift(); // delete "id" key

//   return (
//     <Table className="mb-0">
//       <TableHead className={classes.head}>
//         <TableRow>
//           {keys.map((key) => (
//             <TableCell
//               style={{ flex: 1 }} key={key}>{key == 'DATE' ? 'DATE(mm-dd)' : key}</TableCell>
//           ))}
//         </TableRow>
//       </TableHead>
//       <TableBody>
//         {data.map(({ id, title, description, date, category, basePrice, status }) => (
//           <TableRow key={id}>
//             <TableCell className="pl-3 fw-normal">{title}</TableCell>
//             <TableCell>{description}</TableCell>
//             <TableCell>{date.substring(5)}</TableCell>
//             <TableCell>{category}</TableCell>
//             <TableCell>{basePrice}</TableCell>
//             <TableCell>
//               <Chip label={status} classes={{ root: classes[states[status.toLowerCase()]] }} />
//             </TableCell>
//           </TableRow>
//         ))}
//       </TableBody>
//     </Table>
//   );
// }
import React from 'react';
import { Chip } from '@material-ui/core';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';


const states = {
  sold: 'success',
  unsold: 'warning',
  upcoming: 'secondary',
};
const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
    width: '20%',
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 700,
  },
  success: {
    backgroundColor: theme.palette.success.main,
    color: '#fff',
  },
  warning: {
    backgroundColor: theme.palette.warning.main,
    color: '#fff',
  },
  secondary: {
    backgroundColor: theme.palette.secondary.main,
    color: '#fff',
  },

}));

export default function TableComponent({ data }) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Title</StyledTableCell>
            <StyledTableCell align="right">Description</StyledTableCell>
            <StyledTableCell align="right">Date&nbsp;(mm-dd)</StyledTableCell>
            <StyledTableCell align="right">Category</StyledTableCell>
            <StyledTableCell align="right">Base&nbsp;Price</StyledTableCell>
            <StyledTableCell align="right">Status</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(({ id, title, description, date, category, basePrice, status }) => (
            <StyledTableRow key={id}>
              <StyledTableCell component="th" scope="row">
                {title}
              </StyledTableCell>
              <StyledTableCell align="center">{description}</StyledTableCell>
              <StyledTableCell align="right">{date.substring(5)}</StyledTableCell>
              <StyledTableCell align="right">{category}</StyledTableCell>
              <StyledTableCell align="right">{basePrice}</StyledTableCell>
              <StyledTableCell align="right">
                <Chip label={status} classes={{ root: classes[states[status.toLowerCase()]] }} />
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
