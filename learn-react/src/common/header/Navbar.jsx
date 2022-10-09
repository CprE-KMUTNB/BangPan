import React from 'react'
import { useState } from "react"
import { Link } from "react-router-dom"

const Navbar = () => {
  const [MobileMenu, setMobileMenu] = useState(false)
  return (
    <>
      <header className='header'>
        <div className='container d_flex'>
          <div className='catgrories d_flex'>
            <span class='fa-solid fa-border-all'></span>
            <h4>
              Categories <i className='fa fa-chevron-down'></i>
            </h4>
          </div>

          <div className='navlink'>
            <ul className={MobileMenu ? "nav-links-MobileMenu" : "link f_flex capitalize"} onClick={() => setMobileMenu(false)}>
              {/*<ul className='link f_flex uppercase {MobileMenu ? "nav-links-MobileMenu" : "nav-links"} onClick={() => setMobileMenu(false)}'>*/}
              <li>
                <Link to='/'>หน้าแรก</Link>
              </li>
              <li>
                <Link to='/pages'>เกี่ยวกับเรา</Link>
              </li>
              <li>
                <Link to='/user'>บัญชีผู้ใช้</Link>
              </li>
              <li>
                <Link to='/vendor'>ขอรับบริจาค</Link>
              </li>
              <li>
                <Link to='/track'>เข้าสู่ระบบ</Link>
              </li>
              <li>
                <Link to='/contact'>สมัครสมาชิก</Link>
              </li>
            </ul>

            <button className='toggle' onClick={() => setMobileMenu(!MobileMenu)}>
              {MobileMenu ? <i className='fas fa-times close home-btn'></i> : <i className='fa-solid fa-xmark open'></i>}
            </button>
          </div>
        </div>
      </header>
    </>
  )
}

export default Navbar