import {useState, useEffect} from 'react';
import { Typography } from 'antd';
import { Form, Button } from 'react-bootstrap';

import { connect } from 'react-redux';
import { update_profile } from '../actions/profile'


const { Title } = Typography;

const Profile = ({
    update_profile,
    first_name_global,
    last_name_global,
    phone_global,
    city_global
}) => {
  const [formData, setFormData] = useState({
      first_name: '',
      last_name: '',
      phone: '',
      city: ''
  });

  const { first_name, last_name, phone, city } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();

    update_profile(first_name, last_name, phone, city);

  };

  return (
    <div style={{maxWidth:'300px', margin:'2rem auto'}}>
      <div style={{textAlign:'center', marginBottom:'2rem'}}>
          <Title level={2}>ข้อมูลบัญชีผู้ใช้</Title>
      </div>

      <Form onSubmit={e => onSubmit(e)}>
        <Form.Group className="mb-3">
          <Form.Label>First Name</Form.Label>
          <Form.Control type="text" name='first_name' placeholder={`${first_name_global}`} onChange={e => onChange(e)} value={first_name}/>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Last Name</Form.Label>
          <Form.Control type="text" name='last_name' placeholder={`${last_name_global}`} onChange={e => onChange(e)} value={last_name}/>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Phone</Form.Label>
          <Form.Control type="text" name='phone' placeholder={`${phone_global}`} onChange={e => onChange(e)} value={phone}/>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>City</Form.Label>
          <Form.Control type="text" name='city' placeholder={`${city_global}`} onChange={e => onChange(e)} value={city}/>
        </Form.Group>

        <Button variant="primary" type="submit">
          Update
        </Button>
      </Form>
        
    </div>
  )
}

const mapStateToProps = state => ({
    first_name_global: state.profile.first_name,
    last_name_global: state.profile.last_name,
    phone_global: state.profile.phone,
    city_global: state.profile.city,
});

export default connect(mapStateToProps, { update_profile }) (Profile);