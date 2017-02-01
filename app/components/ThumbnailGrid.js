import React, { PropTypes } from 'react';
import SingleTitle from '../components/SingleTitle';

export const ThumbnailGrid = ({ thumbnails, allLoaded, thumbnailLoaded }) => {
    return (
      <div style={{ display: (allLoaded) ? 'flex' : 'none'}} key="grid">
        { thumbnails.map((title, i) => (
          <SingleTitle
              key={i}
              title={title.title}
              artistName={title.artistName}
              artKey={title.artKey}
              onThumbnailLoad={thumbnailLoaded}
          />
        )) },
      </div>
    );
};

ThumbnailGrid.propTypes = {
    thumbnails: PropTypes.array,
    allLoaded: PropTypes.bool,
    thumbnailLoaded: PropTypes.func
};

export default ThumbnailGrid;
