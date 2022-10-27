import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link,useParams } from 'react-router-dom';

const Category = (props) => {
    const [blogs, setBlogs] = useState([]);
    const [currentCategory, setCurrentCategory] = useState('');
    const { category_target } = useParams();

    useEffect(() => {
            
        setCurrentCategory(category_target);

        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        };

        const fetchData = async () => {
            try {
                const res = await axios.post(`${process.env.REACT_APP_API_URL}/api/Donationblogs/category/`, { category_target }, config);
                setBlogs(res.data);
            }
            catch (err) {

            }
        };

        fetchData();
    });

    const getCategoryBlogs = () => {
        let list = [];
        let result = [];

        blogs.map(blogPost => {
            return list.push(
                <div className="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                    <div className="col p-4 d-flex flex-column position-static">
                        <strong className="d-inline-block mb-2 text-primary">{blogPost.category}</strong>
                        <h3 className="mb-0">{blogPost.name}</h3>
                        <div className="mb-1 text-muted">{blogPost.created}</div>
                        <p className="card-text mb-auto">{blogPost.description}</p>
                        <Link to={`/Donationblogs/${blogPost.slug}`} className="stretched-link">Continue reading</Link>
                    </div>
                    <div className="col-auto d-none d-lg-block">
                        <img width='200' height='250' src={blogPost.image} alt='error' />
                    </div>
                </div>
            );
        });

        for (let i = 0; i < list.length; i += 2) {
            result.push(
                <div key={i} className='row mb-2'>
                    <div className='col-md-6'>
                        {list[i]}
                    </div>
                    <div className='col-md-6'>
                        {list[i+1] ? list[i+1] : null}
                    </div>
                </div>
            )
        }

        return result;
    };

    return (
        <div className='container mt-3'>
            <h3 className='display-4'>{currentCategory}</h3>
            <div className="nav-scroller py-1 mb-2">
                <nav className="nav d-flex justify-content-start">

                    <Link className="p-2 text-muted" to='/category_object/เสื้อผ้า'>เสื้อผ้า</Link>
                    <Link className="p-2 text-muted" to='/category_object/รองเท้า'>รองเท้า</Link>
                    <Link className="p-2 text-muted" to='/category_object/ของใช้'>ของใช้</Link>
                    <Link className="p-2 text-muted" to='/category_object/อาหารและยา'>อาหารและยา</Link>
                    <Link className="p-2 text-muted" to='/category_object/เงินบริจาค'>เงินบริจาค</Link>
                
                </nav>
            </div>
            {getCategoryBlogs()}
        </div>
    );
};

export default Category;