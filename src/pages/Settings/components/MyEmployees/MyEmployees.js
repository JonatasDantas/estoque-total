import {
  Backdrop,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fade,
  makeStyles,
  Modal,
} from '@material-ui/core';
import { useContext, useEffect, useState } from 'react';
import DataTable from '../../../../components/DataTable/components/DataTable';
import { api } from '../../../../services/api';
import StoreContext from '../../../../store/StoreContext';
import { NewEmployeeForm } from './components/NewEmployeeForm';

import './MyEmployees.scss';

const headers = [
  {
    id: 'name', numeric: false, disablePadding: true, label: 'Nome', align: 'left',
  },
  {
    id: 'email', numeric: false, disablePadding: false, label: 'E-mail', align: 'center',
  },
  {
    id: 'roles', numeric: false, disablePadding: true, label: 'Permissão', align: 'left',
  },
  {
    id: 'phone', numeric: false, disablePadding: true, label: 'Telefone', align: 'left',
  },
  {
    id: 'createdDate', numeric: false, disablePadding: false, label: 'Criado em', align: 'center',
  },
  {
    id: 'actions', numeric: true, disablePadding: false, label: 'Ações', align: 'center',
  },
];

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export function MyEmployees() {
  const { user } = useContext(StoreContext);
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('createdAt');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(false);

  const classes = useStyles();
  const [userModalOpen, setUserModalOpen] = useState(false);
  const [deleteModal, setDeleteModalOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [userToEdit, setUserToEdit] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('company/employees');

      setTotalElements(data.length);
      setRows(data.map((item) => ({
        id: item.id,
        name: item.name,
        email: item.email,
        roles: item.roles ? item.roles[0].name : '',
        phone: item.phone,
        createdDate: item.createdAt,
        gender: item.gender,
      })));
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleOpen = () => {
    setUserToEdit(null);
    setUserModalOpen(true);
  };

  const handleClose = (update = false) => {
    setUserModalOpen(false);

    if (update) {
      fetchUsers();
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleOnDelete = async () => {
    try {
      setLoading(true);
      const { data } = await api.delete(`company/deleteUser/${itemToDelete}`);

      if (data > 0) {
        setItemToDelete(null);
      }

      console.log(data);
    } catch (err) {
      console.log(err);
    } finally {
      fetchUsers();
    }
  };

  const handleDeleteClick = (id) => {
    setItemToDelete(id);
    setDeleteModalOpen(true);
  };

  const handleCloseDeleteDialog = () => {
    setDeleteModalOpen(false);
  };

  const handleEditClick = (event) => {
    setUserToEdit(event);
    setUserModalOpen(true);
  };

  return (
    <div className="company-users">
      <DataTable
        headers={headers}
        rows={rows}
        page={page}
        setPage={setPage}
        order={order}
        setOrder={setOrder}
        orderBy={orderBy}
        setOrderBy={setOrderBy}
        rowsPerPage={rowsPerPage}
        setRowsPerPage={setRowsPerPage}
        totalElements={totalElements}
        handleUpdateItem={null}
        loading={loading}
        hideUpdateAction
        handleDeleteClick={handleDeleteClick}
        handleEditClick={handleEditClick}
        selectableRecords={false}
      />

      <div className="button-group" style={{ justifyContent: 'start', marginTop: 20 }}>
        <Button variant="contained" size="large" onClick={handleOpen}>
          Novo Funcionário
        </Button>
      </div>

      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={userModalOpen}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={userModalOpen}>
          <div className={classes.paper}>
            <NewEmployeeForm handleClose={handleClose} userToEdit={userToEdit} />
          </div>
        </Fade>
      </Modal>

      <Dialog
        open={deleteModal}
        onClose={handleCloseDeleteDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Deseja deletar o usuário ?</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Tem certeza que deseja deletar o usuário?
            Essa ação não pode ser desfeita
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog} color="primary">
            Cancelar
          </Button>
          <Button
            onClick={() => {
              handleOnDelete(itemToDelete);
              handleCloseDeleteDialog();
            }}
            color="primary"
            autoFocus
          >
            Enviar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
