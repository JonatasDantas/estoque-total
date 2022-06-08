import {
  Button,
  Collapse,
  IconButton,
  TextField,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import { useFormik } from 'formik';
import { useState } from 'react';
import * as yup from 'yup';
import { api } from '../../../../services/api';

export function UpdatePasswordForm() {
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [alertMessage, setalertMessage] = useState('');

  const validationSchema = yup.object({
    currentPassword: yup
      .string('Insira sua senha atual')
      .required('Senha atual é obrigatória'),
    newPassword: yup
      .string('Insira sua nova senha')
      .required('Nova senha é obrigatória'),
    passwordConfirmation: yup
      .string('Insira sua confirmação de senha')
      .required('Confirmação de senha é obrigatória'),
  });

  async function handleSubmit(credentials) {
    try {
      const { data } = await api.post('auth/update-my-password', { ...credentials });

      console.log(`update password response ${data}`);
      setalertMessage('Senha alterada com sucesso! \n');
      setAlertSuccess(true);
      setAlertOpen(true);
    } catch (err) {
      setalertMessage(err.message ? err.message : 'Erro na troca de senha!');
      setAlertSuccess(false);
      setAlertOpen(true);
    }
  }

  const formik = useFormik({
    initialValues: {
      currentPassword: '',
      newPassword: '',
      passwordConfirmation: '',
    },
    validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
      formik.resetForm();
    },
  });

  return (
    <form className="change-password-form" onSubmit={formik.handleSubmit}>
      <Collapse in={alertOpen}>
        <Alert
          style={{ marginBottom: 20 }}
          severity={alertSuccess ? 'success' : 'error'}
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
        </Alert>
      </Collapse>

      <TextField
        id="currentPassword"
        name="currentPassword"
        label="Senha atual"
        type="password"
        variant="outlined"
        size="small"
        value={formik.values.currentPassword}
        onChange={formik.handleChange}
        error={formik.touched.currentPassword && Boolean(formik.errors.currentPassword)}
        helperText={formik.touched.currentPassword && formik.errors.currentPassword}
      />

      <TextField
        id="newPassword"
        name="newPassword"
        label="Nova senha"
        type="password"
        variant="outlined"
        size="small"
        value={formik.values.newPassword}
        onChange={formik.handleChange}
        error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
        helperText={formik.touched.newPassword && formik.errors.newPassword}
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
  );
}
