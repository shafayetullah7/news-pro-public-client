import { useForm } from 'react-hook-form';
import {
Grid,
TextField,
Button,
Box,
Container,
FormControl,
FormLabel,
} from '@mui/material';
import useAuth from '../../../hooks/useAuth';
import axios from 'axios';

const AddClass = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const {user} = useAuth();
  // console.log(user);

  const onSubmit = (data) => {
    console.log(data);
    const classdata = {...data,instructorName:user.displayName,instructorEmail:user.email};
    console.log(classdata);
    console.log(classdata.classImage[0])

    const body = new FormData()
    // body.set('key', import.meta.env.IMGBB_KEY);
    body.append('image', classdata.classImage[0]);

    console.log(import.meta.env.IMGBB_KEY);

    const imgbburl = `https://api.imgbb.com/1/upload?key=${import.meta.env.IMGBB_KEY}`;
    console.log(imgbburl);


    axios({
      method: 'post',
      url: imgbburl,
      data: body
    })
    .then(imgbb=>{
      console.log(imgbb)
    })

    // axios({
    //   method: 'post',
    //   url: 'https://api.imgbb.com/1/upload',
    //   data: body
    // })
    // .then(data=>console.log(data));
  };

  return (
    <Container maxWidth="md">
      <div className="flex justify-between items-center border-b border-b-instructor px-5">
        <p className="text-3xl font-bold pb-2 text-instructor">Manage Users</p>
      </div>
      <Box mt={4}>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                {...register('className', {
                  required: {
                    value: true,
                    message: 'Must provide class name',
                  },
                })}
                label="Class Name"
                variant="outlined"
                fullWidth
                required
                error={!!errors.className}
                helperText={errors.className?.message}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <input
                type="file"
                accept="image/*"
                multiple
                {...register('classImage', { required: true })}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl>
                <FormLabel>Instructor Name</FormLabel>
                <TextField
                  {...register('instructorName')}
                  variant="outlined"
                  defaultValue={user?.displayName} // Replace with actual logged-in user's display name
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
                  defaultValue={user?.email} // Replace with actual logged-in user's email
                  fullWidth
                  disabled
                />
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                {...register('availableSeats', {
                  required: {
                    value: true,
                    message: 'Available Seats must be a positive number',
                  },
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
                  required: {
                    value: true,
                    message: 'Price is required',
                  },
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
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                style={{ backgroundColor: '#C38154', color: 'black', fontWeight: 'bold', textTransform: 'capitalize' }}
              >
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
