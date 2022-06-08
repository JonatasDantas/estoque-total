import {
  Checkbox, TableCell, TableHead, TableRow, TableSortLabel,
} from '@material-ui/core';

function EnhancedTableHead(props) {
  const {
    cells,
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    selectableRecords,
  } = props;
  const createSortHandler = (property) => (event) => {
    if (property !== 'actions') {
      onRequestSort(event, property);
    }
  };

  return (
    <TableHead>
      <TableRow>
        {
            selectableRecords
            && (
            <TableCell padding="checkbox">
              <Checkbox
                indeterminate={numSelected > 0 && numSelected < rowCount}
                checked={rowCount > 0 && numSelected === rowCount}
                onChange={onSelectAllClick}
                inputProps={{ 'aria-label': 'select all' }}
              />
            </TableCell>
            )
          }
        {cells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding="default"
            sortDirection={orderBy === headCell.id ? order : false}
            style={{ whiteSpace: 'nowrap' }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default EnhancedTableHead;
