


import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

interface User {
  id: number;
  username: string;
  email: string;
  password: string;
  fullName: string;
  role: string;
  phoneNumber: string;
  status: string;
}

const AdminTable: React.FC = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const response = await axios.get('http://103.214.132.20:8000/api/admin-users-list/');
        const data = response.data.map((item: any) => ({
          id: item.id, 
          username: item.username,
          email: item.email,
          password: item.password,
          fullName: item.full_name,
          role: item.role,
          phoneNumber: item.phone_number,
          status: item.status,
        }));
        setUsers(data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchData();
  }, []);

  const handleEdit = (id: number) => {
    navigate(`/EditAdminUserForm/${id}`)
    console.log(`Edit user with id: ${id}`);
    // Implement edit functionality here
  };

  const handleDelete = async (id: number) => {
    const isConfirmed = window.confirm(
      'Are you sure you want to delete this user?',
    );
    if (isConfirmed) {
    try {
      await axios.delete(`http://103.214.132.20:8000/api/admin-users/${id}/delete/`);
      setUsers(users.filter((user) => user.id !== id));
      console.log(`Deleted user with id: ${id}`);
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  }
  };

  const handleAdd = () => {
    navigate('/AdminUsers');
    console.log('Add new page');
  };

  return (
    <Paper>
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '10px' }}>
        <Button
          variant="outlined"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAdd}
          style={{ marginBottom: '10px' }}
        >
          Add
        </Button>
      </div>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
            
              <TableCell sx={{ fontWeight: 'bold', fontSize: '18px', paddingLeft: '60px' }}>
                Username
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '18px', paddingLeft: '60px' }}>
                Email
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '18px', paddingLeft: '60px' }}>
                Password
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '18px', paddingLeft: '60px' }}>
                Full Name
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '18px', paddingLeft: '60px' }}>
                Role
              </TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '18px', paddingLeft: '60px' }}>
                Phone Number
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 'bold',
                  fontSize: '18px',
                  textAlign: 'right',
                  paddingRight: '30px',
                }}
              >
                Status
              </TableCell>
              <TableCell
                sx={{
                  fontWeight: 'bold',
                  fontSize: '18px',
                  textAlign: 'right',
                  paddingRight: '50px',
                }}
              >
                Actions
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
               
                <TableCell sx={{ fontSize: '18px', paddingLeft: '60px' }}>{user.username}</TableCell>
                <TableCell sx={{ fontSize: '18px', paddingLeft: '60px' }}>{user.email}</TableCell>
                <TableCell sx={{ fontSize: '18px', paddingLeft: '60px' }}>{user.password}</TableCell>
                <TableCell sx={{ fontSize: '18px', paddingLeft: '60px' }}>{user.fullName}</TableCell>
                <TableCell sx={{ fontSize: '18px', paddingLeft: '60px' }}>{user.role}</TableCell>
                <TableCell sx={{ fontSize: '18px', paddingLeft: '60px' }}>{user.phoneNumber}</TableCell>
                <TableCell sx={{ fontSize: '18px', paddingLeft: '60px' }}>{user.status}</TableCell>
                <TableCell align="right">
                  <Button
                    onClick={() => handleEdit(user.id)}
                    variant="outlined"
                    color="primary"
                    style={{ marginRight: 22 }}
                    startIcon={<EditIcon />}
                  >
                    Edit
                  </Button>
                  
                  <Button
                    onClick={() => handleDelete(user.id)}
                    variant="outlined"
                    color="secondary"
                    startIcon={<DeleteIcon />}
                    style={{ marginTop: 16 }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
};

export default AdminTable;
