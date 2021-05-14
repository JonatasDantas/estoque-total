import { useEffect, useState } from 'react';
import {
  Button,
  Card, CardContent, Dialog, FormControl, InputAdornment, InputLabel, MenuItem, Select, TextField,
} from '@material-ui/core';
import { Search } from '@material-ui/icons';
import DataTable from '../../../components/DataTable/components/DataTable';
import { api } from '../../../services/api';

import './ProductsWithoutSales.scss';

function ProductsWithoutSales() {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('id');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(false);
  const [daysWithoutSaleQuery, setDaysWithoutSaleQuery] = useState(7);
  const [daysWithoutUpdateQuery, setDaysWithoutUpdateQuery] = useState(14);
  const [nameQuery, setNameQuery] = useState('');
  const [filtersChanged, setFiltersChanged] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('bling-products/without-sales', {
        params: {
          size: rowsPerPage,
          page: filtersChanged ? 0 : page,
          sort: `${orderBy},${order}`,
          name: nameQuery,
          daysWithoutSale: daysWithoutSaleQuery,
          daysWithoutUpdate: daysWithoutUpdateQuery,
        },
      });

      setTotalElements(data.totalElements);
      setRows(data.content);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const updateItem = async (product) => {
    try {
      setLoading(true);
      const { data } = await api.post(`bling-products/${product.id}/markAsUpdated`);

      console.log(data);
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    setFiltersChanged(true);
  }, [nameQuery, daysWithoutSaleQuery, daysWithoutUpdateQuery]);

  useEffect(() => {
    fetchData();
  }, [page, rowsPerPage, orderBy, order]);

  const renderMenuItens = () => {
    const itens = [];

    for (let index = 1; index <= 30; index++) {
      itens.push(<MenuItem value={index}>{index}</MenuItem>);
    }

    return itens;
  };

  return (
    <div>
      <Card className="search-container">
        <CardContent>
          <form className="report-form" onSubmit={(e) => { e.preventDefault(); fetchData(); }}>
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

            <FormControl size="small" className="select-control">
              <InputLabel id="nosales-label label">Dias sem venda</InputLabel>
              <Select
                labelId="nosales-label"
                label="Dias sem venda"
                className="nosales-select"
                id="nosales"
                name="nosales"
                variant="outlined"
                value={daysWithoutSaleQuery}
                onChange={(e) => setDaysWithoutSaleQuery(e.target.value)}
              >
                {renderMenuItens()}
              </Select>
            </FormControl>

            <FormControl size="small" className="select-control">
              <InputLabel id="noupdate-label label">Dias sem atualização</InputLabel>
              <Select
                labelId="noupdate-label"
                label="Dias sem atualização"
                className="noupdate-select"
                id="noupdate"
                name="noupdate"
                variant="outlined"
                value={daysWithoutUpdateQuery}
                onChange={(e) => setDaysWithoutUpdateQuery(e.target.value)}
              >
                {renderMenuItens()}
              </Select>
            </FormControl>

            <div className="button-group end">
              <Button variant="contained" size="large" type="submit">
                Buscar
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      <DataTable
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

export default ProductsWithoutSales;
