import { Button, Card, CardContent } from '@material-ui/core';
import { useEffect, useState } from 'react';
import DateRangePicker from '@wojtekmaj/react-daterange-picker';
import DataTable from '../../../components/DataTable/components/DataTable';
import { api } from '../../../services/api';
import useDidMountEffect from '../../../utils/useDidMountEffect';

import './UpdatesReport.scss';

const headers = [
  {
    id: 'Date', numeric: false, disablePadding: false, label: 'Data', align: 'center',
  },
  {
    id: 'codigo', numeric: false, disablePadding: true, label: 'Código', align: 'left',
  },
  {
    id: 'productName', numeric: false, disablePadding: true, label: 'Descriçao do Produto', align: 'left',
  },
  {
    id: 'userName', numeric: false, disablePadding: true, label: 'Usuário', align: 'left',
  },
  {
    id: 'email', numeric: false, disablePadding: true, label: 'E-mail', align: 'left',
  },
  {
    id: 'role', numeric: false, disablePadding: true, label: 'Permissão', align: 'left',
  },
];

export function UpdatesReport() {
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [order, setOrder] = useState('asc');
  const [orderBy, setOrderBy] = useState('id');
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(false);
  const [filtersChanged, setFiltersChanged] = useState(false);

  const [dateRange, setDateRange] = useState([new Date(new Date() - (86400000 * 30)), new Date()]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('bling-products/update-report', {
        params: {
          size: rowsPerPage,
          page: filtersChanged ? 0 : page,
          sort: `${orderBy},${order}`,
          startDate: dateRange ? dateRange[0] : undefined,
          endDate: dateRange ? dateRange[1] : undefined,
        },
      });

      if (filtersChanged) {
        setFiltersChanged(false);
        setPage(0);
      }

      setTotalElements(data.totalElements);
      setRows(data.content.map((item) => ({
        id: item.date,
        Date: item.date,
        codigo: item.productData.codigo,
        productName: item.productData.name,
        userName: item.userData.name,
        email: item.userData.email,
        role: item.userData.role,
      })));
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useDidMountEffect(() => {
    setFiltersChanged(true);
  }, [dateRange]);

  useEffect(() => {
    fetchData();
  }, [page, rowsPerPage, orderBy, order]);

  return (
    <div className="update-report">
      <Card className="search-container">
        <CardContent>
          <form className="report-form" onSubmit={(e) => { e.preventDefault(); fetchData(); }}>
            <DateRangePicker onChange={setDateRange} value={dateRange} />

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
        hideUpdateAction
        hideEditAction
        hideDeleteAction
        selectableRecords={false}
        loading={loading}
      />
    </div>

  );
}
