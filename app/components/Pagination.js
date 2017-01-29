import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { pagination } from '../styles/pagination.scss';
import FaArrowLeft from 'react-icons/fa/arrow-left';
import FaArrowRight from 'react-icons/fa/arrow-right';

const Pagination = ({ page, resultCount }) => {
    const startPos = (page - 1) * 48 + 1;
    const showingResults = [ startPos, startPos + resultCount].join(' - ');
    const prevLinkStyle = { visibility: (page > 1) ? 'visible' : 'hidden' };
    const nextLinkStyle = { visibility: (resultCount === 48) ? 'visible' : 'hidden' };

    return (
      <div className={pagination}>
        <Link to={{ query: { page: page - 1 } }} style={prevLinkStyle}>
            <FaArrowLeft />
            Previous page
        </Link>
        <span>Results: {showingResults}</span>
        <Link to={{ query: { page: page + 1 } }} style={nextLinkStyle}>
            Next page
            <FaArrowRight/>
        </Link>
      </div>
    );
};

Pagination.propTypes = {
    page: PropTypes.number,
    resultCount: PropTypes.number
};

export default Pagination;
