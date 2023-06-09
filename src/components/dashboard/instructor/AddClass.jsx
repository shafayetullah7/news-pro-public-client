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
import useProfile from '../../../hooks/useProfile';

const AddClass = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  // const {data:profile} = useProfile();
  // console.log(profile)

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
              <input
                type="file"
                accept="image/*"
                {...register('classImage', { required: true })}
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
            <Grid item xs={12} sm={6}>
              <TextField
                {...register('availableSeats', {
                  required: true,
                  pattern: {
                    value: /^[1-9]\d*$/,
                    message: 'Available Seats must be a positive number',
                  },
                })}
                label="Available Seats"
                variant="outlined"
                fullWidth
                required
                error={!!errors.availableSeats}
                helperText={errors.availableSeats?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                {...register('price', {
                  required: true,
                  pattern: {
                    value: /^\d+(\.\d{1,2})?$/,
                    message: 'Price must be a valid float with up to 2 decimal places',
                  },
                })}
                label="Price"
                variant="outlined"
                fullWidth
                required
                error={!!errors.price}
                helperText={errors.price?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained" color="primary" fullWidth style={{backgroundColor: '#C38154',color: 'black',fontWeight:'bold',textTransform:'capitalize'}}>
                Create Class
              </Button>
            </Grid>
          </Grid>
        </form>
      </Box>
    </Container>
  );
};

export default AddClass;
