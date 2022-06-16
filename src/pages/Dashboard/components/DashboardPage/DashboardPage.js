import {
  Card, CardContent, CardHeader, CircularProgress, Divider,
} from '@material-ui/core';
import './DashboardPage.scss';
import { Pie } from 'react-chartjs-2';

import {
  Chart, ArcElement, Tooltip, Legend, Title,
} from 'chart.js';
import { useEffect, useState } from 'react';
import { api } from '../../../../services/api';

Chart.register(ArcElement, Tooltip, Legend, Title);
function DashboardPage() {
  const [updatesData, setUpdatesData] = useState({});
  const [salesData, setSalesData] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const { data: noSalesData } = await api.get('bling-products/dashboard/no-sales');
      const { data: { ranges: missginUpdatesData } } = await api.get('bling-products/dashboard/missing-update');

      const updateData = {
        labels: [],
        datasets: [],
      };

      missginUpdatesData.forEach((i, index) => {
        let label = '';

        if (i.type === 'LESS_THAN_EQUAL' && index === 0) {
          label = `Até ${i.delimiter} dias`;
        } else if (i.type === 'LESS_THAN_EQUAL') {
          label = `${i.delimiter - 30} a ${i.delimiter} dias`;
        } else {
          label = `Mais que ${i.delimiter} dias`;
        }

        updateData.labels.push(label);
      });

      updateData.datasets.push({
        label: 'Quantidade de produtos sem atualização',
        data: missginUpdatesData.map((e) => e.quantity),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      });

      setSalesData(noSalesData);
      setUpdatesData(updateData);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="products-dashboard">
      <Card className="dashboard-container">
        <CardContent>
          <div className="no-sales-card">
            <Card>
              <CardHeader title="Produtos sem venda" />
              <Divider />
              <CardContent style={{ textAlign: 'center' }}>{salesData}</CardContent>
            </Card>
          </div>
          <h2 style={{ textAlign: 'center' }}>
            Quantidade de produtos sem atualização
          </h2>
          <div className="updates-chart">
            {
            loading
              ? (
                <CircularProgress style={{ position: 'absolute', left: '51%' }} />
              )
              : (
                <Pie title="Quantidade de produtos sem atualização" data={updatesData} height={500} width={500} options={{ maintainAspectRatio: false }} />
              )

          }
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default DashboardPage;
