import React from "react"
import "./Footer.css"
import { useLocation } from "react-router-dom";

const Footer = () => {

  const { pathname } = useLocation();
  console.log(pathname);

  if (pathname !== "/") return null;

  return (
    <>
      <footer>
        <div className='grid-container'>
          <div className='box'>
            <h1>Bangpan</h1>
            <p>Website สำหรับแบ่งปันสิ่งดีๆ ให้ผู้อื่น</p>
          </div>

          <div className='box'>
            <h2>เกี่ยวกับเรา</h2>
            <ul>
              <p>นักศึกษาคณะวิศวกรรมสาสตร์ สาขาวิศวกรรมคอมพิวเตอร์</p>
              <p>มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าพระนครเหนือ</p>
            </ul>
          </div>
          <div className='box'>
            <h2>ผู้พัฒนา</h2>
            <ul>
              <p>นาย จิรนันท์ หงวนประโคน รหัสนักศึกษา 6401012630043</p>
              <p>นาย ศุภากร จักรสถาพร รหัสนักศึกษา 6401012630124</p>
            </ul>
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer