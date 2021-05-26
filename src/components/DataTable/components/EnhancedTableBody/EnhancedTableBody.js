import {
  Checkbox, CircularProgress, IconButton, TableBody, TableCell, TableRow,
} from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import {
  CheckCircleRounded, Edit, HighlightOff,
} from '@material-ui/icons';

function EnhancedTableBody(props) {
  const {
    rows, page, rowsPerPage, selected, handleClick, handleUpdatedClick, loading,
  } = props;

  const isSelected = (id) => selected.indexOf(id) !== -1;
  return (
    <TableBody>
      { loading
        ? (
          <TableRow style={{ position: 'relative', height: 60 }}>
            <CircularProgress style={{ position: 'absolute', left: '51%', marginTop: '20px' }} />
          </TableRow>
        )
        : rows
          .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
          .map((row, index) => {
            const isItemSelected = isSelected(row.id);
            const labelId = `enhanced-table-checkbox-${index}`;

            return (
              <TableRow
                hover
                role="checkbox"
                aria-checked={isItemSelected}
                tabIndex={-1}
                key={row.codigo}
                selected={isItemSelected}
              >
                <TableCell onClick={(event) => handleClick(event, row.id)} padding="checkbox">
                  <Checkbox
                    checked={isItemSelected}
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </TableCell>
                <TableCell
                  align="left"
                  padding="none"
                  style={{ whiteSpace: 'nowrap' }}
                  onClick={(event) => handleClick(event, row.id)}
                >
                  {row.codigo}
                </TableCell>
                <TableCell
                  onClick={(event) => handleClick(event, row.id)}
                  align="left"
                  style={{ whiteSpace: 'nowrap' }}
                >
                  {row.name}
                </TableCell>
                <TableCell
                  align="center"
                  padding="none"
                  onClick={(event) => handleClick(event, row.id)}
                >
                  {row.quantityStored}
                </TableCell>
                <TableCell
                  align="center"
                  padding="none"
                  style={{ whiteSpace: 'nowrap' }}
                  onClick={(event) => handleClick(event, row.id)}
                >
                  {row.lastSaleDate ? new Date(row.lastSaleDate).toLocaleDateString() : ''}
                </TableCell>
                <TableCell
                  align="center"
                  padding="none"
                  style={{ whiteSpace: 'nowrap' }}
                  onClick={(event) => handleClick(event, row.id)}
                >
                  {row.lastUpdateDate ? new Date(row.lastUpdateDate).toLocaleDateString() : ''}
                </TableCell>
                <TableCell align="center" padding="none">
                  <div className="actions">
                    <IconButton onClick={() => handleUpdatedClick([row.id])} size="small">
                      <CheckCircleRounded alt="Marcar como Editado" style={{ color: green[500], cursor: 'pointer' }} />
                    </IconButton>
                    <IconButton size="small">
                      <Edit alt="Editar anúncio" color="primary" style={{ cursor: 'pointer' }} />
                    </IconButton>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
    </TableBody>
  );
}

export default EnhancedTableBody;
