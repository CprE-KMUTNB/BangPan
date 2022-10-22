import React, { useState, useEffect } from 'react';
import { Link,useParams } from 'react-router-dom';
import axios from 'axios';

const BlogDetail = (props) => {
    
    const [blog, setBlog] = useState({});

    const { id_target } = useParams();

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    useEffect(() => {

        const fetchData = async () => {
            try {
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/Donationblogs/detail/`, { id_target }, config);
                setBlog(res.data);
            }
            catch (err) {

            }
        };

        fetchData();
    });

    const createBlog = () => {
        return {__html: blog.description}
    };



    return (
        <div className='container mt-3'>
            <h1 className='display-2'>{blog.name}</h1>
            <h2 className='text-muted mt-3'>Category: {blog.category}</h2>
            <h4>{blog.created}</h4>
            <div className='mt-5 mb-5' dangerouslySetInnerHTML={createBlog()} />
            <hr />
            <p className='lead mb-5'><Link to='/Donationblogs/' className='font-weight-bold'>Back to Blogs</Link></p>
        </div>
    );
};

export default BlogDetail;