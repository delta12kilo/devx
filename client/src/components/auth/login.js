import React, { Fragment, useState } from 'react'
import { Link, Redirect } from 'react-router-dom';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { setAlert } from '../../actions/alert';
import { login } from '../../actions/auth';

const Login = ({ login, isAuthenticated }) => {

    const [formData, setFormData] = useState(
        {
            email: '',
            password: ''
        }
    );

    const { email, password } = formData;
    const onChange = e => setFormData(
        { ...formData, [e.target.name]: e.target.value }
    );

    const onSubmit = async e => {
        e.preventDefault();

        login(email, password);
    }

    //redirect if logged in

    if (isAuthenticated) {
        return <Redirect to="dashboard" />
    }
    return (
        <Fragment>
            <h1 className="large text-primary">explore..</h1>
            <p className="lead"><i className="fas fa-user"></i> &nbsp; hey ! Ninja</p>
            <form className="form" onSubmit={e => onSubmit(e)}>

                <div className="form-group">
                    <input type="email" placeholder="Ninja Id" name="email" value={email} onChange={e => onChange(e)} />
                </div>
                <div className="form-group">
                    <input
                        type="password"
                        placeholder="Ninja Password"
                        name="password"
                        value={password} onChange={e => onChange(e)}
                        minLength="6"
                    />
                </div>
                <input type="submit" className="btn btn-primary" value="Login" />
            </form>
            <p className="my-1">
                Not a Ninja? <Link to="/register">Sign Up</Link>
            </p>
        </Fragment>
    );
}


Login.propTypes = {
    // setAlert: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool,
};

const mapStateToProps = state =>
    ({
        isAuthenticated: state.auth.isAuthenticated

    });


export default connect(mapStateToProps, { setAlert, login })(Login)
