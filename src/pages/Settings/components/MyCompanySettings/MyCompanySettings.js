import {
  Button, Collapse, IconButton, TextField,
} from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { Alert } from '@material-ui/lab';
import { useFormik } from 'formik';
import { useState } from 'react';
import * as yup from 'yup';
import { api } from '../../../../services/api';

export function MyCompanySettings() {
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [alertMessage, setalertMessage] = useState('');

  const validationSchema = yup.object({
    currentPassword: yup
      .string('Insira o nome da empresa')
      .required('Nome da empresa é obrigatória'),
    passwordConfirmation: yup
      .string('Insira sua chave Bling')
      .required('Chave Bling é obrigatória'),
  });

  async function handleSubmit(companyData) {
    try {
      const { data } = await api.put('company', { ...companyData });

      console.log(`update company response ${data}`);
      setalertMessage('Dados da empresa alterados com sucesso! \n');
      setAlertSuccess(true);
      setAlertOpen(true);
    } catch (err) {
      setalertMessage(err.message ? err.message : 'Erro na atualização!');
      setAlertSuccess(false);
      setAlertOpen(true);
    }
  }

  const formik = useFormik({
    initialValues: {
      name: '',
      blingKey: '',
    },
    validationSchema,
    onSubmit: (values) => {
      handleSubmit(values);
      formik.resetForm();
    },
  });

  return (
    <form className="update-company-form" onSubmit={formik.handleSubmit}>
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
        id="name"
        name="name"
        label="Nome da empresa"
        variant="outlined"
        size="small"
        value={formik.values.name}
        onChange={formik.handleChange}
        error={formik.touched.name && Boolean(formik.errors.name)}
        helperText={formik.touched.name && formik.errors.name}
      />

      <TextField
        id="blingKey"
        name="blingKey"
        label="Chave Bling"
        variant="outlined"
        size="small"
        value={formik.values.blingKey}
        onChange={formik.handleChange}
        error={formik.touched.blingKey && Boolean(formik.errors.blingKey)}
        helperText={formik.touched.blingKey && formik.errors.blingKey}
      />

      <div className="button-group">
        <Button variant="contained" size="large" type="submit">
          Atualizar dados
        </Button>
      </div>

    </form>
  );
}
