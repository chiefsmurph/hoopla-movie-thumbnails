import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';
import { loadThumbnails, thumbnailLoaded } from '../actions';
import SingleTitle from '../components/SingleTitle';
import Pagination from '../components/Pagination';
import { thumbnailViewer } from '../styles/thumbnailViewer.scss';
import { ThreeBounce } from 'better-react-spinkit';

class ThumbnailViewer extends Component {
    componentDidMount() {
        this.props.loadThumbnails(this.props.page);
    }
    componentDidUpdate(prevProps) {
        if (this.props.page !== prevProps.page) {
            // watch route changes for pagination changes
            this.props.loadThumbnails(this.props.page);
        }
    }
    thumbnailLoaded() {
        if (!this.props.thumbnailsFetching && !this.props.pageCached) {
            this.props.thumbnailLoaded();
        }
    }
    render() {
        const { thumbnails, thumbnailsFetching, page, allLoaded } = this.props;

        const optionalLoading = (
            <h2 style={{ display: (!thumbnailsFetching && allLoaded) ? 'none' : 'block'}}>
              <ThreeBounce fadeIn={false} /><br/>
              loading
            </h2>
        );

        const thumbnailGrid = (!thumbnailsFetching && thumbnails.length) ? [
            <div style={{ display: (allLoaded) ? 'flex' : 'none'}} key="grid">
              { thumbnails.map((title, i) => (
                <SingleTitle
                    key={i}
                    title={title.title}
                    artistName={title.artistName}
                    artKey={title.artKey}
                    onThumbnailLoad={this.thumbnailLoaded.bind(this)}
                />
              )) },
            </div>,
            allLoaded && <Pagination page={page} resultCount={thumbnails.length} allLoaded={allLoaded} key="btmPag"/>
        ] : '';

        return (
          <div className={thumbnailViewer}>
            You are browsing <b>MOVIE</b> titles<br />
            <Pagination page={page} resultCount={thumbnails.length} allLoaded={allLoaded}/>
            {optionalLoading}
            {thumbnailGrid}
          </div>
        );
    }
}

ThumbnailViewer.propTypes = {
    thumbnailsFetching: PropTypes.bool,
    thumbnails: PropTypes.array,
    loadThumbnails: PropTypes.func,
    page: PropTypes.number,
    allLoaded: PropTypes.bool,
    thumbnailLoaded: PropTypes.func,
    pageCached: PropTypes.bool
};

const mapStateToProps = (state) => {
    return {
        thumbnailsFetching: state.thumbnailsFetching,
        thumbnails: state.thumbnails,
        allLoaded: !!((state.loadCount === state.thumbnails.length || state.pageCached) && state.thumbnails.length),
        pageCached: state.pageCached
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        loadThumbnails: (page) => dispatch(loadThumbnails(page)),
        thumbnailLoaded: (num) => dispatch(thumbnailLoaded(num))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ThumbnailViewer);
