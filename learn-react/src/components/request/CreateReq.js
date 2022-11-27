import React, {useState} from 'react';
import 'antd/dist/antd.min.css';
import { Typography, Button, Form, Input } from 'antd';
import axiosInstance from 'axios';
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';

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
    {key:4, value:'คนพิการ'}
]

function CreateReq() {

    const initialFormData = Object.freeze({
		name: '',
		description: '',
		reason: '',
		location: '',
        Amount_requested: '',
        category_object: '',
        category_user: ''
	});
    
    const [postData, updateFormData] = useState(initialFormData);
	const [postimage, setPostImage] = useState(null);

	const handleChange = (e) => {
        console.log(e)
		if ([e.target.name] == 'image') {
			setPostImage({
				image: e.target.files,
			});
			console.log(e.target.files);
		}
		if ([e.target.name] == 'title') {
			updateFormData({
				...postData,
				[e.target.name]: e.target.value.trim(),
			});
		} else {
			updateFormData({
				...postData,
				[e.target.name]: e.target.value.trim(),
			});
		}
	};

    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    };

    const navigate = useNavigate();
    const MySwal = withReactContent(Swal)

    const handleSubmit = (e) => {
		e.preventDefault();
        if (postData.name !== null && 
            postData.description !== null &&
            postData.reason !== null &&
            postData.location !== null &&
            postData.Amount_requested !== null &&
            postData.category_object !== null &&
            postData.category_user !== null &&
            postimage !== null) {

            let formData = new FormData();
            formData.append('name', postData.name);
            formData.append('description', postData.description);
            formData.append('reason', postData.reason);
            formData.append('location', postData.location);
            formData.append('Amount_requested', postData.Amount_requested);
            formData.append('category_object', postData.category_object);
            formData.append('category_user', postData.category_user);
            formData.append('image', postimage.image[0]);
            axiosInstance.post(`${process.env.REACT_APP_API_URL}/api/Donationblogs/write/build/`, formData, config);

            MySwal.fire({
                html: <i>สร้างคำขอสำเร็จ</i>,
                icon: 'success'
            }).then((value) => {
                navigate('/request')
                window.location.reload();
            });
        } else {
            MySwal.fire({
                html: <i>กรุณาใส่ข้อมูลให้ครบถ้วน</i>,
                icon: 'error'
            });
        }
	};

  return (
    <div style={{maxWidth:'700px', margin:'2rem auto'}}>
        <div style={{textAlign:'center', marginBottom:'2rem'}}>
            <Title level={2}>สร้างคำขอรับบริจาค</Title>
        </div>

        <Form onSubmit>

            <br />
            <br />
            <label>เลือกไฟล์ภาพ</label>
            <Input type='file' accept="image/*" onChange={handleChange} id="image" name="image"/>

            <br />
            <br />
            <label>หัวข้อ</label>
            <Input onChange={handleChange} id='name' name="name" />

            <br />
            <br />
            <label>ข้อมูลเพิ่มเติม</label>
            <TextArea onChange={handleChange} id='description' name="description"/>

            <br />
            <br />
            <label>เหตุผลที่ขอรับบริจาค</label>
            <TextArea onChange={handleChange} id='reason' name="reason"/>

            <br />
            <br />
            <label>ที่อยู่/ที่ตั้ง</label>
            <TextArea onChange={handleChange} id='location' name="location"/>

            <br />
            <br />
            <label>จำนวนที่ต้องการ</label>
            <Input type='number' min="0" onChange={handleChange} id='Amount_requested' name="Amount_requested"/>

            <br />
            <br />
            <select onChange={handleChange} id='category_object' name="category_object">
                {Continents.map(item => (
                    <option key={item.key} value={item.value}>
                        {item.value}
                    </option>
                ))}
            </select>

            <br />
            <br />
            <select onChange={handleChange} id='category_user' name="category_user">
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

export default CreateReq