

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';

interface Page {
  id: number;
  page_name: string;
  status: string;
}

const PageList: React.FC = () => {
  const [pages, setPages] = useState<Page[]>([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchPages = async () => {
      try {
        const response = await axios.get<Page[]>(
          'http://103.214.132.20:8000/api/page-list/',
        );
        setPages(response.data);
        console.log('getRequestOfTableData:', response.data);
      } catch (error) {
        console.error('There was an error fetching the data!', error);
      }
    };

    fetchPages();
  }, []);

  const handleEdit = (id: number) => {
    navigate(`/EditCsmData/${id}`);
  };

  const handleDelete = async (id: number) => {
    const isConfirmed = window.confirm(
      'Are you sure you want to delete this page?',
    );

    if (isConfirmed) {
      try {
        const response = await axios.delete(
          `http://103.214.132.20:8000/api/page/delete/${id}/`,
        );
        console.log(`Deleted page with id: ${id}`, response.data);
        // Refresh the page list after deletion
        setPages(pages.filter((page) => page.id !== id));
      } catch (error) {
        console.error('There was an error deleting the page!', error);
      }
    }
  };

  const handleAdd = async () => {
    navigate('/AddCsmData');
    console.log('Add new page');
  };

  return (
    <Paper>
      <Button
        variant="outlined"
        color="primary"
        startIcon={<AddIcon />}
        onClick={handleAdd}
        style={{ float: 'right', margin: '10px 10px 10px 20px' }}
      >
        Add
      </Button>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '18px',  paddingLeft: '30px' }}>
                ID
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '18px'}}>
                Page Name
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '18px'}}>
                Status
              </TableCell>
              <TableCell
                // sx={{ fontWeight: 'bold', fontSize: '18px' }} 
                // align="right"
                sx={{
                  fontWeight: 'bold',
                  fontSize: '18px',
                  textAlign: 'right', // Align text to the right
                  paddingRight: '100px', // Add padding on the right side
                }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {pages.map((page) => (
              <TableRow key={page.id}>
                <TableCell sx={{  fontSize: '18px',  paddingLeft: '30px' }}>{page.id}</TableCell>
                <TableCell  sx={{  fontSize: '18px',   }}>{page.page_name}</TableCell>
                <TableCell  sx={{  fontSize: '18px'}}>{page.status}</TableCell>
                <TableCell align="right">
                  {/* <IconButton onClick={() => handleEdit(page.id)} color="primary">
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => handleDelete(page.id)} color="secondary">
                    <DeleteIcon />
                  </IconButton> */}
                  <div>
                    <Button
                      onClick={() => handleEdit(page.id)}
                      variant="outlined"
                      color="primary"
                      style={{ marginRight: 8 }}
                      startIcon={<EditIcon />}
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(page.id)}
                      variant="outlined"
                      color="secondary"
                      startIcon={<DeleteIcon />}
                      
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default PageList;
