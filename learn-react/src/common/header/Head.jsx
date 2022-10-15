import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Head = () => {
  const [MobileMenu, setMobileMenu] = useState(false);
  return (
    <>
      <section className="head">
        <div className="container d_flex">
          <div className="left-row">
            <ul className={ MobileMenu ? "nav-links-MobileMenu" : "link f_flex capitalize"} 
                onClick={() => setMobileMenu(false)}>
              <li>
                <Link to="/request">ขอรับบริจาค</Link>
              </li>
            </ul>
          </div>
          <div className="right-row RText">
            <ul className={MobileMenu ? "nav-links-MobileMenu" : "link f_flex capitalize"} onClick={() => setMobileMenu(false)}>
              <li>
                <Link to="/">หน้าแรก</Link>
              </li>
              <li>
                <Link to="/about">เกี่ยวกับเรา</Link>
              </li>
              <li>
                <Link to="/login">เข้าสู่ระบบ</Link>
              </li>
              <li>
                <Link to="/register">สมัครสมาชิก</Link>
              </li>
            </ul>
            <button className='toggle' onClick={() => setMobileMenu(!MobileMenu)}>
              {MobileMenu ? <i className='fas fa-times close home-btn'></i> : <i className='fa-solid fa-bars open'></i>}
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Head;
