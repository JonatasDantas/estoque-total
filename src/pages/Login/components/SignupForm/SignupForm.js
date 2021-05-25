import { useState } from 'react';
import {
  Button,
  Collapse,
  FormControl,
  FormHelperText,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';

import { useFormik } from 'formik';
import * as yup from 'yup';
import InputMask from 'react-input-mask';

import './SignupForm.scss';

import { Alert } from '@material-ui/lab';
import { api } from '../../../../services/api';

function SignupForm() {
  const [alertOpen, setAlertOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [alertMessage, setalertMessage] = useState('');

  const validationSchema = yup.object({
    firstName: yup
      .string('Insira o seu Nome')
      .required('Nome é obrigatório'),
    lastName: yup
      .string('Insira o seu Sobrenome')
      .required('Sobrenome é obrigatório'),
    gender: yup
      .string('Insira o seu Sexo')
      .required('Sexo é obrigatório'),
    phone: yup
      .string('Insira o seu Telefone')
      .min(9, 'Celular inválido')
      .required('Telefone é obrigatório'),
    email: yup
      .string('Insira o seu Email')
      .email('Email inválido')
      .required('Email é obrigatório'),
    password: yup
      .string('Insira sua senha')
      .min(8, 'Senha deve ter no mínimo 8 caractéres')
      .required('Senha é obrigatória'),
  });

  async function handleSubmit(userData) {
    try {
      setIsLoading(true);
      const { data } = await api.post('auth/signup', { ...userData });

      if (data.id) {
        setalertMessage('Usuário criado com sucesso! Prossiga para o login');
        setAlertOpen(true);
        setIsLoading(false);
      }
    } catch (err) {
      setalertMessage(err.response.data ? err.response.data : 'Erro no cadastro! Por favor, tente novamente');
      setAlertOpen(true);
      setIsLoading(false);
    }
  }

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      gender: '',
      phone: '',
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
          severity={alertMessage === 'Usuário criado com sucesso! Prossiga para o login' ? 'success' : 'error'}
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
      <div className="row">
        <TextField
          id="firstName"
          name="firstName"
          label="Nome"
          variant="outlined"
          size="small"
          value={formik.values.firstName}
          onChange={formik.handleChange}
          error={formik.touched.firstName && Boolean(formik.errors.firstName)}
          helperText={formik.touched.firstName && formik.errors.firstName}
        />
        <TextField
          id="lastName"
          name="lastName"
          label="Sobrenome"
          variant="outlined"
          size="small"
          value={formik.values.lastName}
          onChange={formik.handleChange}
          error={formik.touched.lastName && Boolean(formik.errors.lastName)}
          helperText={formik.touched.lastName && formik.errors.lastName}
        />
      </div>
      <div className="row">
        <FormControl size="small">
          <InputLabel id="gender-label">Sexo</InputLabel>
          <Select
            labelId="gender-label"
            label="Sexo"
            className="gender-select"
            id="gender"
            name="gender"
            variant="outlined"
            value={formik.values.gender}
            onChange={formik.handleChange}
            error={formik.touched.gender && Boolean(formik.errors.gender)}
          >
            <MenuItem value="Masculino">Masculino</MenuItem>
            <MenuItem value="Feminino">Feminino</MenuItem>
          </Select>
          <FormHelperText>{formik.errors.gender}</FormHelperText>
        </FormControl>

        <InputMask
          mask="(99) 99999-9999"
          disabled={false}
          id="phone"
          name="phone"
          label="Celular"
          value={formik.values.phone}
          onChange={(e) => { formik.setFieldValue('phone', e.target.value.replace('(', '').replace(')', '').replace('-', '').replace('_', '')); }}
        >
          <TextField
            className="phone-texfield"
            id="phone"
            name="phone"
            label="Celular"
            variant="outlined"
            size="small"
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
          />

        </InputMask>
      </div>
      <div className="row">
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
      </div>

      <div className="button-group">
        <Button variant="contained" size="large" type="submit" disabled={isLoading}>
          Cadastrar
        </Button>
      </div>
    </form>
  );
}

export default SignupForm;
