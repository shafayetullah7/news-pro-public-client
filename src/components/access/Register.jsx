import { useForm } from 'react-hook-form';
import { Button, Radio, RadioGroup, FormControlLabel, FormLabel, Grid, TextField, FormControl } from '@mui/material';

import loginImg from '../../assets/loginImg.json'
import Lottie from "lottie-react";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import SocialAccess from './SocialAccess';
import { Helmet } from 'react-helmet-async';
import useAuth from '../../hooks/useAuth';
import Swal from 'sweetalert2';
import useAxiosSecure from '../../hooks/useAxios';
// import axios from 'axios';

const Register = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const navigate = useNavigate();
    const {createUser,updateUser} = useAuth();
    const [axiosSecure] = useAxiosSecure();
    const location = useLocation();
    const from = location.state?.from?.pathname;
  

    const onSubmit = (data) => {
    // Handle registration logic here
    console.log(data);
    const userData = {...data,type:'student'};
    delete userData.password;
    delete userData.confirmPassword;

    createUser(data.email,data.password)
    .then(result=>{
        console.log(result);
        updateUser(data.name,data.photoUrl)
        .then(()=>{
            // axios.post('http://localhost:5000/users',userData)
            axiosSecure.post('/users',userData)
            .then(data=>{
                console.log(data);
                Swal.fire('','Logged In','success')
                navigate(from || '/',{replace:true});
            })
            .catch(err=>{
                console.log(err);
            })
        })
        .catch(err=>{
            console.log(err);
        })
    })
    .catch(err=>{
        console.log(err);
    })

  };

  const onError = (errors) =>{
    console.log('errors : ',errors);
  }

  const password = watch('password');
//   const confirmPassword = watch('confirmPassword');

  // Custom validation rule for password
  const isPasswordValid = (value) => {
    // Check if password meets requirements
    const minLength = 6;
    const hasCapitalLetter = /[A-Z]/.test(value);
    const hasSpecialCharacter = /[!@#$%^&*]/.test(value);

    if (value.length < minLength) {
      return 'Password must be at least 6 characters long';
    }

    if (!hasCapitalLetter) {
      return 'Password must have at least one capital letter';
    }

    if (!hasSpecialCharacter) {
      return 'Password must have at least one special character (!@#$%^&*)';
    }

    return true;
  };

  return (
    <div>
        <Helmet>
            <title>NewsPro | Register</title>
        </Helmet>

        <div className="flex flex-col md:flex-row dark:bg-gray-700">
            <div className="w-full flex items-center justify-center">
            <Lottie animationData={loginImg} />
            </div>
            <div className='w-full flex justify-center items-center mt-5'>
                <div className="max-w-[400px] mx-auto p-8 bg-[#002147] bg-opacity-5 dark:bg-gray-400 rounded-xl">
                    <h2 className="text-4xl mb-4 font-merri text-[#002147] font-bold text-center">Create New Account</h2>
                    <form onSubmit={handleSubmit(onSubmit,onError)} className="space-y-4 mt-10">
                        <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                            {...register('name', { required: true })}
                            label="Name"
                            variant="outlined"
                            fullWidth
                            error={!!errors.name}
                            helperText={errors.name && 'Name is required'}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                            {...register('email', { required: true })}
                            label="Email"
                            variant="outlined"
                            fullWidth
                            error={!!errors.email}
                            helperText={errors.email && 'Email is required'}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                            {...register('password', { required: true, validate: isPasswordValid })}
                            label="Password"
                            variant="outlined"
                            fullWidth
                            type="password"
                            error={!!errors.password}
                            helperText={errors.password && errors.password.message}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                        <TextField
                            {...register('confirmPassword', {
                                required: 'Confirm Password is required',
                                validate: (value) => value === password || 'Passwords do not match',
                            })}
                            label="Confirm Password"
                            variant="outlined"
                            fullWidth
                            type="password"
                            error={!!errors.confirmPassword}
                            helperText={errors.confirmPassword?.message}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                            {...register('photoUrl')}
                            label="Photo URL"
                            variant="outlined"
                            fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                            {...register('phoneNumber')}
                            label="Phone Number"
                            variant="outlined"
                            fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                        <FormControl>
                            <FormLabel component="legend" id="demo-radio-buttons-group-label">
                                Gender
                            </FormLabel>
                            <RadioGroup
                                aria-label="gender"
                                name="gender"
                            >
                                <FormControlLabel value="female" control={<Radio />} {...register('gender')} label="Female" />
                                <FormControlLabel value="male" control={<Radio />} {...register('gender')} label="Male" />
                                <FormControlLabel value="other" control={<Radio />} {...register('gender')} label="Other" />
                            </RadioGroup>
                            </FormControl>
                        </Grid>
                        
                        <Grid item xs={12} sm={6}>
                            <TextField
                            {...register('address')}
                            label="Address"
                            variant="outlined"
                            fullWidth
                            multiline
                            rows={4}
                            />
                        </Grid>
                        </Grid>
                        <Button type="submit" variant="contained" color="primary" fullWidth style={{ backgroundColor: '#002147' }}>Register</Button>
                    </form>
                    <p className="mt-4 text-center text-sm">Already have an account? <Link className="text-[#002147] underline hover:font-bold" to={'/login'} state={{from:location.state.from}} replace={true}>Login</Link></p>
                    <SocialAccess></SocialAccess>
                </div> 
            </div>
        </div>
    </div>
  );
};

export default Register;
