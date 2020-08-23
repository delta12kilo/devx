import React, { Fragment, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import Spinner from '../layout/spinner';
import { getProfiles } from '../../actions/profile';
import ProfileItem from './profile-item'

const Profiles = ({ getProfiles, profile: { profiles, loading } }) => {

    useEffect(() => {
        getProfiles();
    }, [getProfiles]);

    return <Fragment>
        {loading ? <Spinner /> : <Fragment>
            <h1 className='large text-primary'>Our Ninjas</h1>
            <p className='lead'>
                <i class="fas fa-arrow-alt-circle-down">{' '}Make Connections</i>
            </p>
            <div className="profiles">
                {profiles.length > 0 ? (
                    profiles.map(prof => (
                        <ProfileItem key={prof._id} profile={prof} />
                    ))
                ) : <h4>No Profiles </h4>}
            </div>
        </Fragment>}
    </Fragment>
};

Profiles.propTypes = {
    getProfiles: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
};
const mapStateToProps = state => ({
    profile: state.profile
}
);

export default connect(mapStateToProps, { getProfiles })(Profiles);
