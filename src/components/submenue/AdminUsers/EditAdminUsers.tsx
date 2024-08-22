


import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
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
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditAdminUserSchema = z.object({
  username: z.string().min(1, "Username is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  full_name: z.string().min(1, "Full name is required"),
  role: z.string().nonempty('Role is required'),
  phone_number: z.string().min(10, "Phone number must be at least 10 digits"),
  status: z.string().nonempty('Status is required'),
});

type EditAdminUserFormValues = z.infer<typeof EditAdminUserSchema>;

const EditAdminUserForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const { register, handleSubmit, setValue, formState: { errors }, watch  } = useForm<EditAdminUserFormValues>({
    resolver: zodResolver(EditAdminUserSchema),
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://103.214.132.20:8000/api/admin-users-list/${id}/`);
        const userData = response.data;
        setValue('username', userData.username);
        setValue('email', userData.email);
        setValue('password', userData.password);
        setValue('full_name', userData.full_name);
        setValue('role', userData.role);
        setValue('phone_number', userData.phone_number);
        setValue('status', userData.status);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUser();
  }, [id, setValue]);

  const onSubmit = async (data: EditAdminUserFormValues) => {
    try {
      await axios.put(`http://103.214.132.20:8000/api/admin-users/${id}/edit/`, data);
      navigate('/AdminList');
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

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
                {...register('full_name')}
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
                  defaultValue={watch('role') || ""}
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
                {...register('phone_number')}
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
                  defaultValue={watch('status') || ""}
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

export default EditAdminUserForm;
