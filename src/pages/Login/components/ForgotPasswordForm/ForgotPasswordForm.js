import { useState } from 'react';
import {
  Button, Collapse, IconButton, TextField,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { api } from '../../../../services/api';

function ForgotPasswordForm() {
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setalertMessage] = useState('');

  const validationSchema = yup.object({
    email: yup
      .string('Insira o seu Email')
      .email('Email inválido')
      .required('Email é obrigatório'),
  });

  async function handleSubmit(credentials) {
    try {
      const { data } = await api.post(`auth/reset-password?email=${credentials.email}`);

      console.log(data);
      setalertMessage('Email para recuperação de senha enviado!');
      setAlertOpen(true);
    } catch (err) {
      setalertMessage(err.message ? err.message : 'Email não encontrado!');
      setAlertOpen(true);
    }
  }

  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema,
    onSubmit: (values) => handleSubmit(values),
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Collapse in={alertOpen}>
        <Alert
          style={{ marginBottom: 20 }}
          severity={alertMessage === 'Email para recuperação de senha enviado!' ? 'success' : 'error'}
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
        fullWidth
        id="email"
        name="email"
        label="Email"
        variant="outlined"
        size="small"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />

      <div className="button-group">
        <Button variant="contained" size="large" type="submit">
          Recuperar
        </Button>
      </div>
    </form>
  );
}
export default ForgotPasswordForm;
