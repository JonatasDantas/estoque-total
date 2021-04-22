import {
  Card, CardContent, InputAdornment, TextField,
} from '@material-ui/core';
import { Search } from '@material-ui/icons';
import DataTable from '../../../../components/DataTable/components/DataTable';
import './DashboardPage.scss';

function createData(id, name, quantity, price, quantitySells) {
  return {
    id, name, quantity, price, quantitySells,
  };
}

const rows = [
  createData(1, 'Cabo para Iphone 1mt', 10, 42, 3),
  createData(2, 'Pneu para bicicleta', 23, 500, 7),
  createData(3, 'Cabo para Iphone 1mt', 10, 42, 3),
  createData(4, 'Pneu para bicicleta', 23, 500, 7),
  createData(5, 'Cabo para Iphone 1mt', 10, 42, 3),
  createData(6, 'Pneu para bicicleta', 23, 500, 7),
  createData(7, 'Pneu para bicicleta', 23, 500, 7),
];

const headers = [
  {
    id: 'name', numeric: false, disablePadding: true, label: 'Nome do Produto',
  },
  {
    id: 'quantity', numeric: true, disablePadding: false, label: 'Quantidade em Estoque',
  },
  {
    id: 'price', numeric: true, disablePadding: false, label: 'Preço',
  },
  {
    id: 'quantitySells', numeric: true, disablePadding: false, label: 'Vendas feitas na última semana',
  },
  {
    id: 'actions', numeric: true, disablePadding: false, label: 'Ações',
  },
];

function DashboardPage() {
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
      <DataTable rows={rows} headers={headers} />
    </div>
  );
}

export default DashboardPage;
