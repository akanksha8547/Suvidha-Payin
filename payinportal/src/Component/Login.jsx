import React, { useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { FilledInput } from '@mui/material';
import Routes from '../Routers/Routes';
import { useNavigate } from 'react-router-dom';
import $ from 'jquery';
import 'parsleyjs';

export default function Login() {
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const navigate = useNavigate();

    const formRef = useRef(null);

    useEffect(() => {
        const $form = $(formRef.current);
        $form.parsley();
    }, []);

    const validateField = (event) => {
        const $field = $(event.target);
        $field.parsley().validate();
    };

    const validateForm = (route) => {
        const $form = $(formRef.current);
        if ($form.parsley().isValid()) {
            alert('Form is valid!');
            navigate(route);
        } else {
            alert('Form is invalid, please check the fields.');
        }
    };
    return (<>
        <main className="main-content  mt-0">
            <div className="page-header align-items-start min-vh-100" 
                style={{ backgroundImage: "url('https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80')" }}>
                <span className="mask bg-gradient-dark opacity-6"></span>
                <div className="container my-auto">
                    <div className="row">
                        <div className="col-lg-4 col-md-8 col-12 mx-auto">
                            <div className="card z-index-0 fadeIn3 fadeInBottom">
                                <div className="card-header p-0 position-relative mt-n4 mx-3 z-index-2">
                                    <div className="bg-gradient-primary shadow-primary border-radius-lg py-3 pe-1">
                                        <div className="text-center">
                                            <img src="/img/payin-logo.png" alt="main_logo" />
                                        </div>
                                        <h6 className="text-white font-weight-bolder text-center mt-2 mb-0">Log in and Stay Connected</h6>
                                    </div>
                                </div>
                                <div className="card-body">
                                    <p className="p">
                                        Our secure login process ensures the confidentiality of your information. 
                                        Log in today and stay connected to your finances, anytime and anywhere.
                                    </p>
                                    <form ref={formRef} role="form" className="text-start mt-4" data-parsley-validate>
                                        {/* <div className="input-group input-group-outline my-3">
                                            <label className="form-label">Mobile</label>
                                            <input type="email" className="form-control" />
                                        </div> */}
                                        <Box sx={{width: 500, maxWidth: '100%'}} className="input-group my-3">
                                            <TextField label="Mobile" id="Mobile" className="form-control" variant="filled" 
                                            required data-parsley-required onBlur={validateField}/>
                                        </Box>
                                        {/* <div className="input-group input-group-outline mb-3">
                                            <label className="form-label">Password</label>
                                            <input type="password" className="form-control" />
                                        </div> */}
                                        <FormControl sx={{ width: 500, maxWidth: '100%' }} variant="filled" className="mb-3" 
                                            required data-parsley-required onBlur={validateField}>
                                            <InputLabel htmlFor="password">Password</InputLabel>
                                            <FilledInput id="password" type={showPassword ? 'text' : 'password'}
                                                endAdornment={ <InputAdornment position="end">
                                                    <IconButton aria-label="toggle password visibility" 
                                                        onClick={handleClickShowPassword} onMouseDown={handleMouseDownPassword} edge="end">
                                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                                    </IconButton>
                                                </InputAdornment> }>
                                            </FilledInput>
                                        </FormControl>
                                        <div className="d-flex align-items-center mb-3">
                                            <a className="form-check-label mb-0" href='#'>Forgot Password?</a>
                                        </div>
                                        <div className="text-center">
                                            <button type="button" className="btn bg-gradient-primary w-100 mt-2 mb-2" 
                                                onClick={() => validateForm(Routes.DASHBOARD)}lick>Login Now</button>
                                        </div>
                                        <p className="mt-4 text-sm text-center">
                                            Don't have an account? &nbsp;
                                            <a href="#" className="text-primary text-gradient font-weight-bold">Sign up</a>
                                        </p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <footer className="footer position-absolute bottom-2 py-2 w-100">
                    <div className="container">
                        <div className="row align-items-center justify-content-lg-between">
                            <div className="col-12 col-md-6 my-auto">
                                <div className="copyright text-center text-sm text-white text-lg-start">
                                    © {(new Date().getFullYear())}, made with &nbsp;
                                    <i className="fa fa-heart"></i> by &nbsp;
                                    <a href="https://suvidhaabnk.com" className="font-weight-bold text-white" target="_blank">Suvidha Bnk</a>
                                    &nbsp; for a better web experience.
                                </div>
                            </div>
                            <div className="col-12 col-md-6">
                                <ul className="nav nav-footer justify-content-center justify-content-lg-end">
                                    <li className="nav-item">
                                        <a href="https://suvidhaabnk.com" className="nav-link text-white" target="_blank">Suvidha Bnk</a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="https://suvidhaabnk.com/about-us" className="nav-link text-white" target="_blank">About Us</a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="https://suvidhaabnk.com/contact" className="nav-link text-white" target="_blank">Contact Us</a>
                                    </li>
                                    {/* <li className="nav-item">
                                        <a href="https://www.creative-tim.com/license" className="nav-link pe-0 text-white" target="_blank">License</a>
                                    </li> */}
                                </ul>
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
        </main>
    </>)
}