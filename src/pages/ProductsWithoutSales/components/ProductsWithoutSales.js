import { useContext, useEffect, useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputAdornment,
  InputLabel,
  ListItemText,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import { Search, Spellcheck, TrendingDown } from '@material-ui/icons';
import DataTable from '../../../components/DataTable/components/DataTable';
import { api } from '../../../services/api';

import './ProductsWithoutSales.scss';
import useDidMountEffect from '../../../utils/useDidMountEffect';
import StoreContext from '../../../store/StoreContext';

const headers = [
  {
    id: 'codigo', numeric: false, disablePadding: true, label: 'Código', align: 'left',
  },
  {
    id: 'name', numeric: false, disablePadding: true, label: 'Descriçao do Produto', align: 'left',
  },
  {
    id: 'quantityStored', numeric: true, disablePadding: false, label: 'Quantidade em Estoque', align: 'center',
  },
  {
    id: 'lastSaleDate', numeric: false, disablePadding: false, label: 'Última venda', align: 'center',
  },
  {
    id: 'lastUpdateDate', numeric: false, disablePadding: false, label: 'Última atualização', align: 'center',
  },
  {
    id: 'observations', numeric: false, disablePadding: false, label: 'Observações', align: 'center',
  },
  {
    id: 'daysWithoutSale', numeric: true, disablePadding: false, label: 'Dias sem venda', align: 'center',
  },
  {
    id: 'actions', numeric: true, disablePadding: false, label: 'Ações', align: 'center',
  },
];

function ProductsWithoutSales() {
  const { user } = useContext(StoreContext);
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
  const [codeQuery, setCodeQuery] = useState('');
  const [observationTypeQuery, setObservationTypeQuery] = useState([]);
  const [onlyNotComposed, setOnlyNotComposed] = useState(false);
  const [onlyWithObservations, setOnlyWithObservations] = useState(false);
  const [noSales, setNoSales] = useState(false);
  const [filtersChanged, setFiltersChanged] = useState(false);
  const [observationsTypes, setObservationsTypes] = useState([]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data } = await api.get(`bling-products/${user.id}/without-sales`, {
        params: {
          size: rowsPerPage,
          page: filtersChanged ? 0 : page,
          sort: `${orderBy},${order}`,
          code: codeQuery,
          name: nameQuery,
          daysWithoutSale: daysWithoutSaleQuery,
          daysWithoutUpdate: daysWithoutUpdateQuery,
          observationsContains: observationTypeQuery.join(','),
          noSales,
          onlyNotComposed,
          onlyWithObservations,
        },
      });

      if (filtersChanged) {
        setFiltersChanged(false);
        setPage(0);
      }

      setTotalElements(data.totalElements);
      setRows(data.content.map((item) => {
        // eslint-disable-next-line no-param-reassign
        item.daysWithoutSale = item.lastSaleDate ? Math.ceil(
          (Date.parse(new Date()) - Date.parse(item.lastSaleDate)) / 86400000,
        ) : '';

        return item;
      }));
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchObservationTypes = async () => {
    const { data } = await api.get('bling-products/get-possible-observations');

    setObservationsTypes(data.filter((e) => e !== null && e !== ''));
  };

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

  useDidMountEffect(() => {
    setFiltersChanged(true);
  }, [
    nameQuery,
    codeQuery,
    daysWithoutSaleQuery,
    daysWithoutUpdateQuery,
    noSales,
    onlyNotComposed,
    onlyWithObservations,
    observationTypeQuery,
  ]);

  useEffect(() => {
    fetchData();
  }, [page, rowsPerPage, orderBy, order]);

  const renderMenuItens = () => {
    const itens = [];

    for (let index = 0; index <= 30; index++) {
      itens.push(<MenuItem value={index}>{index}</MenuItem>);
    }

    return itens;
  };

  useEffect(() => {
    fetchObservationTypes();
  }, []);

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

            <TextField
              placeholder="Dias sem venda"
              label="Dias sem venda"
              variant="outlined"
              disabled={noSales}
              size="small"
              value={daysWithoutSaleQuery}
              onChange={(e) => setDaysWithoutSaleQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <TrendingDown />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              placeholder="Dias sem atualização"
              label="Dias sem atualização"
              variant="outlined"
              size="small"
              value={daysWithoutUpdateQuery}
              onChange={(e) => setDaysWithoutUpdateQuery(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Spellcheck />
                  </InputAdornment>
                ),
              }}
            />

            <FormControl size="small" className="select-control">
              <InputLabel id="observations-label label">Tipo</InputLabel>
              <Select
                labelId="observations-label"
                label="Tipo"
                className="observations-select"
                id="observations"
                name="observations"
                variant="outlined"
                value={observationTypeQuery}
                multiple
                onChange={(e) => setObservationTypeQuery(e.target.value)}
                renderValue={(selected) => selected.join(', ')}
              >
                {/* {observationsTypes} */}

                {observationsTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    <Checkbox checked={observationTypeQuery.indexOf(type) > -1} />
                    <ListItemText primary={type} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/*
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
            </FormControl> */}

            <div className="checkboxes" style={{ margin: '1rem' }}>
              <FormControlLabel
                control={<Checkbox checked={noSales} onChange={(e) => setNoSales(e.target.checked)} name="checkedA" />}
                label="Produtos Sem venda"
              />

              <FormControlLabel
                control={<Checkbox checked={onlyNotComposed} onChange={(e) => setOnlyNotComposed(e.target.checked)} name="checkedA" />}
                label="Produtos não compostos"
              />

              <FormControlLabel
                control={<Checkbox checked={onlyWithObservations} onChange={(e) => setOnlyWithObservations(e.target.checked)} name="checkedA" />}
                label="Somente com observações"
              />
            </div>

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

export default ProductsWithoutSales;
