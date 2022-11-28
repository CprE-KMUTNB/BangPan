import React, { useState, useEffect } from 'react';
import { Link,useParams } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { AiFillCalendar,AiFillAppstore,AiFillEye,AiFillTags
,AiFillCaretRight,AiOutlineAim,AiOutlineUser} from "react-icons/ai";
import { Typography } from 'antd';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const { Title } = Typography;

const BlogDetail = (props) => {
    
    const [blog, setBlog] = useState({});

    const { id_target } = useParams();

    const config = {
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'X-CSRFToken': Cookies.get('csrftoken')
        }
    };

    const fetchData = async () => {
                const res = 
                axios
                .put(`${process.env.REACT_APP_API_URL}/api/Donationblogs/detail/`, { id_target }, config)
                .then(res => { setBlog(res.data[0])})
                
        };
    console.log(blog)

    useEffect(()=>{
            fetchData()
          },[])

    const createBlog = () => {
        return {__html: "<b>รายละเอียดคำขอรับบริจาค : </b>" + blog.description}
    };

    const MySwal = withReactContent(Swal)

    const onSubmit = e => {
        e.preventDefault();
        axios.put(`${process.env.REACT_APP_API_URL}/api/Donationblogs/report/`, { id_target }, config)

        MySwal.fire({
            html: <i>รายงานสำเร็จ</i>,
            icon: 'success'
        })
    };

    return (
        <div style={{maxWidth:'1100px', margin:'2rem auto'}}>
            <div style={{textAlign:'center', marginBottom:'2rem'}}>
                <Title level={2}>ข้อมูลคำขอรับบริจาค</Title>
            </div>

            <div className='container mt-3'>
                <h1 className='display-2'>{blog.name}</h1>
                <hr />
                <h2 className='text-muted mt-3'><AiFillTags/>หมวดหมู่ : - {blog.category_object} - {blog.category_user}</h2>
                <h6><AiFillCalendar/> <b>สร้างคำขอเมื่อ :</b> {String(blog.created).slice(0, 10)}  &nbsp; &nbsp; <AiFillEye/><b>ยอดเข้าชม : </b>{blog.views}
                &nbsp; &nbsp; <AiOutlineUser/> <b>จำนวนที่รับบริจาค : </b> {blog.Amount_requested}
                </h6>
                {/* <b>ผู้เขียนคำขอรับบริจาค : </b>{blog.write.username}&nbsp; &nbsp; */}
                <div className="col-auto d-none d-lg-block">
                    <img width='200' height='250' src={`${process.env.REACT_APP_API_URL}/${blog.image}`} alt='image' />
                </div>
                <div className='mt-5 mb-5' dangerouslySetInnerHTML={createBlog()} />
                <p><AiOutlineAim/>&nbsp;<b>เหตุผลที่ขอรับบริจาค</b> : {blog.reason}</p>
                <p><AiOutlineAim/>&nbsp;<b>สถานที่รับบริจาค</b> : {blog.location}</p>
                <hr />
                <p className='lead mb-5'><Link to='/' className='font-weight-bold'>ย้อนกลับ</Link></p>

                <button className='btn btn-danger mt-3' type='submit' onClick={onSubmit}>รายงาน</button>
            </div>
        </div>
    );
};

export default BlogDetail;