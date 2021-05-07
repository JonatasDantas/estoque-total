import {
  Button, Collapse, IconButton, TextField,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import { useFormik } from 'formik';
import { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import * as yup from 'yup';
import { api, setAuthorization } from '../../../../services/api';

import StoreContext from '../../../../store/StoreContext';
import './LoginForm.scss';

function LoginForm() {
  const [alertOpen, setAlertOpen] = useState(false);
  const { setToken, setUser } = useContext(StoreContext);
  const history = useHistory();

  const validationSchema = yup.object({
    email: yup
      .string('Insira o seu Email')
      .email('Email inválido')
      .required('Email é obrigatório'),
    password: yup
      .string('Insira sua senha')
      .min(8, 'Senha deve ter no mínimo 8 caractéres')
      .required('Senha é obrigatória'),
  });

  async function handleSubmit(credentials) {
    try {
      const { data } = await api.post('auth/login', { ...credentials });

      if (data.token && data.user) {
        setUser(data.user);
        setToken(data.token);
        setAuthorization(data.token);

        history.replace('/home');
      }
    } catch (e) {
      setAlertOpen(true);
    }
  }

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => handleSubmit(values),
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Collapse in={alertOpen}>
        <Alert
          style={{ marginBottom: 20 }}
          severity="error"
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
          Erro no Login! Por favor, revise seus dados.
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
      <TextField
        fullWidth
        id="password"
        name="password"
        label="Senha"
        type="password"
        variant="outlined"
        size="small"
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
      />
      <div className="button-group">
        <Button variant="contained" size="large" type="submit">
          Entrar
        </Button>
      </div>
    </form>
  );
}

export default LoginForm;
