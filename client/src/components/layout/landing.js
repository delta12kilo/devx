import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

const Landing = ({ isAutenticated }) => {
    if (isAutenticated) {
        return <Redirect to="/dashboard" />
    }
    return (
        <section className="landing">
            <div className="dark-overlay">
                <div className="landing-inner">
                    <h1 className="x-large">Ninja | Community</h1>
                    <p className="lead">
                        Join us as a Ninja and share your thoughts with other Ninjas.
                    </p>
                    <div className="buttons">
                        <Link to="/register" className="btn btn-primary">Sign Up</Link>
                        <Link to="/login" className="btn btn-light">Login</Link>
                    </div>
                </div>
            </div>
        </section>
    );
}
Landing.propTypes = {
    isAutenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
    isAutenticated: state.auth.isAutenticated
})

export default connect(mapStateToProps)(Landing)