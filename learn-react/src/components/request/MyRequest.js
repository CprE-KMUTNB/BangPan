import React, { useState, useEffect }from "react";
import { Typography } from 'antd';
import { Link } from 'react-router-dom';
import { Badge, Button, Card } from 'react-bootstrap';
import axios from 'axios';
import Cookies from "js-cookie";
import { useNavigate, redirect } from 'react-router-dom';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


const { Title } = Typography;

const MyRequest = () => {

    const navigate = useNavigate()
    const MySwal = withReactContent(Swal)
    const [notes, setBlogs] = useState([]);

    const config = {
        headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    };

    useEffect(() => {
        const fetchBlogs = async() => {
    
                try{
                    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/Donationblogs/write/`);
                    setBlogs(res.data);
                
                }
                catch(err){
    
                }
        }
        
        fetchBlogs ();
    },[]);
    
    console.log(notes)
    const deleteHandler = (id,e) => {

        e.preventDefault();
        if (window.confirm('ยืนยันที่จะลบไหม?')) {
            
            axios.delete(`${process.env.REACT_APP_API_URL}/api/Donationblogs/write/delete/${id}/`,config)
            .then(res => console.log('Deleted',res)).catch(err => console.log(err))

            MySwal.fire({
                html: <i>Delete Success</i>,
                icon: 'success'
              }).then((value) => {
                navigate('/request')
                window.location.reload();
              })
            
            
        }
    };

  return (
    <div style={{maxWidth:'1100px', margin:'2rem auto'}}>
        <div style={{textAlign:'center', marginBottom:'2rem'}}>
            <Title level={2}>รายการคำขอบริจาค</Title>
        </div>

        <Link to='create'>
            <Button style={{marginLeft: 10, marginBottom: 6}} variant="outline-warning">สร้างคำขอรับบริจาค</Button>
        </Link>
            {   notes.map((notes) => (

                        <Card style={{ margin: 10}}>
                            <Card.Header style={{ display:'flex' }}>
                                <span style={{ color:'black', textDecoration:'none', flex: 1, cursor:'pointer', alignSelf:'center', fontSize: 18 }}>
                                        {notes.name}
                                </span>
                                <div>
                                    <Button href={`/request/edit/${notes.id}`}>Edit</Button>
                                    <Button variant='danger' className='mx-2' onClick={(e) => deleteHandler(notes.id, e)}>
                                        Delete
                                    </Button>
                                </div>
                            </Card.Header>
                            <Card.Body>

                                <h5>
                                    <Badge variant='success' bg="info">
                                        Category - {notes.category_object} - {notes.category_user}
                                    </Badge>
                                </h5>

                                <blockquote className="blockquote mb-0">
                                    <p>
                                        {notes.description}
                                    </p>
                                    <footer className="blockquote-footer">
                                        Create On - date {notes.created.slice(0, 10)}
                                    </footer>
                                </blockquote>
                            </Card.Body>
                        </Card>

                ))
            }

    </div>
  )
}

export default MyRequest