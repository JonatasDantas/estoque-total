import {
  Assignment, BarChart, Home, PieChart, Settings, TrendingUp,
} from '@material-ui/icons';

const Itens = [
  {
    name: 'Home',
    icon: <Home />,
    route: '/home',
  },
  {
    name: 'Relatório 1',
    icon: <BarChart />,
    route: '/relatorio-1',
  },
  {
    name: 'Relatório 2',
    icon: <TrendingUp />,
    route: '/relatorio-2',
  },
  {
    name: 'Relatório 3',
    icon: <PieChart />,
    route: '/relatorio-3',
  },
  {
    name: 'Relatório 4',
    icon: <Assignment />,
    route: '/relatorio-4',
  },
  {
    name: 'Ajustes',
    icon: <Settings />,
    route: '/ajustes',
  },
];

export default Itens;
