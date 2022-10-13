import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <>
        <footer>
            <div className='container grid2'>
                <div className='box'>
                    <h1>Bangpan</h1>
                    <p>Website สำหรับการแบ่งปันสิ่งดีๆให้แก่ผู้อื่น</p>
                </div>
                <div className='box'>
                    <h2>เกี่ยวกับเรา</h2>
                    <ul>
                        <li>นักศึกษาคณะวิศวกรรมศาสตร์ สาขาวิศวกรรมคอมพิวเตอร์</li>
                    </ul>
                </div>
                <div className='box'>
                    <h2>ผู้พัฒนา</h2>
                    <ul>
                        <li>นายจิรนันท์ หงวนประโคน 6401012630043</li>
                        <li>นายศุภากร จักรสถาพร 6401012630124</li>
                    </ul>
                </div>
            </div>
        </footer>
    </>
  )
}

export default Footer