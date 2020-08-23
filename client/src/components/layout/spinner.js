import React, { Fragment } from 'react';
import spinner from './loading-11.gif'

export default () => (
    <Fragment>
        <img
            src={spinner}
            style={{ width: '200px', margin: 'auto', display: 'block' }}
            alt="loading you Ninja.."
        />
    </Fragment>
);