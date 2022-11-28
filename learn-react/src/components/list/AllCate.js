import React, { useState, useEffect }from "react";
import axios from 'axios'
import { Link } from "react-router-dom";
import { Card, Button } from 'react-bootstrap'
import { AiFillCalendar,AiFillAppstore,AiFillEye,AiFillTags
    ,AiFillCaretRight,AiOutlineAim,AiFillTag} from "react-icons/ai";

const AllCate = () => {

    const [donationblogs, setBlogs] = useState([]);
    const [donationfeaturedBlog, setFeaturedBlog] = useState([]);
    const [categoryfeaturedBlog, setcategory] = useState([]);



    useEffect(() => {
        const fetchBlogs = async() => {

                try{
                    const res = await axios.get(`${process.env.REACT_APP_API_URL}/api/Donationblogs/all/`);
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
                <div className="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-150 position-relative">
                <div className="col p-4 d-flex flex-column position-static">
                        <strong className="d-inline-block mb-2 text-primary">{donationblogPost.category_user}</strong>
                        <strong className="d-inline-block mb-2 text-primary">{donationblogPost.category_object}</strong>
                        <h3 className="mb-0">{donationblogPost.name} </h3>
                        <div className="mb-1 text-muted">{donationblogPost.created.slice(0, 10)}</div>
                        <p className="card-text mb-auto">{donationblogPost.description.slice(0, 30)} ...</p>
                        <Link to={`/Donationblogs/${donationblogPost.id}`} className="stretched-link">Continue reading</Link>
                    </div>
                    <div className="col-auto d-none d-lg-block">
                        <img width='200' height='250' src={`${process.env.REACT_APP_API_URL}/${donationblogPost.image}`} alt='image' />
                    </div>
                </div>
            );
        });

        for (let i = 0; i < list.length; i += 2) {
            result.push(
                <div key={i} className='px-5 row mb-10'>
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


                    <Link className="p-2 text-muted" to='../categoryO/เสื้อผ้า'>เสื้อผ้า</Link>
                    <Link className="p-2 text-muted" to='../categoryO/รองเท้า'>รองเท้า</Link>
                    <Link className="p-2 text-muted" to='../categoryO/ของใช้'>ของใช้</Link>
                    <Link className="p-2 text-muted" to='../categoryO/อาหารและยา'>อาหารและยา</Link>
                    <Link className="p-2 text-muted" to='../categoryO/เงินบริจาค'>เงินบริจาค</Link>
                
                </nav>
            </div>
            
            <div className="jumbotron p-4 p-md-5 mb-4 text-white rounded bg-info">
                <div className="col-md-6 px-0">
                    <h1 className="display-4 font-italic"></h1>
                    <p className="lead my-3"></p>
                    <p className="lead mb-0">
                        {/*<Link to={`/Donationblogs/${donationfeaturedBlog.slug}`} className="text-white font-weight-bold">
                            Continue reading...
                        </Link>*/}
                        <h1 style={{color:'#fff'}}><AiFillTag/>&nbsp;ทุกหมวดหมู่</h1>
                    </p>
                </div>
            </div>


            {getBlogs()}
        </div>
    );
};

export default AllCate ;