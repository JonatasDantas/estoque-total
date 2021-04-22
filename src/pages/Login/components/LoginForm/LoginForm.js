import { Button, TextField } from '@material-ui/core';
import { useFormik } from 'formik';
import * as yup from 'yup';

import './LoginForm.scss';

function LoginForm() {
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

  function handleSubmit(data) {
    console.log(data);
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
        <Button color="#56ccf2" variant="contained" size="large" type="submit">
          Entrar
        </Button>
      </div>
    </form>
  );
}

export default LoginForm;
