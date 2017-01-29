import React, { PropTypes } from 'react';
import { app } from '../styles/app.scss';
import ThumbnailViewer from '../containers/ThumbnailViewer';

const App = ({ location: { query } }) => {
    const page = Number(query.page) || 1;
    return (
      <div className={app}>
          <header>
            <img src={'https://www.hoopladigital.com/images/hoopla-white-logo.svg'} id={'logo'} />
          </header>
          <ThumbnailViewer page={page} />
      </div>
    );
};


App.propTypes = {
    location: PropTypes.object
};

export default App;
