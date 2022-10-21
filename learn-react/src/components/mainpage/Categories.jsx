import React from 'react'
import { Link } from "react-router-dom";

const Categories = () => {
    const data = [
        {
            cateImg:'./images/category/cat1.png',
            cateName:'เด็กเล็ก',
            linkTo: '/smallChildren'
        },
        {
            cateImg:'./images/category/cat2.png',
            cateName:'เด็กโต',
            linkTo: '/children'
        },
        {
            cateImg:'./images/category/cat3.png',
            cateName:'คนชรา',
            linkTo: '/oldPeople'
        },
        {
            cateImg:'./images/category/cat4.png',
            cateName:'คนพิการ',
            linkTo: '/cripple'
        },
        {
            cateImg:'./images/category/cat5.png',
            cateName:'สัตว์เลี้ยง',
            linkTo: '/pets'
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