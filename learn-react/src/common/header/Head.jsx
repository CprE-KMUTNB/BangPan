import React, { Fragment } from "react";
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';

const Head = ({ isAuthenticated, logout }) => {
    const authLinks = (
      <Fragment>
            <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
              <div className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                <a href="/request" className="nav-link px-2 text-white">ขอรับบริจาค</a>
                <a href="/profile" className="nav-link px-2 text-white me-2">บัญชี</a>
              </div>
            </div>

            <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-end">
              <div className="text-right">
                <a href="/" className="btn btn-outline-danger me-2" role="button" onClick={logout}>Logout</a>
              </div>
            </div>
      </Fragment>
    );

    const guestLinks = (
      <Fragment>
            <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-end">
              <div className="text-right">
                  <a href="/login" className="btn btn-outline-light me-2" role="button">Login</a>
                  <a href="/register" className="btn btn-warning" role="button">Sign-up</a>
              </div>
            </div>
      </Fragment>
    );

  return (
    <>
      <header className="p-3 text-bg-info">
        <div className="container">
          <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">

            <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
              <li><a href="/" className="nav-link px-2 text-secondary">หน้าแรก</a></li>
            </ul>

            { isAuthenticated ? authLinks : guestLinks }

          </div>
        </div>
      </header>
    </>
  );
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, {logout}) (Head);
