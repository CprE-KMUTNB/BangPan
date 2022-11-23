import { useState } from 'react';
import { AxiosInstance } from 'axios';
import { useNavigate, redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { register } from '../actions/auth'
import CSRFToken from '../components/CSRFToken';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';

const Register = ({ register, isAuthenticated }) => {
  const navigate = useNavigate()
  const MySwal = withReactContent(Swal)

  const [formData, setFormData] = useState({
    username:'',
    password:'',
    re_password:''
  });

  const [accountCreated, setAccountCreated] = useState(false);

  const { username, password, re_password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();

    if (password === re_password) {
        register(username, password, re_password);
        setAccountCreated(true);
    }
  };

  if (accountCreated) {
      MySwal.fire({
        html: <i>Register Success</i>,
        icon: 'success'
      }).then((value) => {
        navigate('/login')
      })
    }

  {/*
    const navigate = useNavigate()
    const MySwal = withReactContent(Swal)

    const initialFormData = Object.freeze({
        username: '',
        password: '',
        re_password: '',
    });

    const [formData, updateFormData] = useState(initialFormData);

    const handleChange = (e) => {
        updateFormData({
          ...formData,
          [e.target.name]: e.target.value.trim(),
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        
        axiosInstance
            .post(``)
    */}

  return (
    <div>
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Box component="form" noValidate onSubmit={e => onSubmit(e)} sx={{ mt: 3 }}>
            <CSRFToken />
            <Grid container spacing={2}>
              {/*<Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="fname"
                  required
                  fullWidth
                  id="fname"
                  label="First Name"
                  autoFocus
                  value={inputs.fname || ""} 
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lname"
                  label="Last Name"
                  name="lname"
                  autoComplete="family-name"
                  value={inputs.lname || ""} 
                  onChange={handleChange}
                />
              </Grid>*/}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  value={username} 
                  onChange={e => onChange(e)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password} 
                  onChange={e => onChange(e)}
                />
              </Grid>
              {/*<Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  value={inputs.email || ""} 
                  onChange={handleChange}
                />
            </Grid>*/}
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="re_password"
                  label="Confirm password"
                  name="re_password"
                  type="password"
                  autoComplete="re_password"
                  value={re_password} 
                  onChange={e => onChange(e)}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Register
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Login
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </div>
  )
}

const mapStateToPorps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToPorps, { register }) (Register);