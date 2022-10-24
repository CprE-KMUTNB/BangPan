import {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { Typography } from 'antd';
import { Form } from 'react-bootstrap'

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const { Title } = Typography;

function Profile() {
  const navigate = useNavigate()
  const MySwal = withReactContent(Swal)

  const [isLoaded, setIsLoaded] = useState(true);
  const [user, setUser] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token')
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + token);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow'
    };

    fetch("https://www.melivecode.com/api/auth/user", requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.status === 'ok') {
          setUser(result.user)
          setIsLoaded(false)
        } else if (result.status === 'forbidden') {
          MySwal.fire({
            html: <i>{result.message}</i>,
            icon: 'error'
          }).then((value) => {
            navigate('/login')
          })
        }
        console.log(result)
      })
      .catch(error => console.log('error', error));
  }, [])

  const logout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  if (isLoaded) return (<div>Loading</div>)
  else {
    return (
      <div style={{maxWidth:'300px', margin:'2rem auto'}}>
        <div style={{textAlign:'center', marginBottom:'2rem'}}>
            <Title level={2}>ข้อมูลบัญชีผู้ใช้</Title>
        </div>

        <Form.Group className="mb-3">
            <Form.Label>ชื่อ</Form.Label>
            <Form.Control placeholder={user.fname} disabled />
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>นามสกุล</Form.Label>
            <Form.Control placeholder={user.lname} disabled />
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control placeholder={user.email} disabled />
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control placeholder={user.username} disabled />
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control placeholder={user.password} disabled />
        </Form.Group>
        <div><button onClick={logout} type="button" className="btn btn-outline-danger">Logout</button></div>
        
    </div>
    )
  }
}

export default Profile