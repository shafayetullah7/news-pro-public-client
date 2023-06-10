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
import useAxiosSecure from '../../../hooks/useAxios';
import Swal from 'sweetalert2';
import { useState } from 'react';

const AddClass = () => {
  const { register, handleSubmit, formState: { errors },reset } = useForm();
  const {user} = useAuth();
  const [axiosSecure] = useAxiosSecure();
  const [error,setError]=useState('')
  // console.log(user);

  const onSubmit = (data) => {
    setError('');
    // console.log(data);
    // console.log(errors);
    let classdata = {...data,instructorName:user.displayName,instructorEmail:user.email,availableSeats:parseInt(data.availableSeats),price:parseFloat(data.price),status:'pending'};
    // console.log(classdata);
    // console.log(classdata.classImage[0])

    const body = new FormData()
    body.append('image', classdata.classImage[0]);

    const imgbburl = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`;

    axios({
      method: 'post',
      url: imgbburl,
      data: body
    })
    .then(data=>{
      // console.log(data.data.data.display_url);
      classdata = {...classdata,classImage:data.data.data.display_url};
      axiosSecure.post('http://localhost:5000/classes',classdata)
      .then(res=>{
        console.log(res);
        Swal.fire(
          'Class added',
          '',
          'success'
        )
        reset();
      })
    })

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
              <div>
              <input
                type="file"
                accept="image/*"
                multiple
                {...register('classImage', { required:{
                  value:true,
                  message:'image is required'
                } })}
              />
              
              </div>
              {/* {<p className='text-xs text-red-600'>{errors?.classImage}</p>} */}
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl>
                <FormLabel>Instructor Name</FormLabel>
                <TextField
                  {...register('instructorName')}
                  variant="outlined"
                  defaultValue={user?.displayName}
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
                  defaultValue={user?.email}
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
        <p className='text-xs text-red-600'>{error}</p>
      </Box>
    </Container>
  );
};

export default AddClass;
