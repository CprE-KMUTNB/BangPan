import React from 'react'
import { Link } from "react-router-dom";

const Categories = () => {
    const data = [
        {
            cateImg:'./media/category/cat1.png',
            cateName:'เด็กเล็ก',
            linkTo: '/smallChildren'
        },
        {
            cateImg:'./media/category/cat2.png',
            cateName:'เด็กโต',
            linkTo: '/children'
        },
        {
            cateImg:'./media/category/cat3.png',
            cateName:'คนชรา',
            linkTo: '/oldPeople'
        },
        {
            cateImg:'./media/category/cat4.png',
            cateName:'คนพิการ',
            linkTo: '/cripple'
        },
        {
            cateImg:'./media/category/cat6.png',
            cateName:'ทุกหมวดหมู่',
            linkTo: '/all'
        },
    ]
  return (
    <>
        <div className='category'>
            {data.map((value, index) => {
                return (
                    <div className='box f_flex' key={index}>
                        <ul>
                            <li>
                                <Link to={value.linkTo}>
                                    <img src={value.cateImg} alt="" />
                                    <span>{value.cateName}</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                )
            })}
        </div>
    </>
  )
}

export default Categories