import { useState } from "react";

// MUI
import {
  Box,
  Card,
  Table,
  Button,
  TableBody,
  Typography,
  TableContainer,
  TablePagination,
  TableHead,
  TableRow,
  TableCell,
  TextField,
} from "@mui/material";

// Layout
import { DashboardContent } from "src/layouts/dashboard";

// ----------------------------------------------------------------------

type DeviceProps = {
  id: number;
  aparelho: string;
  usuario: string;
  disco: string;
  cpu: string;
  ano: number;
  windows: string;
  office: string;
  antivirus: string;
  firewall: string;
  ip: string;
};

// ----------------------------------------------------------------------

export function InventarioView() {
  const [devices, setDevices] = useState<DeviceProps[]>([
    {
      id: 1,
      aparelho: "Notebook Dell",
      usuario: "Gustavo Silva",
      disco: "512GB SSD",
      cpu: "Intel i7",
      ano: 2021,
      windows: "Windows 11",
      office: "Office 2021",
      antivirus: "Norton",
      firewall: "Ativado",
      ip: "192.168.0.101",
    },
    {
      id: 2,
      aparelho: "PC Lenovo",
      usuario: "Maria Oliveira",
      disco: "1TB HDD",
      cpu: "Intel i5",
      ano: 2020,
      windows: "Windows 10",
      office: "Office 2019",
      antivirus: "McAfee",
      firewall: "Ativado",
      ip: "192.168.0.102",
    },
    // Adicione mais dispositivos conforme necessário
  ]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filterName, setFilterName] = useState("");

  const filteredDevices = devices.filter(
    (d) =>
      d.aparelho.toLowerCase().includes(filterName.toLowerCase()) ||
      d.usuario.toLowerCase().includes(filterName.toLowerCase()) ||
      d.ip.includes(filterName)
  );

  return (
    <DashboardContent>
      <Box sx={{ mb: 5, display: "flex", alignItems: "center" }}>
        <Typography variant="h4" sx={{ flexGrow: 1, color: "#031634" }}>
          Inventário de Dispositivos
        </Typography>
      </Box>

      <Card>
        {/* Barra de pesquisa */}
        <Box sx={{ p: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Pesquisar por aparelho, usuário ou IP..."
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
          />
        </Box>

        <TableContainer sx={{ overflowX: "auto" }}>
  <Table sx={{ minWidth: 1200 }}>
    <TableHead>
      <TableRow>
        <TableCell>Aparelho</TableCell>
        <TableCell>Usuário</TableCell>
        <TableCell>Disco</TableCell>
        <TableCell>CPU</TableCell>
        <TableCell>Ano</TableCell>
        <TableCell>Windows</TableCell>
        <TableCell>Office</TableCell>
        <TableCell>Antivírus</TableCell>
        <TableCell>Firewall</TableCell>
        <TableCell>IP</TableCell>
      </TableRow>
    </TableHead>
    <TableBody>
      {filteredDevices
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
        .map((d) => (
          <TableRow key={d.id} hover>
            <TableCell>{d.aparelho}</TableCell>
            <TableCell>{d.usuario}</TableCell>
            <TableCell>{d.disco}</TableCell>
            <TableCell>{d.cpu}</TableCell>
            <TableCell>{d.ano}</TableCell>
            <TableCell>{d.windows}</TableCell>
            <TableCell>{d.office}</TableCell>
            <TableCell>{d.antivirus}</TableCell>
            <TableCell>{d.firewall}</TableCell>
            <TableCell>{d.ip}</TableCell>
          </TableRow>
        ))}
      {filteredDevices.length === 0 && (
        <TableRow>
          <TableCell colSpan={10} align="center">
            Nenhum dispositivo encontrado.
          </TableCell>
        </TableRow>
      )}
    </TableBody>
  </Table>
</TableContainer>


        {/* Paginação */}
        <TablePagination
          component="div"
          page={page}
          count={filteredDevices.length}
          rowsPerPage={rowsPerPage}
          onPageChange={(e, newPage) => setPage(newPage)}
          rowsPerPageOptions={[5, 10, 25]}
          onRowsPerPageChange={(e) => {
            setRowsPerPage(parseInt(e.target.value, 10));
            setPage(0);
          }}
        />
      </Card>
    </DashboardContent>
  );
}

export default InventarioView;
