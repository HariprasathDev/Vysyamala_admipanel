import React, { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Pagination,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Edit as EditIcon,
  Add as AddIcon,
} from '@mui/icons-material';

interface ColumnConfig<T> {
  field: keyof T;
  headerName: string;
  sortable?: boolean;
}

interface BasicTableProps<T> {
  data: T[];
  columns: ColumnConfig<T>[];
  handleSearchChange: (query: string) => void;
  handleEdit: (item: T) => void;
  handleDelete: (id: keyof T) => void;
  setShowPopup: (show: boolean) => void;
  idField: keyof T;
  title:string
}

export default function Reuse<T>({
  data,
  columns,
  handleSearchChange,
  handleEdit,
  handleDelete,
  setShowPopup,
  idField,
  title
}: BasicTableProps<T>) {
  const [searchQuery, setSearchQuery] = useState('');
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortField, setSortField] = useState<keyof T>(columns[0].field);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSelectChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    handleSearchChange(query);
  };

  const handleSort = (field: keyof T) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredData = data.filter((item) =>
    columns.some((col) =>
      String(item[col.field]).toLowerCase().includes(searchQuery.toLowerCase()),
    ),
  );

  const sortedData = filteredData.sort((a, b) => {
    const fieldA = String(a[sortField]).toLowerCase();
    const fieldB = String(b[sortField]).toLowerCase();
    if (fieldA < fieldB) {
      return sortDirection === 'asc' ? -1 : 1;
    }
    if (fieldA > fieldB) {
      return sortDirection === 'asc' ? 1 : -1;
    }
    return 0;
  });

  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value);
  };

  return (
    <>
      <Typography variant="h4" gutterBottom>
        {title}
      </Typography>

      <TableContainer component={Paper}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            margin: '30px',
          }}
        >
          <Box>
            <Select
              value={itemsPerPage}
              onChange={handleSelectChange}
              variant="outlined"
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={30}>30</MenuItem>
              <MenuItem value={50}>50</MenuItem>
            </Select>
          </Box>
          <Box>
            <TextField
              type="text"
              onChange={handleSearchInputChange}
              placeholder="Search"
              style={{ marginRight: '10px' }}
              variant="outlined"
            />

            <Button
              style={{ height: '56px' }}
              variant="contained"
              color="primary"
              onClick={() => setShowPopup(true)}
            >
              <AddIcon />
            </Button>
          </Box>
        </Box>

        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="left">S.No</TableCell>
              {columns.map((column) => (
                <TableCell
                  key={String(column.field)}
                  align="left"
                  onClick={() => column.sortable && handleSort(column.field)}
                  style={{ cursor: column.sortable ? 'pointer' : 'default' }}
                >
                  {column.headerName}{' '}
                  {sortField === column.field && (sortDirection === 'asc' ? '▲' : '▼')}
                </TableCell>
              ))}
              <TableCell align="left">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedData.map((item, index) => (
              <TableRow
                key={String(item[idField])}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                }}
              >
                <TableCell component="th" scope="row">
                  {index + 1 + (currentPage - 1) * itemsPerPage}
                </TableCell>
                {columns.map((column) => (
                  <TableCell key={String(column.field)} component="th" scope="row">
                    {String(item[column.field])}
                  </TableCell>
                ))}
                <TableCell align="left">
                  <IconButton onClick={() => handleEdit(item)}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(item[idField])}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Box sx={{ display: 'flex', justifyContent: 'end' }}>
        <Pagination
          count={Math.ceil(filteredData.length / itemsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
        />
      </Box>
    </>
  );
}
