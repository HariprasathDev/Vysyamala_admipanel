

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios from 'axios';
import {
  TextField,
  Button,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Container,
  Typography,
  Box,
  Grid,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const adminUserSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  full_name: z.string().min(1, "Full name is required"), // updated field name
  role: z.string().nonempty('Role is required'),
  phone_number: z.string().min(10, "Phone number must be at least 10 digits"), // updated field name
  status: z.string().nonempty('Status is required'),
});

type AdminUserFormValues = z.infer<typeof adminUserSchema>;

const AdminUserForm: React.FC = () => {
  const navigate=useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm<AdminUserFormValues>({
    resolver: zodResolver(adminUserSchema),
  });

  const onSubmit = async (data: AdminUserFormValues) => {
    try {
      const response = await axios.post('http://103.214.132.20:8000/api/admin-users/', data);
      console.log('Success:', response.data);
     
    } catch (error) {
      console.error('Error:', error);
    }
    navigate('/AdminList')
  };

  return (
    <Container maxWidth="lg">
      <Box mt={1}>
        <Typography variant="h4" gutterBottom>
          Admin User Form
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Username"
                margin="normal"
                {...register('username')}
                error={!!errors.username}
                helperText={errors.username?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                margin="normal"
                {...register('email')}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Password"
                type="password"
                margin="normal"
                {...register('password')}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Full Name"
                margin="normal"
                {...register('full_name')} // updated field name
                error={!!errors.full_name}
                helperText={errors.full_name?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth margin="normal" error={!!errors.role}>
                <InputLabel id="role-label">Role</InputLabel>
                <Select
                  labelId="role-label"
                  id="role"
                  {...register('role')}
                  defaultValue=""
                  label="Role"
                >
                  <MenuItem value="superadmin">Superadmin</MenuItem>
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="moderator">Moderator</MenuItem>
                </Select>
                {errors.role && <Typography color="error">{errors.role.message}</Typography>}
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone Number"
                margin="normal"
                {...register('phone_number')} // updated field name
                error={!!errors.phone_number}
                helperText={errors.phone_number?.message}
              />
            </Grid>
            <Grid item xs={12} sm={12}>
              <FormControl fullWidth margin="normal" error={!!errors.status}>
                <InputLabel id="status-label">Status</InputLabel>
                <Select
                  labelId="status-label"
                  id="status"
                  {...register('status')}
                  defaultValue=""
                  label="Status"
                >
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                  <MenuItem value="suspended">Suspended</MenuItem>
                </Select>
                {errors.status && <Typography color="error">{errors.status.message}</Typography>}
              </FormControl>
            </Grid>
          </Grid>
          <Box mt={1}>
            <Button variant="contained" color="primary" type="submit" 
              sx={{ height: '50px', fontSize: '16px', mt: 2 }}
            >
              Submit
            </Button>
          </Box>
        </form>
      </Box>
    </Container>
  );
};

export default AdminUserForm;
