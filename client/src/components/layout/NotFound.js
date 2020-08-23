import React, { Fragment } from 'react';

const NotFound = () => {
    return (
        <Fragment>
            <h1 className="x-large text-primary">
                <i className="fas fa-exclmation-triangle">Page Not Found</i>
            </h1>
            <p className="large">Page you are searching do not Exist....</p>
        </Fragment>
    )
}

export default NotFound;