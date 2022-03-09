import { Button, Collapse, IconButton, TextField } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import { useFormik } from 'formik';
import { useContext, useState } from 'react';
import { AuthContext } from 'src/contexts/AuthContext';
import * as yup from 'yup';

export interface LoginCredentials {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const [alertOpen, setAlertOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { login } = useContext(AuthContext);

  const validationSchema = yup.object({
    email: yup
      .string()
      .email('Email inválido')
      .required('Email é obrigatório'),
    password: yup
      .string()
      .required('Senha é obrigatória'),
  });

  async function handleSubmit(credentials: LoginCredentials) {
    try {
      setIsLoading(true);
      
      const result = await login(credentials);

      if (!result) {
        setAlertOpen(true);
      }
    } catch (e) {
      setAlertOpen(true);
    } finally {
      setIsLoading(false);
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
    <form className='login-form' onSubmit={formik.handleSubmit}>
      <Collapse in={alertOpen}>
        <Alert
          style={{ marginBottom: 20 }}
          severity="error"
          action={(
            <IconButton
              aria-label="close"
              color='inherit'
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
        <Button variant="contained" size="large" type="submit" disabled={isLoading}>
          Entrar
        </Button>
      </div>
    </form>
  );
};

export default LoginForm;