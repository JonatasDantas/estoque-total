import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper, Table, TableContainer, TablePagination,
} from '@material-ui/core';
import { useState } from 'react';
import EnhancedTableBody from './EnhancedTableBody/EnhancedTableBody';
import EnhancedTableHead from './EnhancedTableHead/EnhancedTableHead';

const headers = [
  {
    id: 'codigo', numeric: false, disablePadding: true, label: 'Código', align: 'left',
  },
  {
    id: 'name', numeric: false, disablePadding: true, label: 'Descriçao do Produto', align: 'left',
  },
  {
    id: 'quantityStored', numeric: true, disablePadding: false, label: 'Quantidade em Estoque', align: 'center',
  },
  {
    id: 'lastSaleDate', numeric: false, disablePadding: false, label: 'Última venda', align: 'center',
  },
  {
    id: 'lastUpdateDate', numeric: false, disablePadding: false, label: 'Última atualização', align: 'center',
  },
  {
    id: 'actions', numeric: true, disablePadding: false, label: 'Ações', align: 'center',
  },
];

function DataTable(props) {
  const {
    rows,
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    totalElements,
    order,
    setOrder,
    orderBy,
    setOrderBy,
    handleUpdateItem,
    loading,
  } = props;

  const [selected, setSelected] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [itensToUpdate, setItensToUpdate] = useState([]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.id);
      setSelected(newSelecteds);

      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleUpdatedClick = (products) => {
    setItensToUpdate(products);
    setOpenDialog(true);
  };

  return (
    <>
      <div className="button-group end" style={{ marginBottom: 10, display: selected.length === 0 ? 'none' : '' }}>
        <Button variant="contained" onClick={(e) => { e.preventDefault(); handleUpdatedClick(selected); }}>
          Atualizar Selecionados
        </Button>
      </div>

      <div className="datatable">
        <Dialog
          open={openDialog}
          onClose={handleCloseDialog}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Marcar produto(s) como Atualizado(s) ?</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Tem certeza que deseja marcar o(s) produto(s) como atualizado(s)?
              Será sobrescrito na próxima importação.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog} color="primary">
              Cancelar
            </Button>
            <Button
              onClick={() => {
                handleUpdateItem(itensToUpdate);
                if (itensToUpdate.length > 1) {
                  setSelected([]);
                }
                handleCloseDialog();
              }}
              color="primary"
              autoFocus
            >
              Enviar
            </Button>
          </DialogActions>
        </Dialog>

        <Paper>
          <TableContainer>
            <Table
              aria-labelledby="tableTitle"
              aria-label="enhanced table"
            >
              <EnhancedTableHead
                cells={headers}
                onSelectAllClick={handleSelectAllClick}
                order={order}
                orderBy={orderBy}
                numSelected={selected.length}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
              />
              <EnhancedTableBody
                rows={rows}
                page={0}
                rowsPerPage={rowsPerPage}
                selected={selected}
                handleClick={handleClick}
                handleUpdatedClick={handleUpdatedClick}
                loading={loading}
              />
            </Table>
          </TableContainer>
          <TablePagination
            labelRowsPerPage="Linhas por página:"
            labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count}`}
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={totalElements}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </>
  );
}

export default DataTable;
