import React, { useState, useEffect }from "react";
import axios from 'axios'
import { Link } from "react-router-dom";

const Adult = () => {

    const [donationblogs, setBlogs] = useState([]);
    const [donationfeaturedBlog, setFeaturedBlog] = useState([]);
    const [categoryfeaturedBlog, setcategory] = useState([]);

    useEffect(() => {

        const fetchData = async() => {
                try{
                    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/Donationblogs/featured/`);
                    setFeaturedBlog(res.data[0]);
                    console.log(res.data)
                }
                catch(err){

                }
        }
        
        fetchData();
    },[]);

    useEffect(() => {
        const fetchBlogs = async() => {

                try{
                    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/Donationblogs/`);
                    setBlogs(res.data);
                }
                catch(err){

                }
        }
        
        fetchBlogs ();
    },[]);

    useEffect(() => {
        const fetchBlogs = async() => {

                try{
                    const res = await axios.get(`/${process.env.REACT_APP_API_URL}/api/Donationblogs/All_category/`);
                    setcategory(res.data);
                }
                catch(err){

                }
        }
        
        fetchBlogs ();
    },[]);

    const getBlogs = () => {
        let list = [];
        let result = [];

        donationblogs.map(donationblogPost => {
            return list.push(
                <div className="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                    <div className="col p-4 d-flex flex-column position-static">
                        <strong className="d-inline-block mb-2 text-primary">{donationblogPost.category}</strong>
                        <h3 className="mb-0">{donationblogPost.name}</h3>
                        <div className="mb-1 text-muted">{donationblogPost.created}</div>
                        <p className="card-text mb-auto">{donationblogPost.description}</p>
                        <Link to={`/Donationblogs/${donationblogPost.id}`} className="stretched-link">Continue reading</Link>
                    </div>
                    <div className="col-auto d-none d-lg-block">
                        <img width='200' height='250' src={donationblogPost.image} alt='image' />
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
            

            <div className="nav-scroller py-1 mb-2">
                <nav className="nav d-flex justify-content-start">

                    <Link className="p-2 text-muted" to='/category/2'>เสื้อผ้า</Link>
                    <Link className="p-2 text-muted" to='/category/3'>รองเท้า</Link>
                    <Link className="p-2 text-muted" to='/category/4'>ของใช้</Link>
                    <Link className="p-2 text-muted" to='/category/5'>อาหารและยา</Link>
                    <Link className="p-2 text-muted" to='/category/6'>เงินบริจาค</Link>

                </nav>
            </div>
            
            <div className="jumbotron p-4 p-md-5 text-white rounded bg-info">
                <div className="col-md-6 px-0">
                    <h1 className="display-4 font-italic">{donationfeaturedBlog.name}</h1>
                    <p className="lead my-3">{donationfeaturedBlog.created}</p>
                    <p className="lead mb-0">
                        {/*<Link to={`/Donationblogs/${donationfeaturedBlog.slug}`} className="text-white font-weight-bold">
                            Continue reading...
                        </Link>*/}
                        <h1 style={{color:'#fff'}}>หมวดหมู่คนชรา</h1>
                    </p>
                </div>
            </div>

            {getBlogs()}
        </div>
    );
};

export default Adult ;