import React from 'react'
import { Typography } from 'antd';
import { Link } from 'react-router-dom'
import { Badge, Button, Card } from 'react-bootstrap'

const { Title } = Typography;

const notes =[
    {
        _id: '1',
        title: 'หัวข้อ1',
        content: 'รายละเอียดของหัวข้อ1',
        category: 'เสื้อผ้า'
    },
    {
        _id: '2',
        title: 'หัวข้อ2',
        content: 'รายละเอียดของหัวข้อ2',
        category: 'รองเท้า'
    }
]

const MyRequest = () => {

    const deleteHandler = (id) => {
        if (window.confirm('ยืนยันที่จะลบไหม?')) {

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
                                        {notes.title}
                                </span>
                                <div>
                                    <Button href={'/request/create'}>Edit</Button>
                                    <Button variant='danger' className='mx-2' onClick={() => deleteHandler(notes._id)}>
                                        Delete
                                    </Button>
                                </div>
                            </Card.Header>
                            <Card.Body>

                                <h5>
                                    <Badge variant='success' bg="info">
                                        Category - {notes.category}
                                    </Badge>
                                </h5>

                                <blockquote className="blockquote mb-0">
                                    <p>
                                        {notes.content}
                                    </p>
                                    <footer className="blockquote-footer">
                                        Create On - date
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