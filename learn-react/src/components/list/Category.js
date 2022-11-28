import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link,useParams } from 'react-router-dom';
import { AiFillCalendar,AiFillAppstore,AiFillEye,AiFillTags
    ,AiFillCaretRight,AiOutlineAim,AiFillTag} from "react-icons/ai";

const Category = (props) => {
    const [blogs, setBlogs] = useState([]);
    const { category_target } = useParams();
    
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const fetchData = () => {

            axios
            .get(`${process.env.REACT_APP_API_URL}/api/Donationblogs/category/?search=${category_target}`)
            .then(res => { setBlogs(res.data)})

    }; 
    useEffect(()=>{
            fetchData()
          },[])

        return (
        <div className='container mt-3'>
            <h3 className='display-4'><AiFillTags/>&nbsp;{ category_target }</h3>
            {/* <div className="nav-scroller py-1 mb-2">
                <nav className="nav d-flex justify-content-between">

                    <Link className="p-2 text-muted" to='../categoryO/เสื้อผ้า'>เสื้อผ้า</Link>
                    <Link className="p-2 text-muted" to='../categoryO/รองเท้า'>รองเท้า</Link>
                    <Link className="p-2 text-muted" to='../categoryO/ของใช้'>ของใช้</Link>
                    <Link className="p-2 text-muted" to='../categoryO/อาหารและยา'>อาหารและยา</Link>
                    <Link className="p-2 text-muted" to='../categoryO/เงินบริจาค'>เงินบริจาค</Link>
                          
                </nav>
            </div> */}

            {blogs.map((blogPost,index) => (     

            <div key={index} className="row no-gutters border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
                    <div className="col p-4 d-flex flex-column position-static">
                    <strong className="d-inline-block mb-2 text-primary"><AiFillTags/> Category: - {blogPost.category_user} - {blogPost.category_object} </strong>
                        <h3 className="mb-0">{blogPost.name}</h3>
                        <div className="mb-1 text-muted">{blogPost.created.slice(0, 10)}</div>
                        <p className="card-text mb-auto">{blogPost.description}</p>
                        <Link to={`/Donationblogs/${blogPost.id}`} className="stretched-link">Continue reading</Link>
                    </div>
                    <div className="col-auto d-none d-lg-block">
                        <img width='200' height='250' src={blogPost.image} alt='error' />
                    </div>
                </div>

                ))}
              

                
        </div>
    )
};

export default Category;