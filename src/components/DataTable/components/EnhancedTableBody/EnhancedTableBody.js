import {
  Checkbox, TableBody, TableCell, TableRow,
} from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import {
  CheckCircleRounded, Edit, HighlightOff,
} from '@material-ui/icons';

function EnhancedTableBody(props) {
  const {
    rows, page, rowsPerPage, selected, handleClick,
  } = props;

  const isSelected = (codigo) => selected.indexOf(codigo) !== -1;

  // deprecated
  // function descendingComparator(a, b, selectedOrderBy) {
  //   if (b[selectedOrderBy] < a[selectedOrderBy]) {
  //     return -1;
  //   }
  //   if (b[selectedOrderBy] > a[selectedOrderBy]) {
  //     return 1;
  //   }
  //   return 0;
  // }

  // function getComparator(selectedOrder, selectedOrderBy) {
  //   return selectedOrder === 'desc'
  //     ? (a, b) => descendingComparator(a, b, selectedOrderBy)
  //     : (a, b) => -descendingComparator(a, b, selectedOrderBy);
  // }

  // function stableSort(array, comparator) {
  //   const stabilizedThis = array.map((el, index) => [el, index]);
  //   stabilizedThis.sort((a, b) => {
  //     const finalOrder = comparator(a[0], b[0]);
  //     if (finalOrder !== 0) return finalOrder;
  //     return a[1] - b[1];
  //   });
  //   return stabilizedThis.map((el) => el[0]);
  // }

  return (
    <TableBody>
      {rows
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((row, index) => {
          const isItemSelected = isSelected(row.codigo);
          const labelId = `enhanced-table-checkbox-${index}`;

          return (
            <TableRow
              hover
              onClick={(event) => handleClick(event, row.codigo)}
              role="checkbox"
              aria-checked={isItemSelected}
              tabIndex={-1}
              key={row.codigo}
              selected={isItemSelected}
            >
              <TableCell padding="checkbox">
                <Checkbox
                  checked={isItemSelected}
                  inputProps={{ 'aria-labelledby': labelId }}
                />
              </TableCell>
              <TableCell align="left" padding="none" style={{ whiteSpace: 'nowrap' }}>{row.codigo}</TableCell>
              <TableCell align="left" style={{ whiteSpace: 'nowrap' }}>
                {row.name}
              </TableCell>
              <TableCell align="center" padding="none">{row.quantityStored}</TableCell>
              <TableCell align="center" padding="none" style={{ whiteSpace: 'nowrap' }}>
                {row.lastSaleDate ? new Date(row.lastSaleDate).toLocaleDateString() : ''}
              </TableCell>
              <TableCell align="center" padding="none" style={{ whiteSpace: 'nowrap' }}>
                {row.lastUpdateDate ? new Date(row.lastUpdateDate).toLocaleDateString() : ''}
              </TableCell>
              <TableCell align="center" padding="none">
                <div className="actions">
                  <CheckCircleRounded alt="Marcar como Editado" style={{ color: green[500], paddingRight: 5, cursor: 'pointer' }} />
                  <Edit alt="Editar anúncio" color="primary" style={{ cursor: 'pointer' }} />
                </div>
              </TableCell>
            </TableRow>
          );
        })}
    </TableBody>
  );
}

export default EnhancedTableBody;
