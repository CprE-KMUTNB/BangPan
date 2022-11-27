import React from 'react'
import { useState } from 'react';
import { useNavigate, redirect } from 'react-router-dom';

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

import { connect } from 'react-redux';
import { login } from '../actions/auth';
import CSRFToken from '../components/CSRFToken';

const Login = ({login, isAuthenticated}) => {
  const navigate = useNavigate()
  const MySwal = withReactContent(Swal)

  const [formData, setFormData] = useState({
    username:'',
    password:''
  });

  const { username, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();

    login(username, password)
    console.log(login)
    if (isAuthenticated) {
      MySwal.fire({
        html: <i>Login Success</i>,
        icon: 'success'
      }).then((value) => {
        navigate('/')
      })
      console.log(isAuthenticated)
    }
  else {

    MySwal.fire({
      html: <i>loading</i>,
      icon: 'Spin'
    })

    MySwal.fire({
      html: <i>Fail</i>,
      icon: 'error'
    }).then((value) => {
      navigate('/login')
    })
  }
  
  };

  if (isAuthenticated) {
    MySwal.fire({
      html: <i>Login Success</i>,
      icon: 'success'
    }).then((value) => {
      navigate('/')
    })
    console.log(isAuthenticated)
  }

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
            Login
          </Typography>
          <Box component="form" onSubmit={e => onSubmit(e)} noValidate sx={{ mt: 1 }}>
            <CSRFToken />
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              value={username} 
              onChange={e => onChange(e)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password} 
              onChange={e => onChange(e)}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Grid container>
              <Grid item xs>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Register"}
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

export default connect(mapStateToPorps, { login }) (Login);