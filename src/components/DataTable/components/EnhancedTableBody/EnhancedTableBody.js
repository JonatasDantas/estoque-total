import {
  Checkbox, TableBody, TableCell, TableRow,
} from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import {
  CheckCircleRounded, HighlightOff,
} from '@material-ui/icons';

function EnhancedTableBody(props) {
  const {
    rows, order, orderBy, page, rowsPerPage, selected, handleClick,
  } = props;

  const isSelected = (id) => selected.indexOf(id) !== -1;

  function descendingComparator(a, b, selectedOrderBy) {
    if (b[selectedOrderBy] < a[selectedOrderBy]) {
      return -1;
    }
    if (b[selectedOrderBy] > a[selectedOrderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(selectedOrder, selectedOrderBy) {
    return selectedOrder === 'desc'
      ? (a, b) => descendingComparator(a, b, selectedOrderBy)
      : (a, b) => -descendingComparator(a, b, selectedOrderBy);
  }

  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const finalOrder = comparator(a[0], b[0]);
      if (finalOrder !== 0) return finalOrder;
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  return (
    <TableBody>
      {stableSort(rows, getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row, index) => {
          const isItemSelected = isSelected(row.id);
          const labelId = `enhanced-table-checkbox-${index}`;

          return (
            <TableRow
              hover
              onClick={(event) => handleClick(event, row.id)}
              role="checkbox"
              aria-checked={isItemSelected}
              tabIndex={-1}
              key={row.id}
              selected={isItemSelected}
            >
              <TableCell padding="checkbox">
                <Checkbox
                  checked={isItemSelected}
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </TableCell>
              <TableCell component="th" id={labelId} scope="row" padding="none">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.quantity}</TableCell>
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right">{row.quantitySells}</TableCell>
              <TableCell align="right">
                <div className="actions">
                  <CheckCircleRounded style={{ color: green[500] }} />
                  <HighlightOff color="error" />
                </div>
              </TableCell>
            </TableRow>
          );
        })}
    </TableBody>
  );
}

export default EnhancedTableBody;
