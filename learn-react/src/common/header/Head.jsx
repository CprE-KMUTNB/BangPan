import React from "react";

const Head = () => {
  return (
    <>
      <header className="p-3 text-bg-info">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">

            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              <li><a href="/" className="nav-link px-2 text-secondary">หน้าแรก</a></li>
              <li><a href="/request" className="nav-link px-2 text-white">ขอรับบริจาค</a></li>
            </ul>

            <div className="text-end">
              <a href="/login" className="btn btn-outline-light me-2" role="button">Login</a>
              <a href="/register" className="btn btn-warning" role="button">Sign-up</a>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Head;
