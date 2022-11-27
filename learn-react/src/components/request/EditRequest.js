import React, { useState, useEffect } from 'react';
import 'antd/dist/antd.min.css';
import { Typography, Button, Form, Input } from 'antd';
import axiosInstance from 'axios';
import Cookies from "js-cookie";
import { useNavigate, useParams } from 'react-router-dom';

import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const { Title } = Typography;
const { TextArea } = Input;

const Continents = [
    {key:1, value:'เสื้อผ้า'},
    {key:2, value:'รองเท้า'},
    {key:3, value:'ของใช้'},
    {key:4, value:'อาหารและยา'},
    {key:5, value:'เงินบริจาค'}
]

const Category = [
    {key:1, value:'เด็กเล็ก'},
    {key:2, value:'เด็กโต'},
    {key:3, value:'คนชรา'},
    {key:4, value:'คนพิการ'},
]

function EditRequest() {

    const { id } = useParams();

    const initialFormData = Object.freeze({
        id: '',
        image: '',
		name: '',
		description: '',
		reason: '',
		location: '',
        Amount_requested: '',
        category_object: '',
        category_user: ''
	});

    const config = {
        headers: {
            'Accept': '*/*',
            'Content-Type': 'multipart/form-data',
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    };

    const [formData, updateFormData] = useState(initialFormData);
    const [formImage, updateFormImage] = useState(null);

    useEffect(() => {
		axiosInstance.get(`${process.env.REACT_APP_API_URL}/api/Donationblogs/write/detail_view/?search=${id}`, config).then((res) => {
			updateFormData({
				...formData,
				['name']: res.data[0].name,
				['description']: res.data[0].description,
				['reason']: res.data[0].reason,
				['location']: res.data[0].location,
                ['Amount_requested']: res.data[0].Amount_requested,
                ['category_object']: res.data[0].category_object,
                ['category_user']: res.data[0].category_user,
			});
			console.log(res.data);
		});
	}, [updateFormData]);

    const handleChange = (e) => {
        if ([e.target.name] == 'image') {
			updateFormImage({
				image: e.target.files,
			});
		} else {
            updateFormData({
                ...formData,
                [e.target.name]: e.target.value.trim(),
            });
        };
	};

    const navigate = useNavigate();
    const MySwal = withReactContent(Swal)

    const handleSubmit = (e) => {
		e.preventDefault();
		console.log(formData);
        console.log(formImage);
        if (formImage !== null) {
            axiosInstance.put(`${process.env.REACT_APP_API_URL}/api/Donationblogs/write/update/${id}/`, {
                'image': formImage.image[0],
                'name': formData.name,
                'description': formData.description,
                'reason': formData.reason,
                'location': formData.location,
                'Amount_requested': formData.Amount_requested,
                'category_object': formData.category_object,
                'category_user': formData.category_user
            }, config);

            MySwal.fire({
                html: <i>แก้ไขคำขอสำเร็จ</i>,
                icon: 'success'
            }).then((value) => {
                navigate('/request')
                window.location.reload();
            });
        } else {
            MySwal.fire({
                html: <i>กรุณาเลือกรูปภาพ</i>,
                icon: 'error'
            });
        };
	};

  return (
    <div style={{maxWidth:'700px', margin:'2rem auto'}}>
        <div style={{textAlign:'center', marginBottom:'2rem'}}>
            <Title level={2}>แก้ไขคำขอรับบริจาค</Title>
        </div>

        <Form onSubmit>

            <br />
            <br />
            <label>เลือกไฟล์ภาพ</label>
            <label className="text-danger">*กรุณาเลือกไฟล์ภาพ*</label>
            <Input type='file' accept="image/*" onChange={handleChange} id="image" name="image"/>

            <br />
            <br />
            <label>หัวข้อ</label>
            <Input onChange={handleChange} id='name' name="name" value={formData.name}/>

            <br />
            <br />
            <label>ข้อมูลเพิ่มเติม</label>
            <TextArea onChange={handleChange} id='description' name="description" value={formData.description}/>

            <br />
            <br />
            <label>เหตุผลที่ขอรับบริจาค</label>
            <TextArea onChange={handleChange} id='reason' name="reason" value={formData.reason}/>

            <br />
            <br />
            <label>ที่อยู่/ที่ตั้ง</label>
            <TextArea onChange={handleChange} id='location' name="location" value={formData.location}/>

            <br />
            <br />
            <label>จำนวนที่ต้องการ</label>
            <Input type='number' min="0" onChange={handleChange} id='Amount_requested' name="Amount_requested" value={formData.Amount_requested}/>

            <br />
            <br />
            <select onChange={handleChange} id='category_object' name="category_object" value={formData.category_object}>
                {Continents.map(item => (
                    <option key={item.key} value={item.value}>
                        {item.value}
                    </option>
                ))}
            </select>

            <br />
            <br />
            <select onChange={handleChange} id='category_user' name="category_user" value={formData.category_user}>
                {Category.map(item => (
                    <option key={item.key} value={item.value}>
                        {item.value}
                    </option>
                ))}
            </select>

            <br />
            <br />
            <Button type='submit' onClick={handleSubmit}>
                ยืนยัน
            </Button>

        </Form>

    </div>
  )
}

export default EditRequest