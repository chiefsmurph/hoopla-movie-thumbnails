import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { pagination } from '../styles/pagination.scss';
import FaArrowLeft from 'react-icons/fa/arrow-left';
import FaArrowRight from 'react-icons/fa/arrow-right';
import { TITLES_PER_PAGE } from '../constants';

const Pagination = ({ page, resultCount, allLoaded }) => {
    const startPos = (page - 1) * TITLES_PER_PAGE + 1;
    const showingResults = [ startPos, startPos + resultCount - 1].join(' - ');

    const styles = {
        prevLink: { visibility: (page > 1) ? 'visible' : 'hidden' },
        nextLink: { visibility: (resultCount === TITLES_PER_PAGE) ? 'visible' : 'hidden' },
        resultCount: { visibility: (resultCount > 0) ? 'visible' : 'hidden' }
    };

    return (
      <div className={pagination}>
        <Link
            to={{ query: { page: page - 1 } }}
            style={styles.prevLink}
            onClick={evt => !allLoaded && evt.preventDefault()}>
            <FaArrowLeft />
            Previous page
        </Link>
        <span style={styles.resultCount}>Results: {showingResults}</span>
        <Link
            to={{ query: { page: page + 1 } }}
            style={styles.nextLink}
            onClick={evt => !allLoaded && evt.preventDefault()}>
            Next page
            <FaArrowRight />
        </Link>
      </div>
    );
};

Pagination.propTypes = {
    page: PropTypes.number,
    resultCount: PropTypes.number,
    allLoaded: PropTypes.bool
};

export default Pagination;
