// 1️⃣ Pacotes externos
import axios from 'axios';
import { useState, useEffect } from 'react';

// 2️⃣ Pacotes MUI
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// 3️⃣ Imports internos de raiz
import { DashboardContent } from 'src/layouts/dashboard';

// 4️⃣ Imports relativos
import { AnalyticsCurrentVisits } from '../analytics-current-visits';
import { AnalyticsWebsiteVisits } from '../analytics-website-visits';
import { AnalyticsWidgetSummary } from '../analytics-widget-summary';
import { AnalyticsCurrentSubject } from '../analytics-current-subject';
import { AnalyticsConversionRates } from '../analytics-conversion-rates';



// ----------------------------------------------------------------------

export function OverviewAnalyticsView() {
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token'); // se sua API precisar de autenticação
        const response = await axios.get('http://localhost:4000/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setTotalUsers(response.data.length);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <DashboardContent maxWidth="xl">
      <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
        RGPD
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <AnalyticsWidgetSummary
            title="Utilizadores"
            total={totalUsers}
            percent={2.6}
            sx={{
              bgcolor: "#031634",
              color: "#FFFFFF"
            }}
            icon={<img alt="Usuários" src="/assets/icons/glass/users-group-rounded-svgrepo-com (1).svg" />}
            chart={{
              categories: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
              series: [22, 8, 35, 50, 82, 84, 77, 12],
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <AnalyticsWidgetSummary
            title="Emails"
            total={20}
            percent={2.6}
            sx={{
              bgcolor: "#00327D",
              color: "#FFFFFF"
            }}
            icon={<img alt="Emails" src="/assets/icons/glass/emails-mails-svgrepo-com.svg" />}
            chart={{
              categories: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
              series: [22, 8, 35, 50, 82, 84, 77, 12],
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <AnalyticsWidgetSummary
            title="Proteção de dados"
            total={18}
            percent={2.6}
            sx={{
              bgcolor: "#2960B0",
              color: "#FFFFFF"
            }}
            icon={<img alt="Proteção de dados" src="/assets/icons/glass/data-protection-server-svgrepo-com.svg" />}
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [22, 8, 35, 50, 82, 84, 77, 12],
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <AnalyticsWidgetSummary
            title="Redes Ativas"
            total={50}
            percent={2.6}
            sx={{
              bgcolor: "#4490E0",
              color: "#FFFFFF"
            }}
            icon={<img alt="Redes Ativas" src="/assets/icons/glass/utility-network-trace-svgrepo-com.svg" />}
            chart={{
              categories: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
              series: [22, 8, 35, 50, 82, 84, 77, 12],
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <AnalyticsCurrentVisits
            title="Resumo dos Cards"
            chart={{
              series: [
                { label: 'Utilizadores', value: totalUsers },
                { label: 'Emails', value: 20 },
                { label: 'Análises de dados', value: 18 },
                { label: 'Redes Ativas', value: 50 },
              ],
              colors: ['#031634', '#00327D', '#2960B0', '#4490E0'],
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 8 }}>
          <AnalyticsWebsiteVisits
            title="Evolução Mensal de Utilizadores e Redes"
            chart={{
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
              series: [
                { name: 'Utilizadores', data: [22, 8, 35, 50, 82, 84, 77, 12] },
                { name: 'Emails', data: [44, 55, 41, 67, 22, 43, 21, 49] },
                { name: 'Proteção de dados', data: [30, 25, 36, 30, 45, 35, 64, 52] },
                { name: 'Redes Ativas', data: [56, 30, 23, 54, 47, 40, 62, 73] },
              ],
              colors: ['#031634', '#00327D', '#2960B0', '#4490E0'],
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 8 }}>
          <AnalyticsConversionRates
            title="Comparativo dos Principais Indicadores"
            chart={{
              categories: ['Utilizadores', 'Emails', 'Proteção de dados', 'Redes Ativas'],
              series: [
                { name: '2025', data: [totalUsers, 13, 175, 234] },
              ],
              colors: ['#031634', '#00327D', '#2960B0', '#4490E0'],
            }}
          />
        </Grid>

        <Grid size={{ xs: 12, md: 6, lg: 4 }}>
          <AnalyticsCurrentSubject
            title="Performance dos Indicadores"
            chart={{
              categories: ['Utilizadores', 'Emails', 'Proteção de dados', 'Redes Ativas'],
              series: [
                { name: 'Indicadores 2025', data: [totalUsers, 13, 175, 234] },
              ],
              colors: ['#2960B0'],
            }}
          />
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
