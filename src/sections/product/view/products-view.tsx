import axios from "axios";
import { useState, useEffect } from "react";

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
  TableRow,
  TableCell,
  Checkbox,
  TableHead,
  TextField,
} from "@mui/material";

// Layout
import { DashboardContent } from "src/layouts/dashboard";

// ----------------------------------------------------------------------

type EmailProps = {
  id: number;
  username: string;
  email: string;
  entregue?: boolean; // opcional, se você não tiver esses campos no backend
  lido?: boolean;
  aceite?: boolean;
};

// ----------------------------------------------------------------------

export function EmailsView() {
  const [emails, setEmails] = useState<EmailProps[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [filterName, setFilterName] = useState("");

  // 🔹 Buscar usuários do backend
  useEffect(() => {
    const fetchUsers = async () => {
      
      try {
        const token = localStorage.getItem("token"); // se usar JWT
        const response = await axios.get("http://localhost:4000/users", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEmails(response.data);
      } catch (err) {
        console.error("Erro ao buscar usuários:", err);
      }
    };
    fetchUsers();
  }, []);

  // filtro
  const filteredEmails = emails.filter(
    (e) =>
      e.username.toLowerCase().includes(filterName.toLowerCase()) ||
      e.email.toLowerCase().includes(filterName.toLowerCase())
  );

  const handleToggle = (id: number, field: keyof EmailProps) => {
    setEmails((prev) =>
      prev.map((e) => (e.id === id ? { ...e, [field]: !e[field] } : e))
    );
  };

  const handleResend = (email: string) => {
    alert(`Email reenviado para: ${email}`);
  };

  return (
    <DashboardContent>
      <Box sx={{ mb: 5, display: "flex", alignItems: "center" }}>
        <Typography variant="h4" sx={{ flexGrow: 1, color: "#031634" }}>
          Emails Enviados pelo Sistema
        </Typography>
      </Box>

      <Card>
        {/* Barra de pesquisa */}
        <Box sx={{ p: 2 }}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Pesquisar por usuário ou email..."
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
          />
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Usuário</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Entregue</TableCell>
                <TableCell>Lido</TableCell>
                <TableCell>Aceito</TableCell>
                <TableCell>Ações</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredEmails
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((e) => (
                  <TableRow key={e.id} hover>
                    <TableCell>{e.username}</TableCell>
                    <TableCell>{e.email}</TableCell>
                    <TableCell>
                      <Checkbox
                        checked={e.entregue || false}
                        onChange={() => handleToggle(e.id, "entregue")}
                      />
                    </TableCell>
                    <TableCell>
                      <Checkbox
                        checked={e.lido || false}
                        onChange={() => handleToggle(e.id, "lido")}
                      />
                    </TableCell>
                    <TableCell>
                      <Checkbox
                        checked={e.aceite || false}
                        onChange={() => handleToggle(e.id, "aceite")}
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => handleResend(e.email)}
                      >
                        Reenviar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}

              {filteredEmails.length === 0 && (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    Nenhum resultado encontrado.
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
          count={filteredEmails.length}
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

export default EmailsView;
