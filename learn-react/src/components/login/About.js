import React from 'react'
import { Typography } from 'antd';
import { Form } from 'react-bootstrap'


const { Title } = Typography;


const About = () => {
  return (
    <div style={{maxWidth:'300px', margin:'2rem auto'}}>
        <div style={{textAlign:'center', marginBottom:'2rem'}}>
            <Title level={2}>ข้อมูลบัญชีผู้ใช้</Title>
        </div>

        <Form.Group className="mb-3">
            <Form.Label>ชื่อ</Form.Label>
            <Form.Control placeholder="Hello" disabled />
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>นามสกุล</Form.Label>
            <Form.Control placeholder="World" disabled />
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control placeholder="World" disabled />
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>Username</Form.Label>
            <Form.Control placeholder="World" disabled />
        </Form.Group>
        <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control placeholder="World" disabled />
        </Form.Group>
    </div>
  )
}

export default About