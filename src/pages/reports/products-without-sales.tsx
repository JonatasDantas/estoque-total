import { Button, Card, CardContent, Checkbox, FormControl, FormControlLabel, InputAdornment, InputLabel, ListItemText, MenuItem, Select, TextField } from '@material-ui/core';
import { Search, Spellcheck, TrendingDown } from '@material-ui/icons';
import { GetServerSideProps } from 'next';
import { useContext, useEffect, useState } from 'react';
import { DataTable } from 'src/components/DataTable';
import { AuthContext } from 'src/contexts/AuthContext';
import useDidMountEffect from 'src/hooks/useDidMountEffect';
import { getApiClient } from 'src/services/api';
import { validateToken } from 'src/services/authService';
import { BlingProductType } from 'src/types/product';

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

const ProductsWithoutSales: React.FC = () => {
  const { user } = useContext(AuthContext);
  const [rows, setRows] = useState<Array<BlingProductType>>([]);
  const [page, setPage] = useState<number>(0);
  const [order, setOrder] = useState<string>('asc');
  const [orderBy, setOrderBy] = useState<string>('id');
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [totalElements, setTotalElements] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [daysWithoutSaleQuery, setDaysWithoutSaleQuery] = useState<string | number>(7);
  const [daysWithoutUpdateQuery, setDaysWithoutUpdateQuery] = useState<string | number>(14);
  const [nameQuery, setNameQuery] = useState<string>('');
  const [codeQuery, setCodeQuery] = useState<string>('');
  const [observationTypeQuery, setObservationTypeQuery] = useState<any>([]);
  const [onlyNotComposed, setOnlyNotComposed] = useState<boolean>(false);
  const [onlyWithObservations, setOnlyWithObservations] = useState<boolean>(false);
  const [noSales, setNoSales] = useState<boolean>(false);
  const [filtersChanged, setFiltersChanged] = useState<boolean>(false);
  const [observationsTypes, setObservationsTypes] = useState<Array<string>>([]);

  const api = getApiClient();

  const fetchData = async () => {
    console.log(user);
    try {
      setLoading(true);
      const { data } = await api.get(`bling-products/${user?.id}/without-sales`, {
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
      setRows(data.content.map((item: BlingProductType) => {
        // eslint-disable-next-line no-param-reassign
        item.daysWithoutSale = item.lastSaleDate ? Math.ceil(
          (Date.parse(new Date().toString()) - Date.parse(item.lastSaleDate.toString())) / 86400000,
        ) : null;

        return item;
      }));
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchObservationTypes = async () => {
    const { data } = await api.get('bling-products/get-possible-observations');

    setObservationsTypes(data.filter((e: string) => e !== null && e !== ''));
  };

  const updateItem = async (products: Array<string>) => {
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

  //   const renderMenuItens = () => {
  //     const itens = [];

  //     for (let index = 0; index <= 30; index++) {
  //       itens.push(<MenuItem value={index}>{index}</MenuItem>);
  //     }

  //     return itens;
  //   };

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

  useEffect(() => {
    fetchObservationTypes();
  }, []);

  return (
    <div className='products-without-sales'>
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
                renderValue={(selected: any) => selected.join(', ')}
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

};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const validationResult = await validateToken(ctx);
  
  if (!validationResult) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }
  
  return {
    props: {},
  };
};

export default ProductsWithoutSales;