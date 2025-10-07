import { useState, useCallback } from 'react';

import {
  Box,
  Avatar,
  Popover,
  Checkbox,
  MenuList,
  MenuItem,
  TableRow,
  TableCell,
  IconButton,
  Typography,
} from '@mui/material';

import api from 'src/services/api';

import { Iconify } from 'src/components/iconify';

export interface UserProps {
  id: number;
  name: string;
  email: string;
  role: string;
  avatarUrl?: string;
}

interface UserTableRowProps {
  row: UserProps;
  selected: boolean;
  onSelectRow: () => void;
  onEdit?: (user: UserProps) => void;
  onDelete?: (userId: number) => void;
}

export function UserTableRow({
  row,
  selected,
  onSelectRow,
  onEdit,
  onDelete,
}: UserTableRowProps) {
  const [openPopover, setOpenPopover] = useState<HTMLElement | null>(null);

  const handleOpenPopover = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      setOpenPopover(event.currentTarget);
    },
    []
  );

  const handleClosePopover = useCallback(() => {
    setOpenPopover(null);
  }, []);

  const handleEdit = () => {
    handleClosePopover();
    if (onEdit) onEdit(row);
  };

  const handleDelete = async () => {
    if (!onDelete) return;
    if (window.confirm(`Deseja realmente excluir o usuário ${row.name}?`)) {
      await onDelete(row.id);
      handleClosePopover();
    }
  };

  return (
    <>
      <TableRow hover tabIndex={-1} selected={selected}>
        <TableCell padding="checkbox">
          <Checkbox disableRipple checked={selected} onChange={onSelectRow} />
        </TableCell>

        <TableCell>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar alt={row.name} src={row.avatarUrl} />
            <Typography>{row.name}</Typography>
          </Box>
        </TableCell>

        <TableCell>{row.email}</TableCell>
        <TableCell>{row.role}</TableCell>

        <TableCell align="right">
          <IconButton onClick={handleOpenPopover}>
            <Iconify icon="eva:more-vertical-fill" />
          </IconButton>
        </TableCell>
      </TableRow>

      <Popover
        open={!!openPopover}
        anchorEl={openPopover}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <MenuList sx={{ p: 0.5 }}>
          <MenuItem onClick={handleEdit}>
            <Iconify icon="solar:pen-bold" width={20} />
            Editar
          </MenuItem>

          <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
            <Iconify icon="solar:trash-bin-trash-bold" width={20} />
            Excluir
          </MenuItem>
        </MenuList>
      </Popover>
    </>
  );
}
