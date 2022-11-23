import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { checkAuthenticated } from '../actions/auth';
import { load_user } from '../actions/profile';

import Header from '../common/header/Header';


const Layout = ({ children, checkAuthenticated, load_user }) => {
    useEffect(() => {
        checkAuthenticated();
        load_user();
    }, []);

    return (
        <Fragment>
            <Header />
            {children}
        </Fragment>
    );
};

export default connect(null, { checkAuthenticated, load_user })(Layout);