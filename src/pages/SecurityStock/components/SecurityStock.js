import { useEffect, useState } from 'react';
import {
  Button, Card, CardContent, Checkbox, FormControlLabel, InputAdornment, TextField,
} from '@material-ui/core';
import { Search } from '@material-ui/icons';
import useDidMountEffect from '../../../utils/useDidMountEffect';
import DataTable from '../../../components/DataTable/components/DataTable';

import { api } from '../../../services/api';

import './SecurityStock.scss';

const headers = [
  {
    id: 'codigo', numeric: false, disablePadding: true, label: 'Código', align: 'left',
  },
  {
    id: 'name', numeric: false, disablePadding: true, label: 'Descriçao do Produto', align: 'left',
  },
  {
    id: 'supplierName', numeric: false, disablePadding: true, label: 'Nome do fornecedor', align: 'left',
  },
  {
    id: 'quantityStored', numeric: true, disablePadding: false, label: 'Quantidade em Estoque', align: 'center',
  },
  {
    id: 'quantitySalesLastMonth', numeric: true, disablePadding: false, label: 'Vendas no último mês', align: 'center',
  },
  {
    id: 'requiredItens', numeric: true, disablePadding: false, label: 'Quantidade a solicitar', align: 'center',
  },
  {
    id: 'actions', numeric: true, disablePadding: false, label: 'Ações', align: 'center',
  },
];

function SecurityStock() {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('id');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(false);
  const [nameQuery, setNameQuery] = useState('');
  const [codeQuery, setCodeQuery] = useState('');
  const [onlyRequired, setOnlyRequired] = useState(false);
  const [filtersChanged, setFiltersChanged] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('bling-products/safety-stock', {
        params: {
          size: rowsPerPage,
          page: filtersChanged ? 0 : page,
          sort: `${orderBy},${order}`,
          code: codeQuery,
          name: nameQuery,
          onlyRequired,
        },
      });

      if (filtersChanged) {
        setFiltersChanged(false);
        setPage(0);
      }

      setTotalElements(data.totalElements);
      setRows(data.content);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useDidMountEffect(() => {
    setFiltersChanged(true);
  }, [nameQuery, codeQuery, onlyRequired]);

  useEffect(() => {
    fetchData();
  }, [page, rowsPerPage, orderBy, order]);

  const updateItem = async (products) => {
    try {
      setLoading(true);
      const { data } = await api.post('bling-products/markAsUpdated', {
        ids: products,
      });

      console.log(data);
    } catch (err) {
      console.log(err);
    } finally {
      fetchData();
    }
  };

  return (
    <div>
      <Card className="search-container">
        <CardContent>
          <form className="report-form" onSubmit={(e) => { e.preventDefault(); fetchData(); }}>
            <TextField
              placeholder="Codigo"
              variant="outlined"
              size="small"
              value={codeQuery}
              onChange={(e) => setCodeQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              placeholder="Descrição do produto"
              variant="outlined"
              size="small"
              value={nameQuery}
              onChange={(e) => setNameQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search />
                  </InputAdornment>
                ),
              }}
            />

            <FormControlLabel
              control={<Checkbox checked={onlyRequired} onChange={(e) => setOnlyRequired(e.target.checked)} name="onlyRequired" />}
              label="Somente produtos a repor"
            />

            <div className="button-group end">
              <Button variant="contained" size="large" type="submit">
                Buscar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

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
        handleUpdateItem={updateItem}
        loading={loading}
      />
    </div>
  );
}
export default SecurityStock;
