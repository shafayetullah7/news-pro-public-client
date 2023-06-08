import React from 'react';
import { useForm } from 'react-hook-form';
import {
  Grid,
  TextField,
  Button,
  Typography,
  Box,
  Container,
  FormControl,
  FormLabel,
} from '@mui/material';

const AddClass = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Handle form submission and create the class in the database
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        Add a Class
      </Typography>
      <Box mt={4}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                {...register('className', { required: true })}
                label="Class Name"
                variant="outlined"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                {...register('classImage', { required: true })}
                label="Class Image"
                variant="outlined"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl>
                <FormLabel>Instructor Name</FormLabel>
                <TextField
                  {...register('instructorName')}
                  variant="outlined"
                  defaultValue="John Doe" // Replace with actual logged-in user's display name
                  fullWidth
                  disabled
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl>
                <FormLabel>Instructor Email</FormLabel>
                <TextField
                  {...register('instructorEmail')}
                  variant="outlined"
                  defaultValue="john.doe@example.com" // Replace with actual logged-in user's email
                  fullWidth
                  disabled
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register('availableSeats', { required: true })}
                label="Available Seats"
                variant="outlined"
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                {...register('price', { required: true })}
                label="Price"
                variant="outlined"
                fullWidth
                required
              />
            </Grid>
          </Grid>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Add
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default AddClass;
