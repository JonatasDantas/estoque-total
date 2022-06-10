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
    name: 'Produtos sem vendas',
    icon: <BarChart />,
    route: '/relatorios/produtos-sem-vendas',
  },
  {
    name: 'Estoque de Segurança',
    icon: <Assignment />,
    route: '/relatorios/estoque-de-segunca',
  },
  {
    name: 'Relatório de atualicações',
    icon: <TrendingUp />,
    route: '/relatorios/atualizacoes',
    onlyManager: true,
  },
  // {
  //   name: 'Relatório 3',
  //   icon: <PieChart />,
  //   route: '/relatorio-3',
  // },
  {
    name: 'Configurações',
    icon: <Settings />,
    route: '/configuracoes',
  },
];

export default Itens;
