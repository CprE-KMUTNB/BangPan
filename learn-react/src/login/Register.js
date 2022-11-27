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
import Cookies from 'js-cookie';
import axios from "axios";

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
    console.log(e)
    console.log(username)
    if (username === '') {
        
        MySwal.fire({
          html: <i>กรุณากรอกชื่อผู้ใช้</i>,
          icon: 'error'
        }).then((value) => {
          navigate('/register')
        })
    }

    else if(password.length < 6){
      MySwal.fire({
        html: <i>รหัสผ่านต้องมากกว่า 5 ตัวอักษร</i>,
        icon: 'error'
      }).then((value) => {
        navigate('/register')
      })
    }

    else if(password !== re_password){
      MySwal.fire({
        html: <i>รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน</i>,
        icon: 'error'
      }).then((value) => {
        navigate('/register')
      }) 
    }

    else if(password === re_password && password.length > 5 && username !== null){

      // register(username, password, re_password);
      const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        }
      };
      const body = JSON.stringify({ username, password, re_password });
      console.log(Cookies.get('csrftoken'))

      axios.post(`${process.env.REACT_APP_API_URL}/accounts/register/`, body, config).then(response=>{
        MySwal.fire({
          html: <i>สมัครสำเร็จ</i>,
          icon: 'success'
        }).then((value) => {
          navigate('/login')
        })
      }).catch(err=>{

          MySwal.fire({
            html: <i>{err.response.data.error}</i>,
            icon: 'error'
          }).then((value) => {
            navigate('/register')
          })

      })
    }
  };
    

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