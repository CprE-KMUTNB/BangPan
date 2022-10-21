import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'

const SmallC = () => {
    const [blogs, setBlogs] = useState([]);
    const [featuredBlog, setFeaturedBlog] = useState([]);

    useEffect (() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('${process.env.REACT_APP_API_URL}/api/blog/featured')
            }
            catch (err) {

            }
        }
        fetchData();
    })

};


export default SmallC