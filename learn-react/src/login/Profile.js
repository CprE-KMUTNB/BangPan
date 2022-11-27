import {useState, useEffect} from 'react';
import { Typography } from 'antd';

import { connect } from 'react-redux';
import { update_profile } from '../actions/profile'

import { useNavigate} from 'react-router-dom';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const { Title } = Typography;

const Profile = ({
    update_profile,
    first_name_global,
    last_name_global,
    phone_global,
    city_global,
    email_global,

}) => {
  const [profileUpdated, setProfileUpdated] = useState(false);
  const [formData, setFormData] = useState({
      first_name: '',
      last_name: '',
      phone: '',
      city: '',
      email:''
  });

  const { first_name, last_name, phone, city, email } = formData;

  useEffect(() => {
    setFormData({
      first_name: first_name_global,
      last_name: last_name_global,
      phone: phone_global,
      city: city_global,
      email: email_global
    });
  }, [first_name_global]);
  
  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const navigate = useNavigate();
  const MySwal = withReactContent(Swal)

  const onSubmit = e => {
    e.preventDefault();

    const updateProfile = async () => {
      update_profile(first_name, last_name, phone, city, email);
      setProfileUpdated(!profileUpdated);
    };
    updateProfile();

    MySwal.fire({
      html: <i>แก้ไขข้อมูลสำเร็จ</i>,
      icon: 'success'
    }).then((value) => {
      navigate('/')
      window.location.reload();
  });
  };

  return (
    <div style={{maxWidth:'300px', margin:'2rem auto'}}>
      <div style={{textAlign:'center', marginBottom:'2rem'}}>
          <Title level={2}>ข้อมูลบัญชีผู้ใช้</Title>
      </div>

      <div className='container'>
          <form onSubmit={e => onSubmit(e)}>
            <div className='form-group'>
              <label className='form-label' htmlFor='first_name'>ชื่อ</label>
              <input
                  className='form-control'
                  type='text'
                  name='first_name'
                  placeholder={`${first_name_global}`}
                  onChange={e => onChange(e)}
                  value={first_name}
              />
            </div>

            <div className='form-group'>
              <label className='form-label mt-3' htmlFor='first_name'>นามสกุล</label>
              <input
                  className='form-control'
                  type='text'
                  name='last_name'
                  placeholder={`${last_name_global}`}
                  onChange={e => onChange(e)}
                  value={last_name}
              />
            </div>

            <div className='form-group'>
              <label className='form-label mt-3' htmlFor='first_name'>เบอร์โทร</label>
              <input
                  className='form-control'
                  type='text'
                  name='phone'
                  placeholder={`${phone_global}`}
                  onChange={e => onChange(e)}
                  value={phone}
              />
            </div>

            <div className='form-group'>
              <label className='form-label mt-3' htmlFor='first_name'>ที่อยู่</label>
              <input
                  className='form-control'
                  type='text'
                  name='city'
                  placeholder={`${city_global}`}
                  onChange={e => onChange(e)}
                  value={city}
              />
            </div>

            <div className='form-group'>
              <label className='form-label mt-3' htmlFor='first_name'>อีเมล</label>
              <input
                  className='form-control'
                  type='text'
                  name='email'
                  placeholder={`${email_global}`}
                  onChange={e => onChange(e)}
                  value={email}
              />
            </div>

            <button className='btn btn-primary mt-3' type='submit'>อัปเดตข้อมูล</button>
          </form>
      </div>
        
    </div>
  )
}

const mapStateToProps = state => ({
    first_name_global: state.profile.first_name,
    last_name_global: state.profile.last_name,
    phone_global: state.profile.phone,
    city_global: state.profile.city,
    email_global: state.profile.email,
});

export default connect(mapStateToProps, { update_profile }) (Profile);