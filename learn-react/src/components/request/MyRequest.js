import React from 'react'
import { Typography } from 'antd';
import { Link } from 'react-router-dom'
import { Button, Card } from 'react-bootstrap'

const { Title } = Typography;

const MyRequest = () => {
  return (
    <div style={{maxWidth:'900px', margin:'2rem auto'}}>
        <div style={{textAlign:'center', marginBottom:'2rem'}}>
            <Title level={2}>รายการคำขอบริจาค</Title>
        </div>

        <Link to='create'>
            <Button style={{marginLeft: 10, marginBottom: 6}} variant="outline-warning">สร้างคำขอรับบริจาค</Button>
        </Link>

        <Card style={{ margin: 10}}>
            <Card.Header style={{ display:'flex' }}>
                <span style={{ color:'black', textDecoration:'none', flex: 1, cursor:'pointer', alignSelf:'center', fontSize: 18 }}>
                    หัวข้อ
                </span>
                <div>
                    <Button variant='danger' className='mx-2'>Delete</Button>
                </div>
            </Card.Header>
        </Card>

    </div>
  )
}

export default MyRequest