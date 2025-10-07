import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Box,
  Button,
  TextField,
  Typography,
  Card,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';

import api from 'src/services/api';

export default function CreateUser() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  // Função para criar usuário
  const handleCreateUser = async () => {
    try {
      const token = localStorage.getItem('token');
      await api.post(
        '/auth/register',
        { username, email, password, role },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Usuário criado com sucesso!');
      navigate('/user'); // volta para a lista
    } catch (err: any) {
      console.error('Erro completo:', err.response || err.message);
      alert(`Erro ao criar usuário: ${err.response?.data?.message || err.message}`);
    }
  };

  return (
    <Box sx={{ maxWidth: 500, mx: 'auto', mt: 5 }}>
      <Card sx={{ p: 3 }}>
        <Typography variant="h5" mb={2}>
          Criar Novo Usuário
        </Typography>

        <TextField
          label="Username"
          fullWidth
          margin="normal"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />

        <TextField
          label="Email"
          fullWidth
          margin="normal"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <TextField
          label="Senha"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <FormControl fullWidth margin="normal">
          <InputLabel id="role-label">Cargo</InputLabel>
          <Select
            labelId="role-label"
            value={role}
            label="Cargo"
            onChange={e => setRole(e.target.value)}
          >
            <MenuItem value="admin">Admin</MenuItem>
            <MenuItem value="colaborador">Colaborador</MenuItem>
          </Select>
        </FormControl>

        <Box mt={2} display="flex" justifyContent="space-between">
          <Button variant="outlined" onClick={() => navigate('/user')}>
            Cancelar
          </Button>
          <Button variant="contained" onClick={handleCreateUser}>
            Criar
          </Button>
        </Box>
      </Card>
    </Box>
  );
}
