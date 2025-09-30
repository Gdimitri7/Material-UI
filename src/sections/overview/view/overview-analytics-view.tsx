import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { DashboardContent } from 'src/layouts/dashboard';

import { AnalyticsCurrentVisits } from '../analytics-current-visits';
import { AnalyticsWebsiteVisits } from '../analytics-website-visits';
import { AnalyticsWidgetSummary } from '../analytics-widget-summary';
import { AnalyticsCurrentSubject } from '../analytics-current-subject';
import { AnalyticsConversionRates } from '../analytics-conversion-rates';

// ----------------------------------------------------------------------

export function OverviewAnalyticsView() {
  return (
    <DashboardContent maxWidth="xl">
      <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
        RGPD
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <AnalyticsWidgetSummary
  title="Utilizadores"
  total={70}
  percent={2.6}
  sx={{
    bgcolor: "#031634", // fundo do card
    color: "#FFFFFF"     // cor do texto
  }}
  icon={<img alt="Weekly sales" src="/assets/icons/glass/users-group-rounded-svgrepo-com (1).svg" />}
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
    bgcolor: "#00327D", // fundo do card
    color: "#FFFFFF"     // cor do texto
  }}
  icon={<img alt="Weekly sales" src="/assets/icons/glass/emails-mails-svgrepo-com.svg" />}
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
    bgcolor: "#2960B0", // fundo do card
    color: "#FFFFFF"     // cor do texto
  }}
  icon={<img alt="Weekly sales" src="/assets/icons/glass/data-protection-server-svgrepo-com.svg" />}
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
    bgcolor: "#4490E0", // fundo do card
    color: "#FFFFFF"     // cor do texto
  }}
  icon={<img alt="Weekly sales" src="/assets/icons/glass/utility-network-trace-svgrepo-com.svg" />}
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
                { label: 'Utilizadores', value: 70},
                { label: 'Emails', value: 20},
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
      { name: '2025', data: [714, 13, 175, 234] },
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
      { name: 'Indicadores 2025', data: [714, 13, 175, 234] },
    ],
    colors: ['#2960B0'],
  }}
/>
        </Grid>
      </Grid>
    </DashboardContent>
  );
}
