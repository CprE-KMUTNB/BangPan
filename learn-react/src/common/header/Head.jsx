import React from 'react'

const Head = () => {
  return (
    <>
        <section className='head'>
            <div className="container d_flex">
                <div className="left row">
                    <i className='request'></i>
                    <label>ขอรับบริจาค</label>
                </div>
                <div className="right row RText">
                    <label>หน้าแรก</label>
                    <label>เกี่ยวกับเรา</label>
                    <label>เข้าสู่ระบบ</label>
                    <label>สมัครสมาชิก</label>
                </div>
            </div>
        </section>
    </>
  )
}

export default Head