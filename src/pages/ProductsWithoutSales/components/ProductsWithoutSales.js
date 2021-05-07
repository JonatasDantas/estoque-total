import { useEffect, useState } from 'react';
import {
  Card, CardContent, InputAdornment, TextField,
} from '@material-ui/core';
import { Search } from '@material-ui/icons';
import DataTable from '../../../components/DataTable/components/DataTable';
import { api } from '../../../services/api';

function ProductsWithoutSales() {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('id');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalElements, setTotalElements] = useState(0);

  const fetchData = async () => {
    try {
      const { data } = await api.get('bling-products/without-sales', {
        params: {
          size: rowsPerPage,
          page,
          sort: `${orderBy},${order}`,
        },
      });

      setTotalElements(data.totalElements);
      setRows(data.content);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, rowsPerPage, orderBy, order]);

  return (
    <div>
      <Card className="search-container">
        <CardContent>
          <TextField
            placeholder="Procurar produto"
            variant="outlined"
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
          />
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
      />
    </div>
  );
}

export default ProductsWithoutSales;
