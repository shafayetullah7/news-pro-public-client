import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useState } from 'react';
import { TextField, Button, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

import loginImg from '../../assets/loginImg.json'
import Lottie from "lottie-react";
import { Link } from "react-router-dom";
import SocialAccess from "./SocialAccess";


const Login = () => {

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const onSubmit = (data) => {
        // Handle login logic here
        console.log(data);
    };
    return (
        <div>
            <Helmet>
                <title>NewsPro | Login</title>
            </Helmet>

            <div className="flex flex-col md:flex-row">
                <div className="w-full flex items-center justify-center">
                <Lottie animationData={loginImg} />
                </div>

                <div className="w-full flex justify-center items-center">
                    <div className="flex flex-col items-center max-w-[400px] bg-[#002147] bg-opacity-5 px-10 py-20 rounded-xl">
                        <h2 className="text-4xl mb-4 font-merri text-[#002147] font-bold text-center">Login to Your Account</h2>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 mt-10">
                            <TextField
                            {...register('email', { required: true })}
                            label="Email"
                            variant="outlined"
                            fullWidth
                            error={!!errors.email}
                            helperText={errors.email && 'Email is required'}
                            />
                            <TextField
                            {...register('password', { required: true })}
                            label="Password"
                            variant="outlined"
                            fullWidth
                            type={showPassword ? 'text' : 'password'}
                            error={!!errors.password}
                            helperText={errors.password && 'Password is required'}
                            InputProps={{
                                endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton onClick={handleShowPassword} edge="end">
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                                ),
                            }}
                            />
                            <Button type="submit" variant="contained" color="primary" fullWidth style={{ backgroundColor: '#002147' }}>
                            Login
                            </Button>
                        </form>
                        <p className="mt-4">
                            Don't have an account? <Link className="text-[#002147] underline hover:font-bold" to={'/register'} replace={true}>Register Now</Link>
                        </p>
                        <SocialAccess></SocialAccess>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;