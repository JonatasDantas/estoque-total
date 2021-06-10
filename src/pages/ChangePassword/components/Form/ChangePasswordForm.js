import { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import {
  Button,
  Collapse,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  TextField,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { api } from '../../../../services/api';

function ChangePasswordForm() {
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setalertMessage] = useState('');
  const [openErrorDialog, setOpenErrorDialog] = useState('');
  const history = useHistory();

  useEffect(async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    try {
      const { data } = await api.get('auth/reset-password/enabled', { params: { token }, timeout: 2000 });

      if (!data) {
        setOpenErrorDialog(true);
      }
    } catch (err) {
      setOpenErrorDialog(true);
    }
  }, []);

  const validationSchema = yup.object({
    password: yup
      .string('Insira sua senha')
      .min(8, 'Senha deve ter no mínimo 8 caracteres')
      .required('Senha é obrigatória'),
    passwordConfirmation: yup
      .string('Insira sua senha')
      .oneOf([yup.ref('password'), null], 'Senhas devem ser iguais')
      .required('Confirmção é obrigatória'),
  });

  async function handleSubmit(credentials) {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const { data } = await api.post('auth/reset-password/handle', { ...credentials, token: urlParams.get('token') });

      console.log(data);
      setalertMessage('Senha alterada com sucesso! \n');
      setAlertOpen(true);
    } catch (err) {
      setalertMessage(err.message ? err.message : 'Erro na troca de senha!');
      setAlertOpen(true);
    }
  }

  const formik = useFormik({
    initialValues: {
      password: '',
      passwordConfirmation: '',
    },
    validationSchema,
    onSubmit: (values) => handleSubmit(values),
  });

  const handleCloseDialog = () => {
    setOpenErrorDialog(false);
    history.replace('/');
  };

  return (
    <>
      <Dialog
        open={openErrorDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">Erro na troca de senha</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Erro no Token informado!
            Por favor, tente alterar a senha novamente
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary" autoFocus>
            OK
          </Button>
        </DialogActions>
      </Dialog>

      <form onSubmit={formik.handleSubmit}>
        <Collapse in={alertOpen}>
          <Alert
            style={{ marginBottom: 20 }}
            severity={alertMessage === 'Erro na troca de senha!' ? 'error' : 'success'}
            action={(
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setAlertOpen(false);
                }}
              >
                <Close fontSize="inherit" />
              </IconButton>
            )}
          >
            {alertMessage}
            {(alertMessage !== 'Erro na troca de senha!') && <a href="/">Clique aqui para acessar o login</a>}
          </Alert>
        </Collapse>
        <TextField
          fullWidth
          id="password"
          name="password"
          type="password"
          label="Senha"
          variant="outlined"
          size="small"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && Boolean(formik.errors.password)}
          helperText={formik.touched.password && formik.errors.password}
        />

        <TextField
          fullWidth
          id="passwordConfirmation"
          name="passwordConfirmation"
          label="Confirmação de senha"
          type="password"
          variant="outlined"
          size="small"
          value={formik.values.passwordConfirmation}
          onChange={formik.handleChange}
          error={formik.touched.passwordConfirmation && Boolean(formik.errors.passwordConfirmation)}
          helperText={formik.touched.passwordConfirmation && formik.errors.passwordConfirmation}
        />
        <div className="button-group">
          <Button variant="contained" size="large" type="submit">
            Alterar Senha
          </Button>
        </div>
      </form>
    </>
  );
}
export default ChangePasswordForm;
