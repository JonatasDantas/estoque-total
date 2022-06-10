import {
  Checkbox, CircularProgress, IconButton, TableBody, TableCell, TableRow,
} from '@material-ui/core';
import { green, red } from '@material-ui/core/colors';
import {
  CheckCircleRounded, Delete, Edit,
} from '@material-ui/icons';

function EnhancedTableBody(props) {
  const {
    headers,
    rows,
    page,
    rowsPerPage,
    selected,
    handleClick,
    handleUpdatedClick,
    handleDeleteClick,
    loading,
    hideUpdateAction,
    hideEditAction,
    hideDeleteAction,
    handleEditClick,
    selectableRecords,
  } = props;

  const isSelected = (id) => selected.indexOf(id) !== -1;
  return (
    <TableBody>
      { loading
        ? (
          <TableRow style={{ position: 'relative', height: 80 }}>
            <td>
              <CircularProgress style={{ position: 'absolute', left: '51%' }} />
            </td>
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
                key={labelId}
                selected={isItemSelected}
              >
                {
                  selectableRecords
                && (
                <TableCell onClick={(event) => handleClick(event, row.id)} padding="checkbox">
                  <Checkbox
                    checked={isItemSelected}
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </TableCell>
                )
                }
                {
                  Object.keys(row).filter((key) => key !== 'id' && headers.map((i) => i.id).includes(key)).map((key) => (
                    <TableCell
                      key={key}
                      align={['codigo', 'name', 'supplierName'].indexOf(key) !== -1 ? 'left' : 'center'}
                      // padding={['name', 'supplierName'].indexOf(key) !== -1 ? 'default' : 'none'}
                      style={{ whiteSpace: 'nowrap' }}
                      onClick={(event) => selectableRecords && handleClick(event, row.id)}
                    >
                      {
                        key.indexOf('Date') !== -1 ? (row[key] ? new Date(row[key]).toLocaleDateString('pt-br') : '') : row[key]
                      }
                    </TableCell>
                  ))
                }

                {/* <TableCell
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
                </TableCell> */}
                <TableCell align="center" padding="none">
                  <div className="actions">
                    {
                      !hideUpdateAction
                      && (
                      <IconButton onClick={() => handleUpdatedClick([row.id])} size="small">
                        <CheckCircleRounded alt="Marcar como Editado" style={{ color: green[500], cursor: 'pointer' }} />
                      </IconButton>
                      )
                    }
                    {
                      !hideEditAction
                      && (
                      <IconButton onClick={() => handleEditClick(row)} size="small">
                        <Edit alt="Editar" color="primary" style={{ cursor: 'pointer' }} />
                      </IconButton>
                      )
                    }
                    {
                      !hideDeleteAction
                      && (
                      <IconButton onClick={() => handleDeleteClick(row.id)} size="small">
                        <Delete alt="Deletar" style={{ cursor: 'pointer', color: red[600] }} />
                      </IconButton>
                      )
                    }
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
    </TableBody>
  );
}

export default EnhancedTableBody;
