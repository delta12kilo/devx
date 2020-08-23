import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { logout } from '../../actions/auth';

const Navbar = ({ auth: { isAuthenticated, loading }, logout }) => {

    const authlinks = (
        <ul>
            <li>
                <Link to="/profiles">
                    Our Ninjas</Link>{' |'}</li>
            <li>
                <Link to="/dashboard"> <i className="fas fa-user" />{' '}
                    Dashboard</Link></li>
            <li>
                <Link to="/posts">
                    Feed</Link></li>
            <li>
                <a onClick={logout} href="/login">
                    <i className="fas fa-sign-out-alt" />{' '}
                    logout</a>
            </li>
        </ul>
    );

    const guestlinks = (
        <ul>
            <li><Link to="/profiles"> Our Ninjas </Link>{' |'}</li>
            <li><Link to="/register">Be a Ninja</Link></li>
            <li><Link to="/login">Login</Link></li>
        </ul>
    );



    return (
        <nav className="navbar navbar-dark">
            <h1>
                <Link to="/"><i className="fas fa-code"></i> Ninja|Community</Link>
            </h1>
            {!loading && (<Fragment>{isAuthenticated ? authlinks : guestlinks}</Fragment>)}
        </nav>
    );
}

Navbar.propTypes = {
    logout: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
}

const mapStateToProps = state => (
    {
        auth: state.auth
    }
);

export default connect(mapStateToProps, { logout })(Navbar);

