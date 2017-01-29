import React, { PropTypes } from 'react';

const SingleTitle = ({ title, artistName, artKey, onThumbnailLoad }) => {
    const url = `https://d2snwnmzyr8jue.cloudfront.net/${artKey}_270.jpeg`;
    return (
      <div>
        <img src={url} onLoad={onThumbnailLoad} />
        <section>
          <h2>{title}</h2>
          {(artistName) ? artistName : ''}
        </section>
      </div>
    );
};

SingleTitle.propTypes = {
    title: PropTypes.string,
    artistName: PropTypes.string,
    artKey: PropTypes.string,
    onThumbnailLoad: PropTypes.func
};

export default SingleTitle;
